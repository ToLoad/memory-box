package kr.guards.memorybox.domain.box.service;


import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailBean;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;

import java.util.List;

public interface BoxService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq);
    List<BoxDetailBean> boxOpenListByUserSeq(Long userSeq);
    List<BoxDetailBean> boxCloseListByUserSeq(Long userSeq);
    List<BoxUserDetailBean> boxOpenUserListByUserSeq(Long userSeq);
    List<BoxUserDetailBean> boxCloseUserListByUserSeq(Long userSeq);

    // ************************** 기억함 열기 ************************** //
    List<OpenBoxReadyBean> openBoxReadyListByBoxSeq(Long boxSeq);
}

