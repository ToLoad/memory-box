package kr.guards.memorybox.domain.box.response;


import io.swagger.annotations.ApiModel;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.MemoriesVO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "모든 기억들", description = "해당 기억함의 모든 기억")
public class AllMemoriesGetRes {
    BoxDetailBean boxDetail = null;
    List<MemoriesVO> boxMemories = null;

    public static AllMemoriesGetRes of (BoxDetailBean boxDetail, List<MemoriesVO> boxUserMemoryList) {
        AllMemoriesGetRes res = new AllMemoriesGetRes();
        res.setBoxDetail(boxDetail);
        res.setBoxMemories(boxUserMemoryList);

        return res;
    }
}
