package kr.guards.memorybox.global.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
public class KakaoUser {
    private Long userKakaoId;
    private String userEmail;
    private String userNickname;
    private String userProfileImage;

    @Builder
    public KakaoUser(Long userKakaoId, String userEmail, String userNickname, String userProfileImage){
        this.userKakaoId = userKakaoId;
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.userProfileImage = userProfileImage;
    }
}
