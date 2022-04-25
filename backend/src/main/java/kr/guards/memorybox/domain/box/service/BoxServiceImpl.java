package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailBean;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxRepositorySpp;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxRepositorySpp boxRepositorySpp;

    @Autowired
    public BoxServiceImpl(BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxRepositorySpp boxRepositorySpp) {
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxRepositorySpp = boxRepositorySpp;
    }

    @Override
    public boolean boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq) {
        Box box;

        if (boxCreatePostReq.getBoxLocName() == null) {
            log.warn("장소 정보 없음");
            box = Box.builder()
                    .boxName(boxCreatePostReq.getBoxName())
                    .boxDescription(boxCreatePostReq.getBoxDescription())
                    .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                    .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                    .userSeq(userSeq)
                    .build();
        } else {
            log.warn("장소 정보 있음");
            box = Box.builder()
                    .boxName(boxCreatePostReq.getBoxName())
                    .boxDescription(boxCreatePostReq.getBoxDescription())
                    .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                    .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                    .userSeq(userSeq)
                    // 박스 장소정보 담기
                    .boxLocName(boxCreatePostReq.getBoxLocName())
                    .boxLocLat(boxCreatePostReq.getBoxLocLat())
                    .boxLocLng(boxCreatePostReq.getBoxLocLng())
                    .boxLocAddress(boxCreatePostReq.getBoxLocAddress())
                    .build();
        }

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
    public List<BoxDetailBean> boxOpenListByUserSeq(Long userSeq) {return boxRepositorySpp.findOpenBoxByUserSeq(userSeq);}

    @Override
    public List<BoxDetailBean> boxCloseListByUserSeq(Long userSeq) {return boxRepositorySpp.findCloseBoxByUserSeq(userSeq);}

    @Override
    public List<BoxUserDetailBean> boxOpenUserListByUserSeq(Long userSeq) {
        List<Long> oBoxUser = boxRepositorySpp.findOpenBoxUserByUserSeq(userSeq);

        if(!oBoxUser.isEmpty()) {
            for (int i = 0; i < oBoxUser.size(); i++) {
                return boxRepositorySpp.findAllBoxUserByBoxSeq(oBoxUser.get(i));
            }
        }
        return Collections.emptyList();
    }

    @Override
    public List<BoxUserDetailBean> boxCloseUserListByUserSeq(Long userSeq) {
        List<Long> cBoxUser = boxRepositorySpp.findCloseBoxUserByUserSeq(userSeq);

        if(!cBoxUser.isEmpty()) {
            for (int i = 0; i < cBoxUser.size(); i++) {
                return boxRepositorySpp.findAllBoxUserByBoxSeq(cBoxUser.get(i));
            }
        }
        return Collections.emptyList();
    }

    @Override
    public List<OpenBoxReadyBean> openBoxReadyListByBoxSeq(Long boxSeq) {
        List<OpenBoxReadyBean> openBoxReadyList = boxRepositorySpp.findOpenBoxReadyByBoxSeq(boxSeq);

        return openBoxReadyList != null ? openBoxReadyList : Collections.emptyList();
    }
}
