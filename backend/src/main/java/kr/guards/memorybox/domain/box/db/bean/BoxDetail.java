package kr.guards.memorybox.domain.box.db.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class BoxDetail {
    @Schema(description = "박스 정보")
    private List<BoxDetailVO> box;
}
