package kr.guards.memorybox.domain.box.response;


import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenBoxReadyListGetRes extends BaseResponseBody {
    List<OpenBoxReadyBean> openBoxReadyList = null;


    public static OpenBoxReadyListGetRes of (Integer statusCode, String message, List<OpenBoxReadyBean> openBoxReadyList) {
        OpenBoxReadyListGetRes res = new OpenBoxReadyListGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOpenBoxReadyList(openBoxReadyList);

        return res;
    }
}
