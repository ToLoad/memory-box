package kr.guards.memorybox.domain.box.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BoxCreatePostReq {
    @Schema(description = "기억함 이름", example = "우리를 기억함", required = true)
    String boxName;

    @Schema(description = "기억함 설명", example = "너와 나를 기억하는 기억함", required = true)
    String boxDescription;

    @Schema(description = "기억함이 열리는 날짜", example = "2022-09-25 13:00:00", required = true)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    LocalDateTime boxOpenAt;

    @Schema(description = "혼자담기 여부", example = "false", required = true)
    boolean boxIsSolo;

    // 장소담기를 선택했을 때만 아래의 값들을 받음
    @Schema(description = "기억함 저장 위치 별칭", example = "처음 만난 곳")
    String boxLocName;

    @Schema(description = "기억함 저장 위도", example = "35.175405")
    double boxLocLat;

    @Schema(description = "기억함 저장 경도", example = "129.081282")
    double boxLocLng;

    @Schema(description = "기억함 저장 주소명", example = "부산광역시 연제구 연산2동 822-126")
    String boxLocAddress;
}
