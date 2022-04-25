package kr.guards.memorybox.domain.box.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailBean;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "OpenBoxReadyListGetRes", description = "기억함 열기 대기 상태 조회")
public class OpenBoxReadyListGetRes extends BaseResponseBody {
    @ApiModelProperty(value = "기억함 열기 대기 상태  정보")
    List<OpenBoxReadyBean> openBoxReadyList = null;


    public static OpenBoxReadyListGetRes of (Integer statusCode, String message, List<OpenBoxReadyBean> openBoxReadyList) {
        OpenBoxReadyListGetRes res = new OpenBoxReadyListGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOpenBoxReadyList(openBoxReadyList);

        return res;
    }
}
