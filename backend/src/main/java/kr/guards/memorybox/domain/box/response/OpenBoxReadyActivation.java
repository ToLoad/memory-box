package kr.guards.memorybox.domain.box.response;


import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenBoxReadyActivation extends BaseResponseBody {
    boolean readyCheck = false;

    public static OpenBoxReadyActivation of (Integer statusCode, String message, boolean readyCheck) {
        OpenBoxReadyActivation res = new OpenBoxReadyActivation();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setReadyCheck(readyCheck);

        return res;
    }
}
