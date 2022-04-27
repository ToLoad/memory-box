package kr.guards.memorybox.domain.user.db.repository;

import kr.guards.memorybox.domain.user.db.entity.UserProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileImgRepository extends JpaRepository<UserProfileImg, Long> {
    UserProfileImg findByUserSeq(Long userSeq);
}
