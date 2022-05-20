package kr.guards.memorybox.domain.treasure.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TreasureListBean {
    @Schema(description = "보물 식별 번호")
    Long treasureSeq;

    @Schema(description = "보물 위도")
    Double treasureLocLat;

    @Schema(description = "보물 경도")
    Double treasureLocLng;
}
