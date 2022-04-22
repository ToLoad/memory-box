package kr.guards.memorybox.domain.user.db.repository;

import kr.guards.memorybox.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserKakaoId(Long userKakaoId);

}
