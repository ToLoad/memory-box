package kr.guards.memorybox.domain.box.response;


import io.swagger.v3.oas.annotations.media.Schema;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenBoxReadyListGetRes {
    @Schema(description = "기억함에 참여한 사람 목록과 승인 여부")
    List<OpenBoxReadyBean> openBoxReadyList = null;

    @Schema(description = "기억함에 참여한 전체 사람의 수")
    Integer allUserCount = 0;

    @Schema(description = "기억함 열기를 승인한 사람 수")
    Integer openBoxReadyCount = 0;

    @Schema(description = "기억함을 열수 있는지 여부(60% 이상이 승인했는지)")
    boolean openBoxReadyCheck = false;

    @Schema(description = "기억함 위도", example = "32.2123123")
    private double boxLatitude;

    @Schema(description = "기억함 경도", example = "127.34908321")
    private double boxLongitude;

    @Schema(description = "유저 번호", example = "1")
    private Long userSeq;

    public static OpenBoxReadyListGetRes of (List<OpenBoxReadyBean> openBoxReadyList, Integer openBoxReadyCount, boolean openBoxReadyCheck, double boxLatitude, double boxLongitude, Long userSeq) {
        OpenBoxReadyListGetRes res = new OpenBoxReadyListGetRes();
        res.setOpenBoxReadyList(openBoxReadyList);
        res.setAllUserCount(openBoxReadyList.size());
        res.setOpenBoxReadyCount(openBoxReadyCount);
        res.setOpenBoxReadyCheck(openBoxReadyCheck);
        res.setBoxLatitude(boxLatitude);
        res.setBoxLongitude(boxLongitude);
        res.setUserSeq(userSeq);

        return res;
    }
}
