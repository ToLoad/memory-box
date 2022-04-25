package kr.guards.memorybox.domain.box.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpenBoxReadyBean {
    @Schema(description = "유저 번호", example = "1")
    private Long userSeq;

    @Schema(description = "유저 닉네임", example = "투로드")
    private String userNickname;

    @Schema(description = "유저 준비 여부", example = "true")
    private boolean boxUserIsDone;
}
