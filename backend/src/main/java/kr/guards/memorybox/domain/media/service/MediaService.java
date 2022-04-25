package kr.guards.memorybox.domain.media.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;

public interface MediaService {
    BoxUserFile getUserFile(Long fileSeq);
}
