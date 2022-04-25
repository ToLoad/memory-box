package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxLocationRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.box.request.BoxUserTextPostReq;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class MemoryServiceImpl implements MemoryService {
    private final BoxLocationRepository boxLocationRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;

    @Autowired
    public MemoryServiceImpl(BoxLocationRepository boxLocationRepository, BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository) {
        this.boxLocationRepository = boxLocationRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;
    }

    @Value("${app.file.main.path}")
    private String filePath;
    @Value("${app.file.image.dir}")
    private String imageDir;
    @Value("${app.file.video.dir}")
    private String videoDir;

    @Override
    public boolean boxCreateUserFrame(Long boxSeq, Long userSeq) {
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

    @Override
    public boolean boxSaveUserText(BoxUserTextPostReq boxUserTextPostReq, Long userSeq) {
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxSeqAndUserSeq(boxUserTextPostReq.getBoxSeq(), userSeq);
        if (oBoxUser.isPresent()) {
            BoxUser curBoxUser = oBoxUser.get();
            BoxUser boxUser = BoxUser.builder()
                    .boxUserSeq(curBoxUser.getBoxUserSeq())
                    .boxSeq(curBoxUser.getBoxSeq())
                    .userSeq(curBoxUser.getUserSeq())
                    .boxUserText(boxUserTextPostReq.getBoxUserText())
                    .boxUserIsCome(curBoxUser.isBoxUserIsCome())
                    .boxUserIsDone(curBoxUser.isBoxUserIsDone())
                    .build();

            try {
                boxUserRepository.save(boxUser);
            } catch (Exception e) {
                log.error(e.getMessage());
                return false;
            }
            return true;
        }
        return false;
    }

    @Override
    public boolean boxSaveUserImage(MultipartHttpServletRequest request, Long boxUserSeq) {
        List<MultipartFile> imageList = request.getFiles("image");
        File uploadDir = new File(filePath + File.separator + imageDir);

        if (saveFile(imageList, uploadDir, boxUserSeq, "image")) return true;
        return false;
    }

    @Override
    public boolean boxChangeLockReady(Long boxUserSeq) {
        Optional<BoxUser> oBoxUser = boxUserRepository.findById(boxUserSeq);
        if (oBoxUser.isPresent()) {
            BoxUser curBoxUser = oBoxUser.get();
            BoxUser boxUser = BoxUser.builder()
                    .boxUserSeq(curBoxUser.getBoxUserSeq())
                    .boxSeq(curBoxUser.getBoxSeq())
                    .userSeq(curBoxUser.getUserSeq())
                    .boxUserText(curBoxUser.getBoxUserText())
                    .boxUserIsCome(curBoxUser.isBoxUserIsCome())
                    .boxUserIsDone(true) // 묻기 준비 완료 여부 true 변경
                    .build();

            try {
                boxUserRepository.save(boxUser);
            } catch (Exception e) {
                log.error(e.getMessage());
                return false;
            }
            return true;
        }
        return false;
    }

    private boolean saveFile(List<MultipartFile> files, File uploadDir, Long boxUserSeq, String type) {
        try {
            if (!uploadDir.exists()) uploadDir.mkdirs();

            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename();
                UUID uuid = UUID.randomUUID();
                String extension = FilenameUtils.getExtension(fileName);
                String savingFileName = uuid + "." + extension;

                File destFile = null;
                String fileUrl = null;

                if (type.equals("image")) {
                    destFile = new File(filePath + File.separator, imageDir + File.separator + savingFileName);
                    fileUrl = "/" + imageDir + "/" + savingFileName;
                } else if (type.equals("video")) {
                    destFile = new File(filePath + File.separator, videoDir + File.separator + savingFileName);
                    fileUrl =  "/" + videoDir + "/" + savingFileName;
                }
                log.warn("DestFile : " + destFile.getPath());
                file.transferTo(destFile);

                BoxUserFile boxUserFile = BoxUserFile.builder()
                        .boxUserSeq(boxUserSeq)
                        .fileName(fileName)
                        .fileSize(file.getSize())
                        .fileContentType(file.getContentType())
                        .fileUrl(fileUrl)
                        .build();

                boxUserFileRepository.save(boxUserFile);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return true;
    }

}
