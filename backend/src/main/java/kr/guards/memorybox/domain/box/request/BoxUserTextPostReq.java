package kr.guards.memorybox.domain.box.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class BoxUserTextPostReq {
    @Schema(description = "글로된 기억", example = "생각나니 처음 우리 너무 멋쩍게...", required = true)
    String text;
}
