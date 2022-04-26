package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import kr.guards.memorybox.global.auth.KakaoOAuth2;
import kr.guards.memorybox.global.auth.KakaoUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final KakaoOAuth2 kakaoOAuth2;
    private final String adminKey;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, KakaoOAuth2 kakaoOAuth2,
                           @Value("${kakao.admin}") String adminKey) {
        this.userRepository = userRepository;
        this.kakaoOAuth2 = kakaoOAuth2;
        this.adminKey = adminKey;
    }

    @Override
    public String userLogin(String authorizedCode) {
        // 인가 코드로 accessToken 발급
        String accessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        log.info("accessToken : " + accessToken);
        if (accessToken != null) {
            // accessToken에서 사용자 정보 가져오기
            KakaoUser kakaoUserInfo = kakaoOAuth2.getUserInfoByToken(accessToken);

            Long kakaoId = kakaoUserInfo.getUserKakaoId();
            String nickname = kakaoUserInfo.getUserNickname();

            // db에 Kakao Id가 있는지 확인
            User kakaoUser = userRepository.findByUserKakaoId(kakaoId);
            // 없다면 카카오 정보로 회원가입
            if (kakaoUser == null) {
                User newUser = User.builder()
                        .userKakaoId(kakaoId)
                        .userEmail(kakaoUserInfo.getUserEmail())
                        .userNickname(nickname)
                        .userProfileImage(kakaoUserInfo.getUserProfileImage())
                        .userRole("ROLE_USER")
                        .userBoxRemain(5)
                        .build();
                userRepository.save(newUser);
            }
            return accessToken;
        }
        return null;
    }

    @Override
    public User getUserInfoByToken(String accessToken){
        // accessToken에서 사용자 정보 가져오기
        KakaoUser kakaoUserInfo = kakaoOAuth2.getUserInfoByToken(accessToken);

        if (kakaoUserInfo != null) {
            // kakao id로 db에서 정보 가져오기
            User user = userRepository.findByUserKakaoId(kakaoUserInfo.getUserKakaoId());

            return user;
        }

        return null;
    }

    @Override
    public UserMypageGetRes getUserMypage(Long userSeq) {
        Optional<User> findUser = userRepository.findById(userSeq);
        if (findUser.isPresent() == false) { // 유저 정보 없는 경우
            return null;
        }
        User user = findUser.get();
        UserMypageGetRes userMypageInfo = new UserMypageGetRes();

        userMypageInfo.setUserSeq(user.getUserSeq());
        userMypageInfo.setUserKakaoId(user.getUserKakaoId());
        userMypageInfo.setUserEmail(user.getUserEmail());
        userMypageInfo.setUserNickname(user.getUserNickname());
        userMypageInfo.setUserBoxRemain(user.getUserBoxRemain());
        userMypageInfo.setUserProfileImage(user.getUserProfileImage());

        return userMypageInfo;
    }
}
