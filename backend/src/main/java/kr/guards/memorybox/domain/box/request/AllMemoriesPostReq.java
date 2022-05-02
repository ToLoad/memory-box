package kr.guards.memorybox.domain.box.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.util.List;

@Getter
public class AllMemoriesPostReq {
    @Schema(description = "기억틀 전용 닉네임")
    String nickname;

    @Schema(description = "글로된 기억")
    String content;

    @Schema(description = "사진으로된 기억들")
    List<String> image;

    @Schema(description = "영상으로된 기억들")
    List<String> video;

    @Schema(description = "음성으로된 기억")
    String voice;
}
