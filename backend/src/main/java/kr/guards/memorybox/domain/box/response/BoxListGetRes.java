package kr.guards.memorybox.domain.box.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "BoxListGetRes", description = "기억:함 상세보기")
public class BoxListGetRes extends BaseResponseBody {
    @ApiModelProperty(value = "기억:함 상세보기 정보")
    List<BoxDetailBean> boxDetailList = null;
    List<BoxUserDetailBean> boxUserDetailList = null;

    public static BoxListGetRes of (Integer statusCode, String message, List<BoxDetailBean> boxDetailList, List<BoxUserDetailBean> boxUserDetailList) {
        BoxListGetRes res = new BoxListGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoxDetailList(boxDetailList);
        res.setBoxUserDetailList(boxUserDetailList);

        return res;
    }
}
