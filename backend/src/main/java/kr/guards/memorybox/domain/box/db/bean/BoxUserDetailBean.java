package kr.guards.memorybox.domain.box.db.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoxUserDetailBean {
    private Long boxSeq;
    private Long userSeq;
    private String userProfileImage;
}
