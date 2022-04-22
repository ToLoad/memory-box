package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.global.auth.KakaoOAuth2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final KakaoOAuth2 kakaoOAuth2;
    private final AuthenticationManager authenticationManager;
    private final String adminKey;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, KakaoOAuth2 kakaoOAuth2, AuthenticationManager authenticationManager,
                           @Value("${kakao.admin}") String adminKey) {
        this.userRepository = userRepository;
        this.kakaoOAuth2 = kakaoOAuth2;
        this.authenticationManager = authenticationManager;
        this.adminKey = adminKey;

    }

    @Override
    public String userLogin(String authorizedCode) {
        // 인가 코드로 accessToken 발급
        String accessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        log.info(accessToken);
        // accessToken에서 사용자 정보 가져오기
        User userInfo = kakaoOAuth2.getUserInfoByToken(accessToken);

        Long kakaoId = userInfo.getUserKakaoId();
        String nickname = userInfo.getUserNickname();

        // 우리 DB 에서 회원 Id 와 패스워드
        // 회원 Id = 카카오 nickname
        String username = nickname;
        // 패스워드 = 카카오 Id + ADMIN TOKEN
        String password = kakaoId + adminKey;

        // DB 에 중복된 Kakao Id 가 있는지 확인
        User kakaoUser = userRepository.findByUserKakaoId(kakaoId).orElse(null);
        // 카카오 정보로 회원가입
        if (kakaoUser == null) {
            userRepository.save(userInfo);
        }

        // 로그인 처리
        Authentication kakaoUsernamePassword = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(kakaoUsernamePassword);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return accessToken;
    }

}
