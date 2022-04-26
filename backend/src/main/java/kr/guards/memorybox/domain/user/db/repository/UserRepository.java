package kr.guards.memorybox.domain.user.db.repository;

import kr.guards.memorybox.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserKakaoId(Long userKakaoId);

}
