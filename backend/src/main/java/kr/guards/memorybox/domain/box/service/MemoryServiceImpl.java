package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxLocation;
import kr.guards.memorybox.domain.box.db.repository.BoxLocationRepository;
import kr.guards.memorybox.domain.box.db.repository.Box2Repository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MemoryServiceImpl implements MemoryService {
    @Autowired
    Box2Repository box2Repository;

    @Autowired
    BoxLocationRepository boxLocationRepository;

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
            box2Repository.save(box);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public boolean boxSaveLocation(BoxLocationPostReq boxLocationPostReq) {
        BoxLocation boxLocation = BoxLocation.builder()
                .boxSeq(boxLocationPostReq.getBoxSeq())
                .boxLocLat(boxLocationPostReq.getBoxLocLat())
                .boxLocLng(boxLocationPostReq.getBoxLocLng())
                .boxLocAddress(boxLocationPostReq.getBoxLocAddress())
                .build();

        try {
            boxLocationRepository.save(boxLocation);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }
}
