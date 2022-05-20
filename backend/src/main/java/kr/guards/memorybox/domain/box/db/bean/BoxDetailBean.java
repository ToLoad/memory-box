package kr.guards.memorybox.domain.box.db.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BoxDetailBean {
    @Schema(description = "기억함 ID", example = "o23zKwT")
    private String boxId;

    @Schema(description = "기억함 이름", example = "우리를 기억함")
    private String boxName;

    @Schema(description = "기억함 설명", example = "너와 나를 기억하는 기억함")
    private String boxDescription;

    @Schema(description = "기억함 생성 날짜", example = "2022-02-01 13:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime boxCreatedAt;

    @Schema(description = "기억함이 열리는 날짜", example = "2022-09-25 13:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime boxOpenAt;

    @Schema(description = "기억함 저장 위치 별칭", example = "처음 만난 곳")
    private String boxLocName;

    @Schema(description = "기억함 저장 위도", example = "35.175405")
    private double boxLocLat;

    @Schema(description = "기억함 저장 경도", example = "129.081282")
    private double boxLocLng;

    @Schema(description = "기억함 저장 주소명", example = "부산광역시 연제구 연산2동 822-126")
    private String boxLocAddress;

    @Schema(description = "기억함 타입")
    private int boxType;

    @Schema(description = "기억 담기 여부", example = "true")
    private boolean boxUserIsDone;
}
