package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import kr.guards.memorybox.domain.box.request.BoxUserTextPostReq;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface MemoryService {
    boolean boxCreateUserFrame(Long boxSeq, Long userSeq);
    boolean boxSaveUserText(BoxUserTextPostReq boxUserTextPostReq, Long userSeq);
    boolean boxSaveUserImage(MultipartHttpServletRequest request, Long boxUserSeq);
    boolean boxChangeLockReady(Long boxUserSeq);
}
