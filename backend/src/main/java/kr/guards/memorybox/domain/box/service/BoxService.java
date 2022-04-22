package kr.guards.memorybox.domain.box.service;


import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;

import java.util.List;

public interface BoxService {

    List<BoxDetailList> boxOpenListByUserSeq(Long userSeq);
    List<BoxDetailList> boxCloseListByUserSeq(Long userSeq);
    List<BoxUserDetailList> boxOpenUserListByuserSeq(Long userSeq);
    List<BoxUserDetailList> boxCloseUserListByuserSeq(Long userSeq);
}
