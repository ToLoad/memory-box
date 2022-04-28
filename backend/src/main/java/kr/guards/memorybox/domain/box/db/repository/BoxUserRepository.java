package kr.guards.memorybox.domain.box.db.repository;

import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoxUserRepository extends JpaRepository<BoxUser, Long> {
    Optional<BoxUser> findBoxUserByBoxSeqAndUserSeq(Long boxSeq, Long userSeq);
    List<BoxUser> findAllByBoxSeq(Long boxSeq);

    List<BoxUser> findBoxUserByUserSeq(Long userSeq);

    Integer countBoxUserByBoxSeq(Long boxSeq);
    Integer countBoxUserByBoxUserIsComeTrueAndBoxSeq(Long boxSeq);
}
