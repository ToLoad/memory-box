package kr.guards.memorybox.domain.box.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class BoxModifyPutReq {
    @Schema(description = "수정한 기억함 이름", example = "우리를 기억함")
    String boxName;

    @Schema(description = "수정한 기억함 설명", example = "너와 나를 기억하는 기억함")
    String boxDescription;
}
