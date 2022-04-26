package kr.guards.memorybox.domain.box.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BoxUserMemoryBean {
    @Schema(description = "유저 번호", example = "1")
    private Long userSeq;

    @Schema(description = "유저 이메일", example = "memory_box@gmail.com")
    private String userEmail;

    @Schema(description = "유저 닉네임", example = "투로드")
    private String userNickname;

    @Schema(description = "유저 프로필 사진", example = "https://xxx.kakao.co.kr/.../aaa.jpg")
    private String userProfileImage;

    @Schema(description = "글로된 기억", example = "생각나니 처음 우리 너무 멋쩍게...")
    private String text;
}
