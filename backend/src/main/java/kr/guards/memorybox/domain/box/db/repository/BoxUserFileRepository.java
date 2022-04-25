package kr.guards.memorybox.domain.box.db.repository;

import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoxUserFileRepository extends JpaRepository<BoxUserFile, Long> {
    List<BoxUserFile> findAllByBoxUserSeq(Long boxUserSeq);
}
