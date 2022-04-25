package kr.guards.memorybox.domain.box.service;


import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;

import java.util.List;

public interface BoxService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq);
    boolean boxRemove(Long boxSeq, Long userSeq);
    boolean boxModify(BoxModifyPutReq boxModifyPutReq, Long boxSeq, Long userSeq);
    List<MemoriesVO> getAllMemories(Long boxSeq, Long userSeq);

    List<BoxDetailBean> boxOpenListByUserSeq(Long userSeq);
    List<BoxDetailBean> boxCloseListByUserSeq(Long userSeq);
    List<BoxUserDetailBean> boxOpenUserListByUserSeq(Long userSeq);
    List<BoxUserDetailBean> boxCloseUserListByUserSeq(Long userSeq);
    BoxDetailBean getBoxDetailByBoxSeq(Long boxSeq);

    // ************************** 기억함 열기 ************************** //
    List<OpenBoxReadyBean> openBoxReadyListByBoxSeq(Long boxSeq);
}

