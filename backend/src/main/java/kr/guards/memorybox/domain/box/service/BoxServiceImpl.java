package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;
import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Slf4j
@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;
    private final BoxRepositorySpp boxRepositorySpp;

    @Autowired
    public BoxServiceImpl(BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository, BoxRepositorySpp boxRepositorySpp) {
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;
        this.boxRepositorySpp = boxRepositorySpp;
    }

    @Value("${app.file.main.path}")
    private String filePath;

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
    public boolean boxRemove(Long boxSeq, Long userSeq) {
        Optional<Box> oBox = boxRepository.findById(boxSeq);
        if (oBox.isPresent()) {
            Box box = oBox.get();

            // 삭제하려는 기억함의 주인이 현재 API를 호출한 유저와 동일한지 확인
            if (Objects.equals(box.getUserSeq(), userSeq)) {
                // 삭제시에 저장된 파일도 제거하기

                // 1. 해당 기억함에 속한 모든 유저들의 기억틀 불러오기
                List<BoxUser> boxUsers = boxUserRepository.findAllByBoxSeq(box.getBoxSeq());

                // 2. 해당 기억틀의 기억들 파일 하나씩 제거
                for (BoxUser boxUser : boxUsers) {
                    List<BoxUserFile> boxUserFiles = boxUserFileRepository.findAllByBoxUserSeq(boxUser.getBoxUserSeq());
                    for (BoxUserFile boxUserFile : boxUserFiles) {
                        String fileUrl = boxUserFile.getFileUrl();
                        File file = new File(filePath + File.separator, fileUrl);

                        if (file.exists()) file.delete();
                    }
                }

                // 3. DB에서 기억함 제거(기억틀과 기억들은 Join으로 엮여있어서 같이 지워짐)
                boxRepository.delete(box);
                return true;
            }
        }
        return false;
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
