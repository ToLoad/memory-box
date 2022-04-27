package kr.guards.memorybox.domain.user.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "user_profile_img")
public class UserProfileImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_seq")
    private Long imgSeq;

    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "img_content_type")
    private String imgContentType;

    @Column(name = "img_url")
    private String ImgUrl;

    @Builder
    public UserProfileImg(Long imgSeq, Long userSeq, String imgContentType, String imgUrl) {
        this.imgSeq = imgSeq;
        this.userSeq = userSeq;
        this.imgContentType = imgContentType;
        this.ImgUrl = imgUrl;
    }
}
