package kr.guards.memorybox.domain.box.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoxCreatePostReq {
    @Schema(description = "기억함 이름", example = "우리를 기억함", required = true)
    String boxName;

    @Schema(description = "기억함 설명", example = "너와 나를 기억하는 기억함", required = true)
    String boxDescription;

    @Schema(description = "기억함이 열리는 날짜", example = "2022-09-25 13:00:00", required = true)
    LocalDateTime boxOpenAt;

    @Schema(description = "기억함 저장 위치 별칭", example = "처음 만난 곳", required = true)
    String boxLocName;

    @Schema(description = "혼자담기 여부", example = "false", required = true)
    boolean boxIsSolo;
}
