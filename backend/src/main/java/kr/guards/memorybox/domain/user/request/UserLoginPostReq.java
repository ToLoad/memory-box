package kr.guards.memorybox.domain.user.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginPostReq {
    @Schema(description = "카카오 로그인 코드")
    String code;

    @Schema(description = "요청 사이트 구분코드")
    String from;
}
