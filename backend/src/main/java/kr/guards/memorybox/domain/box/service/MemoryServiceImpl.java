package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.box.request.AllMemoriesPostReq;
import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.global.util.AES256Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MemoryServiceImpl implements MemoryService {
    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;
    private final UserRepository userRepository;
    private final AES256Util aes256Util;

    @Autowired
    public MemoryServiceImpl(BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository, UserRepository userRepository, AES256Util aes256Util) {
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;
        this.userRepository = userRepository;
        this.aes256Util = aes256Util;
    }

    @Override
    public int boxCreateUserFrame(String boxId, Long userSeq) {
        // 0 오류, 1 생성 성공, 2 중복, 3 이미 생성됨

        // 중복 여부 체크
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);
        if (oBoxUser.isPresent()) {
            BoxUser boxUser = oBoxUser.get();

            if (boxUser.getBoxUserText() == null) return 2;
            return 3;
        }

        User user = userRepository.getById(userSeq);
        BoxUser boxUser = BoxUser.builder()
                .boxId(boxId)
                .userSeq(userSeq)
                .boxUserNickname(user.getUserNickname())
                .build();

        try {
            boxUserRepository.save(boxUser);
        } catch (Exception e) {
            log.error(e.getMessage());
            return 0;
        }
        return 1;
    }

    @Override
    public boolean saveAllMemories(AllMemoriesPostReq allMemoriesPostReq, String boxId, Long userSeq) {
        // 혼자담기 일 때 준비 완료 처리
        Optional<Box> oBox = boxRepository.findById(boxId);
        if (oBox.isPresent()) {
            Box box = oBox.get();
            if (box.isBoxIsSolo()) {
                Box nBox = Box.builder()
                        .boxId(box.getBoxId())
                        .userSeq(box.getUserSeq())
                        .boxName(box.getBoxName())
                        .boxDescription(box.getBoxDescription())
                        .boxOpenAt(box.getBoxOpenAt())
                        .boxIsSolo(box.isBoxIsSolo())
                        .boxIsDone(true)
                        .boxLocName(box.getBoxLocName())
                        .boxLocLat(box.getBoxLocLat())
                        .boxLocLng(box.getBoxLocLng())
                        .boxLocAddress(box.getBoxLocAddress())
                        .boxCreatedAt(box.getBoxCreatedAt())
                        .build();
                boxRepository.save(nBox);
            }
        }

        try {
            Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);
            if (oBoxUser.isPresent()) {
                BoxUser boxUser = oBoxUser.get();

                // 텍스트 넣기
                if (allMemoriesPostReq.getContent() != null) {
                    boxUser.setBoxUserText(aes256Util.encrypt(allMemoriesPostReq.getContent()));
                }

                // 이미지 넣기
                List<String> imageList = allMemoriesPostReq.getImage();
                if (imageList != null && !imageList.isEmpty()) {
                    for (String url : imageList) {
                        BoxUserFile boxUserFile = BoxUserFile.builder()
                                .boxUserSeq(boxUser.getBoxUserSeq())
                                .fileType("image")
                                .fileUrl(aes256Util.encrypt(url))
                                .build();
                        boxUserFileRepository.save(boxUserFile);
                    }
                }

                // 영상 넣기
                List<String> videoList = allMemoriesPostReq.getVideo();
                if (videoList != null && !videoList.isEmpty()) {
                    for (String url : videoList) {
                        BoxUserFile boxUserFile = BoxUserFile.builder()
                                .boxUserSeq(boxUser.getBoxUserSeq())
                                .fileType("video")
                                .fileUrl(aes256Util.encrypt(url))
                                .build();
                        boxUserFileRepository.save(boxUserFile);
                    }
                }

                // 음성 넣기기
                if (allMemoriesPostReq.getVoice() != null) {
                    boxUser.setBoxUserVoice(aes256Util.encrypt(allMemoriesPostReq.getVoice()));
                }

                boxUser.setBoxUserNickname(allMemoriesPostReq.getNickname());
                boxUser.setBoxUserIsDone(true);
                boxUserRepository.save(boxUser);
                return true;
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return false;
    }
}
