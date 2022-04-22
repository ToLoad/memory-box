package kr.guards.memorybox.domain.box.db.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BoxDetailList {
    private Long boxSeq;
    private String boxName;
    private String boxDescription;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime boxCreatedAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime boxOpenAt;

    private double boxLocLat;
    private double boxLocLng;
    private String boxLocAddress;
}
