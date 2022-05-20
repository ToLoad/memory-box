package kr.guards.memorybox.domain.treasure.db.repository;

import kr.guards.memorybox.domain.treasure.db.entity.Treasure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreasureRepository extends JpaRepository<Treasure, Long> {
    Treasure findByTreasureLocLatAndTreasureLocLng(Double treasureLocLat, Double treasureLocLng);
}
