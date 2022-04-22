package kr.guards.memorybox.domain.box.db.repository;

import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoxUserFileRepository extends JpaRepository<BoxUserFile, Long> {
}
