package kr.guards.memorybox.domain.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MediaServiceImpl implements MediaService {
    private final BoxUserFileRepository boxUserFileRepository;

    public MediaServiceImpl(BoxUserFileRepository boxUserFileRepository) {
        this.boxUserFileRepository = boxUserFileRepository;
    }

    @Override
    public BoxUserFile getUserFile(Long fileSeq) {
        Optional<BoxUserFile> oBoxUserFile = boxUserFileRepository.findById(fileSeq);
        return oBoxUserFile.orElse(null);
    }
}
