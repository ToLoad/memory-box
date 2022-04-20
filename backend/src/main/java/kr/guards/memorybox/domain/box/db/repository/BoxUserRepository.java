package kr.guards.memorybox.domain.box.db.repository;

import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxUserRepository extends JpaRepository<BoxUser, Long> {
}
