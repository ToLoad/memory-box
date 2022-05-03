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

    // ************************** 기억함 조회 ************************** //
//    List<BoxDetailVO> boxOpenDetailList(Long userSeq);
//    List<BoxDetailVO> boxCloseDetailList(Long userSeq);
//    List<BoxDetailVO> boxReadyDetailList(Long userSeq);
//    List<BoxDetailVO> boxWaitDetailList(Long userSeq);

    List<BoxDetail> boxDetailList(Long userSeq);

    boolean checkUserInBox(String boxId, Long userSeq);
    BoxDetailBean getBoxDetailByBoxId(String boxId);

    int openBoxHide(String boxId, Long userSeq);

    // ************************** 기억함 열기 ************************** //
    List<OpenBoxReadyBean> openBoxReadyList(String boxId);
    Integer openBoxReadyCount(String boxId);
    boolean openBoxReadyCheck(String boxId, Long userSeq);
    boolean openBoxActivation(String boxId);

    List<CloseBoxReadyBean> closeBoxReadyList(String boxId);
    Integer closeBoxReadyCount(String boxId);

    boolean unlockBox(String boxId, Long userSeq);
    boolean lockBox(String boxId, Long userSeq);
}

