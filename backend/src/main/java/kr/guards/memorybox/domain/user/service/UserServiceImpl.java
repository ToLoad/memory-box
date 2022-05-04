package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.global.auth.KakaoOAuth2;
import kr.guards.memorybox.global.auth.KakaoUser;
import kr.guards.memorybox.global.util.CookieUtil;
import kr.guards.memorybox.global.util.JwtTokenUtil;
import kr.guards.memorybox.global.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Value("${spring.cookie.refresh-token-name}")
    private String refreshTokenName;

    @Value("${spring.security.jwt.refresh-token-expiration}")
    private Integer refreshTokenExpiration;

    @Value("${spring.config.activate.on-profile}")
    private String onProfile;

    private final UserRepository userRepository;

    private final KakaoOAuth2 kakaoOAuth2;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;
    private final RedisUtil redisUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                            KakaoOAuth2 kakaoOAuth2, JwtTokenUtil jwtTokenUtil, CookieUtil cookieUtil, RedisUtil redisUtil) {
        this.userRepository = userRepository;

        this.kakaoOAuth2 = kakaoOAuth2;
        this.jwtTokenUtil = jwtTokenUtil;
        this.cookieUtil = cookieUtil;
        this.redisUtil = redisUtil;
    }

    @Override
    public String userLogin(String authorizedCode, HttpServletResponse response) {
        // 인가 코드로 카카오톡 access token 발급
        String kakaoAccessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        if (kakaoAccessToken != null) {
            // 카카오톡 access token에서 사용자 정보 가져오기
            KakaoUser kakaoUserInfo = kakaoOAuth2.getUserInfoByToken(kakaoAccessToken);

            Long kakaoId = kakaoUserInfo.getUserKakaoId();
            String nickname = kakaoUserInfo.getUserNickname();

            // db에 Kakao Id가 있는지 확인
            User kakaoUser = userRepository.findByUserKakaoId(kakaoId);
            // 없다면 카카오 정보로 회원가입
            if (kakaoUser == null) {
                log.info(kakaoUserInfo.getUserProfileImage());
                User newUser = User.builder()
                        .userKakaoId(kakaoId)
                        .userEmail(kakaoUserInfo.getUserEmail())
                        .userNickname(nickname)
                        .userProfileImage(kakaoUserInfo.getUserProfileImage() == null ? "https://storage.memory-box.kr/profile/default.jpg" : kakaoUserInfo.getUserProfileImage())
                        .userRole("ROLE_USER")
                        .userBoxRemain(5)
                        .build();
                kakaoUser = userRepository.save(newUser);
            }
            Long userSeq = kakaoUser.getUserSeq();

            // 기억함 access token 발급
            String memoryboxAccessToken = jwtTokenUtil.createAccessToken(userSeq);
            // 기억함 refresh token 발급
            String memoryboxRefreshToken = jwtTokenUtil.createRefreshToken();

            // refresh token 쿠키 저장
            Cookie refreshToken = cookieUtil.createCookie(refreshTokenName, memoryboxRefreshToken);
            response.addCookie(refreshToken);

            // redis 저장
            redisUtil.setDataExpire(memoryboxRefreshToken, String.valueOf(userSeq), refreshTokenExpiration);

            return memoryboxAccessToken;
        }
        return null;
    }

    @Override
    public String reissueToken(HttpServletRequest request, HttpServletResponse response) {
        // refresh token 가져오기
        String refreshToken = getRefreshToken(request);

        // Refresh Token 읽어서 Access Token 재생성
        if (refreshToken != null) {
            String userSeqAsString = redisUtil.getData(refreshToken);
            if (userSeqAsString != null) {
                log.info("JWT - Refresh Token으로 Access Token 생성");
                Long userSeq = Long.valueOf(userSeqAsString);
                // 불러온 userSeq에 해당하는 계정이 있는지 조회
                Optional<User> isUserPresent = userRepository.findById(userSeq);
                if (isUserPresent.isPresent()) {
                    // Access Token 재생성
                    String newAccessToken = jwtTokenUtil.createAccessToken(userSeq);

                    // refresh Token -> One Time Use Only
                    // 기존 refresh Token 삭제
                    redisUtil.deleteData(refreshToken);

                    // 기억함 refresh token 새로 발급
                    String memoryboxRefreshToken = jwtTokenUtil.createRefreshToken();

                    // 새 refresh token 쿠키에  저장
                    Cookie newRefreshToken = cookieUtil.createCookie(refreshTokenName, memoryboxRefreshToken);
                    response.addCookie(newRefreshToken);

                    // 새 refresh token redis 저장
                    redisUtil.setDataExpire(memoryboxRefreshToken, String.valueOf(userSeq), refreshTokenExpiration);

                    // 기존 access Token 다시 사용 못하게 블랙리스트 저장
                    String originAccessToken = request.getHeader(jwtTokenUtil.HEADER_STRING).replace(jwtTokenUtil.TOKEN_PREFIX, "");
                    Integer tokenExpiration = jwtTokenUtil.getTokenExpirationAsLong(originAccessToken).intValue();

                    redisUtil.setDataExpire(originAccessToken, "B", tokenExpiration);

                    return newAccessToken;
                } else {    // DB에 해당 유저 없는 경우
                    return "DB";
                }
            } else {
                return "EXP";
            }
        }
        return null;
    }

    @Override
    public Boolean userLogout(HttpServletRequest request, Long userSeq) {
        // 카카오 로그아웃
        User user = userRepository.findById(userSeq).get();
        Long userKakaoId = kakaoOAuth2.logout(user.getUserKakaoId());
        if (userKakaoId == null) {
            log.error("userLogout - 카카오 로그아웃 실패");
            return false;
        }

        // Access, Refresh token 처리
        Boolean completeDel = deleteToken(request);
        if (completeDel == false) {
            return false;
        }
        return true;
    }

    private String getRefreshToken(HttpServletRequest request) {
        // refresh token 가져오기
        String refreshToken;
        if (onProfile.charAt(0) == 'd') {   // 배포 서버에서는 쿠키에서 가져오기
            log.info("getRefreshToken - 배포 모드");
            Cookie refreshCookie = cookieUtil.getCookie(request, refreshTokenName);
            if (refreshCookie != null) {
                refreshToken = refreshCookie.getValue();
                log.info("getRefreshToken - 진짜 배포 모드");
                log.info("refresh Token : " + refreshToken);
            } else {    // 로컬) 프론트 테스트용 (로컬 -> 배포 서버로 요청 보낼 시)
                log.info("getRefreshToken - 로컬 -> 배포 서버 요청");
                refreshToken = request.getHeader("Refresh").replace(jwtTokenUtil.TOKEN_PREFIX, "");
                log.info("refresh Token : " + refreshToken);
            }
        } else {    // 로컬) 스웨거용(헤더에서 가져오기)
            log.info("getRefreshToken - 로컬 스웨거 요청 ");
            refreshToken = request.getHeader("Refresh").replace(jwtTokenUtil.TOKEN_PREFIX, "");
        }
        return refreshToken;
    }

    // 로그아웃, 회원탈퇴 시 토큰 처리
    @Override
    public Boolean deleteToken(HttpServletRequest request) {
        try {
            String refreshToken = getRefreshToken(request);

            // redis에 있는 refresh Token 삭제
            redisUtil.deleteData(refreshToken);

            // 쿠키에 있는 refresh Token 삭제
            cookieUtil.removeCookie(refreshToken);

            // access Token 블랙리스트 추가
            String originAccessToken = request.getHeader(jwtTokenUtil.HEADER_STRING).replace(jwtTokenUtil.TOKEN_PREFIX, "");
            Integer tokenExpiration = jwtTokenUtil.getTokenExpirationAsLong(originAccessToken).intValue();

            redisUtil.setDataExpire(originAccessToken, "B", tokenExpiration);
        } catch (Exception e) {
            log.error(String.valueOf(e));
            return false;
        }
        return true;
    }
}
