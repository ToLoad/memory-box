package kr.guards.memorybox.domain.box.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CloseBoxReadyBean {
    @Schema(description = "기억틀 번호", example = "1")
    private Long boxUserSeq;

    @Schema(description = "유저 번호", example = "1")
    private Long userSeq;

    @Schema(description = "유저 닉네임", example = "투로드")
    private String userNickname;

    @Schema(description = "유저 프로필 사진", example = "https://storage.memory-box.kr/profile/default.jpg")
    private String userProfileImage;

    @Schema(description = "유저 기억 담기 여부", example = "true")
    private boolean boxUserIsDone;
}
