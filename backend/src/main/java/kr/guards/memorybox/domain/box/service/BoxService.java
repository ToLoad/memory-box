package kr.guards.memorybox.domain.box.service;


import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;

import java.util.List;

public interface BoxService {
    String boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq);
    boolean boxModify(BoxModifyPutReq boxModifyPutReq, String boxId, Long userSeq);
    boolean boxRemove(String boxId, Long userSeq);
    List<MemoriesVO> getAllMemories(String boxId, Long userSeq);
    int checkUserInBox(String boxId, Long userSeq); // 0이면 없음, 1이면 포함, 2면 박스 주인
    MemoriesBoxDetailBean getMemoriesBoxDetailByBoxId(String boxId);
    int openBoxHide(String boxId, Long userSeq);
    List<OpenBoxReadyBean> openBoxReadyList(String boxId);
    Integer openBoxReadyCount(String boxId);
    boolean openBoxReadyCheck(String boxId, Long userSeq);
    boolean openBoxActivation(String boxId);
    List<CloseBoxReadyBean> closeBoxReadyList(String boxId);
    Integer closeBoxReadyCount(String boxId);
    boolean unlockBox(String boxId, Long userSeq);
    boolean lockBox(String boxId, Long userSeq);
    boolean removeBoxUserInBox(Long boxUserSeq, Long userSeq);
    List<BoxDetail> boxDetailList(Long userSeq);
}

