package kr.guards.memorybox.domain.user.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "UserLoginRes", description = "로그인시 반환되는 값")
public class UserLoginRes extends BaseResponseBody {
    @ApiModelProperty(value = "accessToken")
    String accessToken;

    public static UserLoginRes of (Integer statusCode, String message, String accessToken) {
        UserLoginRes res = new UserLoginRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);

        return res;
    }
}

