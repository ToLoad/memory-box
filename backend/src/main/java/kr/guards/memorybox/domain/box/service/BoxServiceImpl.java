package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;
import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxLocation;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.repository.BoxLocationRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxRepositorySpp;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxLocationRepository boxLocationRepository;
    private final BoxRepositorySpp boxRepositorySpp;

    @Autowired
    public BoxServiceImpl(BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxLocationRepository boxLocationRepository, BoxRepositorySpp boxRepositorySpp) {
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxLocationRepository = boxLocationRepository;
        this.boxRepositorySpp = boxRepositorySpp;
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
            Box boxCreated = boxRepository.save(box);

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
        // 여기 수정하기
        Box box = boxRepository.getById(boxLocationPostReq.getBoxSeq());

        BoxLocation boxLocation = BoxLocation.builder()
                .box(box)
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
    public List<BoxDetailList> boxOpenListByUserSeq(Long userSeq) {return boxRepositorySpp.findOpenBoxByUserSeq(userSeq);}

    @Override
    public List<BoxDetailList> boxCloseListByUserSeq(Long userSeq) {return boxRepositorySpp.findCloseBoxByUserSeq(userSeq);}

    @Override
    public List<BoxUserDetailList> boxOpenUserListByUserSeq(Long userSeq) {
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByUserSeq(userSeq);

        if(oBoxUser.isPresent()) {
            BoxUser boxUser = oBoxUser.get();

            return boxRepositorySpp.findAllBoxUserByBoxSeq(boxUser.getBoxSeq());
        }
        return null;
    }

    @Override
    public List<BoxUserDetailList> boxCloseUserListByUserSeq(Long userSeq) {
        Optional <BoxUser> cBoxUser = boxUserRepository.findBoxUserByUserSeq(userSeq);

        if (cBoxUser.isPresent()) {
            BoxUser boxUser = cBoxUser.get();

            return boxRepositorySpp.findAllBoxUserByBoxSeq(boxUser.getBoxSeq());
        }
        return null;
    }
}
