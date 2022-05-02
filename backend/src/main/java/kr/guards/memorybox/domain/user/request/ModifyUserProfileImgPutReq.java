package kr.guards.memorybox.domain.user.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class ModifyUserProfileImgPutReq {
    @Schema(description = "변경할 프로필 이미지 경로")
    String imgUrl;
}
