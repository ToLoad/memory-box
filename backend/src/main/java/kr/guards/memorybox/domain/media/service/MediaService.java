package kr.guards.memorybox.domain.media.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.user.db.entity.UserProfileImg;

public interface MediaService {
    BoxUserFile getUserFile(Long fileSeq);
    UserProfileImg getUserProfileImg(Long imgSeq);
}
