package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import kr.guards.memorybox.domain.box.request.BoxUserTextPostReq;

public interface MemoryService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq);
    boolean boxSaveLocation(BoxLocationPostReq boxLocationPostReq);
    boolean boxCreateUserFrame(Long boxSeq, Long userSeq);
    boolean boxSaveUserText(BoxUserTextPostReq boxUserTextPostReq, Long userSeq);
    boolean boxChangeLockReady(Long boxUserSeq);
}
