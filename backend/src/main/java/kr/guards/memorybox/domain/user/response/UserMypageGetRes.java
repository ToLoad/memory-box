package kr.guards.memorybox.domain.user.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserMypageGetRes", description = "회원 정보 조회 시 반환되는 값")
public class UserMypageGetRes extends BaseResponseBody {

    @ApiModelProperty(value = "유저 식별 번호")
    Long userSeq;

    @ApiModelProperty(value = "유저 카카오 아이디")
    Long userKakaoId;

    @ApiModelProperty(value = "유저 이메일")
    String userEmail;

    @ApiModelProperty(value = "유저 닉네임")
    String userNickname;

    @ApiModelProperty(value = "유저 프로필 이미지 경로")
    String userProfileImage;

    @ApiModelProperty(value = "남은 기억함 개수")
    Integer userBoxRemain;

    public static UserMypageGetRes of (Integer statusCode, String message, UserMypageGetRes userMypageGetRes) {
        UserMypageGetRes res = userMypageGetRes;
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

