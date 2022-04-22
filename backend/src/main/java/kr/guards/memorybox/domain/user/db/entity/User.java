package kr.guards.memorybox.domain.user.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @NotNull
    @Column(name = "user_kakao_id")
    private Long userKakaoId;

    @Column(name = "user_email")
    private String userEmail;

    @NotNull
    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_profile_image")
    private String userProfileImage;

    @NotNull
    @ColumnDefault("5")
    @Column(name = "user_box_remain")
    private Integer userBoxRemain;

    @NotNull
    @ColumnDefault("ROLE_USER")
    @Column(name = "user_role")
    private String userRole;

    @Builder
    public User(Long userKakaoId, String userEmail, String userNickname, String userProfileImage, Integer userBoxRemain, String userRole){
        this.userKakaoId = userKakaoId;
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.userProfileImage = userProfileImage;
        this.userBoxRemain = userBoxRemain;
        this.userRole = userRole;
    }
}
