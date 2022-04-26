package kr.guards.memorybox.domain.box.db.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpenBoxReadyBean {
    private Long boxUserSeq;
    private Long userSeq;
    private String userNickname;
    private boolean boxUserIsCome;
}
