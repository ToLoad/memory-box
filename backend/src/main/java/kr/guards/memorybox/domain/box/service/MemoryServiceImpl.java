package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.repository.MemoryRepository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MemoryServiceImpl implements MemoryService {
    @Autowired
    MemoryRepository memoryRepository;

    @Override
    public boolean boxCreate(BoxCreatePostReq boxCreatePostReq) {
        Box box = Box.builder()
                .boxName(boxCreatePostReq.getBoxName())
                .boxDescription(boxCreatePostReq.getBoxDescription())
                .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                .boxLocName(boxCreatePostReq.getBoxLocName())
                .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                .userSeq(1L)
                .build();

        try {
            memoryRepository.save(box);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }
}
