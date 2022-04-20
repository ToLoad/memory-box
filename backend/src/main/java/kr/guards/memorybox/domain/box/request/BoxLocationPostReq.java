package kr.guards.memorybox.domain.box.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class BoxLocationPostReq {
    @Schema(description = "기억함 번호", example = "2", required = true)
    Long boxSeq;

    @Schema(description = "기억함 저장 위도", example = "35.175405", required = true)
    double boxLocLat;

    @Schema(description = "기억함 저장 경도", example = "129.081282", required = true)
    double boxLocLng;

    @Schema(description = "기억함 저장 주소명", example = "부산광역시 연제구 연산2동 822-126", required = true)
    String boxLocAddress;
}
