package kr.guards.memorybox.domain.box.db.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemoriesVO {
    @Schema(description = "유저 번호", example = "1")
    private Long userSeq;

    @Schema(description = "유저 이메일", example = "memory_box@gmail.com")
    private String userEmail;

    @Schema(description = "유저 기억함별 닉네임", example = "투로드")
    private String userBoxNickname;

    @Schema(description = "유저 프로필 사진", example = "https://xxx.kakao.co.kr/.../aaa.jpg")
    private String userProfileImage;

    @Schema(description = "글로된 기억", example = "생각나니 처음 우리 너무 멋쩍게...")
    private String text;

    @Schema(description = "음성으로된 기억", example = "https://xxx.kakao.co.kr/.../aaa.jpg")
    private String voice;

    @Schema(description = "사진으로된 기억들")
    private List<String> image;

    @Schema(description = "영상으로된 기억들")
    private List<String> video;
}
