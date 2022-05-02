package kr.guards.memorybox.domain.user.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @NotNull
    @Column(name = "user_kakao_id")
    private Long userKakaoId;

    @NotNull
    @Size(max = 40)
    @Column(name = "user_email")
    private String userEmail;

    @NotNull
    @Size(max = 30)
    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_profile_image")
    @ColumnDefault("https://storage.memory-box.kr/profile/default.jpg")
    private String userProfileImage;

    @NotNull
    @ColumnDefault("5")
    @Column(name = "user_box_remain")
    private Integer userBoxRemain;

    @NotNull
    @Size(max = 15)
    @ColumnDefault("'ROLE_USER'")
    @Column(name = "user_role")
    private String userRole;

    @Column(name = "user_created_at")
    @CreatedDate
    private LocalDateTime userCreatedAt;

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
