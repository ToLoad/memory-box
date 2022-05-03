package kr.guards.memorybox.domain.box.response;


import io.swagger.v3.oas.annotations.media.Schema;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenBoxReadyListGetRes extends BaseResponseBody {
    @Schema(description = "기억함에 참여한 사람 목록과 승인 여부")
    List<OpenBoxReadyBean> openBoxReadyList = null;

    @Schema(description = "기억함에 참여한 전체 사람의 수")
    Integer allUserCount = 0;

    @Schema(description = "기억함 열기를 승인한 사람 수")
    Integer openBoxReadyCount = 0;

    @Schema(description = "기억함을 열수 있는지 여부(60% 이상이 승인했는지)")
    boolean openBoxReadyCheck = false;


    public static OpenBoxReadyListGetRes of (Integer statusCode, String message, List<OpenBoxReadyBean> openBoxReadyList, Integer openBoxReadyCount, boolean openBoxReadyCheck) {
        OpenBoxReadyListGetRes res = new OpenBoxReadyListGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOpenBoxReadyList(openBoxReadyList);
        res.setAllUserCount(openBoxReadyList.size());
        res.setOpenBoxReadyCount(openBoxReadyCount);
        res.setOpenBoxReadyCheck(openBoxReadyCheck);

        return res;
    }
}
