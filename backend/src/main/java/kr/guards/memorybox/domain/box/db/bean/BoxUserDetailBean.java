package kr.guards.memorybox.domain.box.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoxUserDetailBean {
    @Schema(description = "기억함 번호", example = "1")
    private Long boxSeq;

    @Schema(description = "유저 번호", example = "1")
    private Long userSeq;

    @Schema(description = "유저 프로필 사진", example = "https://xxx.kakao.co.kr/.../aaa.jpg")
    private String userProfileImage;
}
