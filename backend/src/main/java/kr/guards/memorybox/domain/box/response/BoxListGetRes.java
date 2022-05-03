package kr.guards.memorybox.domain.box.response;


import kr.guards.memorybox.domain.box.db.bean.BoxDetail;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailVO;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoxListGetRes extends BaseResponseBody {
    List<BoxDetail> boxList = null;

    public static BoxListGetRes of (Integer statusCode, String message, List<BoxDetail> boxList) {
        BoxListGetRes res = new BoxListGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoxList(boxList);

        return res;
    }
}
