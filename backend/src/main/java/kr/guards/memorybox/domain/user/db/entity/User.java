package kr.guards.memorybox.domain.user.db.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원 id
    Long userId;

    String userEmail;

    String userNickname;

    String userProfileImage;

    @Builder
    public User(String userEmail, String userNickname, String userProfileImage){
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.userProfileImage = userProfileImage;
    }
}
