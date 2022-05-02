package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.box.request.AllMemoriesPostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MemoryServiceImpl implements MemoryService {
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;

    @Autowired
    public MemoryServiceImpl(BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository) {
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;
    }

    @Override
    public boolean boxCreateUserFrame(String boxId, Long userSeq) {
        BoxUser boxUser = BoxUser.builder()
                .boxId(boxId)
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

    @Override
    public boolean saveAllMemories(AllMemoriesPostReq allMemoriesPostReq, String boxId, Long userSeq) {
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);
        if (oBoxUser.isPresent()) {
            BoxUser boxUser = oBoxUser.get();

            // 텍스트 넣기
            if (allMemoriesPostReq.getText() != null) {
                boxUser.setBoxUserText(allMemoriesPostReq.getText());
            }

            // 이미지 넣기
            List<String> imageList = allMemoriesPostReq.getImage();
            if (imageList != null && !imageList.isEmpty()) {
                for (String url : imageList) {
                    BoxUserFile boxUserFile = BoxUserFile.builder()
                            .boxUserSeq(boxUser.getBoxUserSeq())
                            .fileType("image")
                            .fileUrl(url)
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
                            .fileUrl(url)
                            .build();
                    boxUserFileRepository.save(boxUserFile);
                }
            }

            // 음성 넣기기
            if (allMemoriesPostReq.getVoice() != null) {
                boxUser.setBoxUserVoice(allMemoriesPostReq.getVoice());
            }

            boxUser.setBoxUserIsDone(true);
            boxUserRepository.save(boxUser);
            return true;
        }

        return false;
    }
}
