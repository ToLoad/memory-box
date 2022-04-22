package kr.guards.memorybox.domain.user.response;

import lombok.Setter;

@Setter
public class UserLoginRes {

    Long userSeq;

    String userEmail;

    String userNickname;

    String userProfileImage;
}

