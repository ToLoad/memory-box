package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;

public interface MemoryService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq);
}
