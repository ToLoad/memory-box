package kr.guards.memorybox.domain.user.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    Long userSeq;

    @Column(name = "user_email")
    String userEmail;

    @Column(name = "user_nickname")
    String userNickname;

    @Column(name = "user_profile_image")
    String userProfileImage;

    @Builder
    public User(String userEmail, String userNickname, String userProfileImage){
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.userProfileImage = userProfileImage;
    }
}
