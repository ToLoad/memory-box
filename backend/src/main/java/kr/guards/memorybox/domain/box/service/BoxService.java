package kr.guards.memorybox.domain.box.service;


import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;

import java.util.List;

public interface BoxService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq);
    boolean boxModify(BoxModifyPutReq boxModifyPutReq, Long boxSeq, Long userSeq);
    boolean boxRemove(Long boxSeq, Long userSeq);
    List<MemoriesVO> getAllMemories(Long boxSeq, Long userSeq);

    // ************************** 기억함 조회 ************************** //
    List<BoxDetailBean> boxOpenList(Long userSeq);
    List<BoxDetailBean> boxCloseList(Long userSeq);
    List<BoxDetailBean> boxReadyList(Long userSeq);
    List<BoxUserDetailBean> boxOpenUserList(Long userSeq);
    List<BoxUserDetailBean> boxCloseUserList(Long userSeq);
    List<BoxUserDetailBean> boxReadyUserList(Long userSeq);

    BoxDetailBean getBoxDetailByBoxSeq(Long boxSeq);

    // ************************** 기억함 열기 ************************** //
    List<OpenBoxReadyBean> openBoxReadyList(Long boxSeq);
    boolean openBoxReadyCheck(Long boxSeq, Long userSeq);
}

