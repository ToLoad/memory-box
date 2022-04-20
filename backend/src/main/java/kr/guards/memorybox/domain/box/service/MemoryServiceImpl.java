package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxLocation;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.repository.BoxLocationRepository;
import kr.guards.memorybox.domain.box.db.repository.Box2Repository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MemoryServiceImpl implements MemoryService {
    private final Box2Repository box2Repository;
    private final BoxLocationRepository boxLocationRepository;
    private final BoxUserRepository boxUserRepository;

    @Autowired
    public MemoryServiceImpl(Box2Repository box2Repository, BoxLocationRepository boxLocationRepository, BoxUserRepository boxUserRepository) {
        this.box2Repository = box2Repository;
        this.boxLocationRepository = boxLocationRepository;
        this.boxUserRepository = boxUserRepository;
    }

    @Override
    public boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq) {
        Box box = Box.builder()
                .boxName(boxCreatePostReq.getBoxName())
                .boxDescription(boxCreatePostReq.getBoxDescription())
                .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                .boxLocName(boxCreatePostReq.getBoxLocName())
                .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                .userSeq(userSeq)
                .build();

        try {
            Box boxCreated = box2Repository.save(box);

            // 기억함을 생성한 사람의 기억틀은 같이 생성
            BoxUser boxUser = BoxUser.builder()
                    .boxSeq(boxCreated.getBoxSeq())
                    .userSeq(userSeq)
                    .build();
            boxUserRepository.save(boxUser);
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

    @Override
    public boolean boxUserCreate(Long boxSeq, Long userSeq) {
        BoxUser boxUser = BoxUser.builder()
                .boxSeq(boxSeq)
                .userSeq(userSeq)
                .build();

        try {
            boxUserRepository.save(boxUser);
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

}
