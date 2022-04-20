package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;

public interface MemoryService {
    boolean boxCreate(BoxCreatePostReq boxCreatePostReq);
    boolean boxSaveLocation(BoxLocationPostReq boxLocationPostReq);
}
