package kr.guards.memorybox.domain.media.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import kr.guards.memorybox.domain.user.db.entity.UserProfileImg;
import kr.guards.memorybox.domain.user.db.repository.UserProfileImgRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MediaServiceImpl implements MediaService {
    private final BoxUserFileRepository boxUserFileRepository;
    private final UserProfileImgRepository userProfileImgRepository;

    public MediaServiceImpl(BoxUserFileRepository boxUserFileRepository, UserProfileImgRepository userProfileImgRepository) {
        this.boxUserFileRepository = boxUserFileRepository;
        this.userProfileImgRepository = userProfileImgRepository;
    }

    @Override
    public BoxUserFile getUserFile(Long fileSeq) {
        Optional<BoxUserFile> oBoxUserFile = boxUserFileRepository.findById(fileSeq);
        return oBoxUserFile.orElse(null);
    }

    @Override
    public UserProfileImg getUserProfileImg(Long imgSeq) {
        Optional<UserProfileImg> oUserProfileImg = userProfileImgRepository.findById(imgSeq);
        return oUserProfileImg.orElse(null);
    }
}
