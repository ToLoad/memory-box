package kr.guards.memorybox.domain.box.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface MemoryService {
    boolean boxCreateUserFrame(Long boxSeq, Long userSeq);
    boolean boxSaveUserText(String text, Long boxSeq, Long userSeq);
    boolean boxSaveUserImage(MultipartHttpServletRequest request, Long boxSeq, Long userSeq);
    boolean boxChangeLockReady(Long boxSeq, Long userSeq);
}
