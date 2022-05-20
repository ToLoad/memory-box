package kr.guards.memorybox.domain.box.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpenNotificationUserBean {
    @Schema(description = "기억함 ID", example = "o23zKwT")
    private String boxId;

    @Schema(description = "유저 이메일", example = "abc@abc.com")
    private String userEmail;

    @Schema(description = "유저 닉네임 정보", example = "박동탁")
    private String userNickname;
}
