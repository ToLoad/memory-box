package kr.guards.memorybox.domain.box.response;


import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "박스 ID", description = "박스 ID 반환")
public class BoxCreatePostRes {
    String boxId;

    public static BoxCreatePostRes of (String boxId) {
        BoxCreatePostRes res = new BoxCreatePostRes();
        res.setBoxId(boxId);

        return res;
    }
}
