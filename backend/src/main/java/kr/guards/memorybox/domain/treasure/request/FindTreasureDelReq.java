package kr.guards.memorybox.domain.treasure.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class FindTreasureDelReq {
    @Schema(description = "보물 식별 번호", example = "1", required = true)
    Long treasureSeq;
}
