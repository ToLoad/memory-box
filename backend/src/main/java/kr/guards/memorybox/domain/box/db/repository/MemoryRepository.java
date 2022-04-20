package kr.guards.memorybox.domain.box.db.repository;

import kr.guards.memorybox.domain.box.db.entity.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryRepository extends JpaRepository<Box, Long> {

}
