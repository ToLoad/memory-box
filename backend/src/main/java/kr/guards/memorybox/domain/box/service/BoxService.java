package kr.guards.memorybox.domain.box.service;


import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;

import java.util.List;

public interface BoxService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq);
    boolean boxRemove(Long boxSeq, Long userSeq);
    List<BoxDetailList> boxOpenListByUserSeq(Long userSeq);
    List<BoxDetailList> boxCloseListByUserSeq(Long userSeq);
    List<BoxUserDetailList> boxOpenUserListByUserSeq(Long userSeq);
    List<BoxUserDetailList> boxCloseUserListByUserSeq(Long userSeq);
}
