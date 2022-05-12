package kr.guards.memorybox.domain.treasure.db.repository;

import kr.guards.memorybox.domain.treasure.db.entity.Treasure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreasureRepository extends JpaRepository<Treasure, Long> {
    @Query(value = "SELECT *, (6371*acos(cos(radians(lat))*cos(radians(treasure_loc_lat))*cos(radians(treasure_loc_lng)))-radians(lng))+sin(radians(lat))*sin(radians(treasure_loc_lat)))) AS distance FROM treasure HAVING distance <= 2", nativeQuery = true)
    List<Treasure> test(double lat, double lng);
}
