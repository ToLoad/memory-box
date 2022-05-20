package kr.guards.memorybox.domain.treasure.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "treasure")
public class Treasure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treasure_seq")
    private Long treasureSeq;

    @Size(max = 50)
    @Column(name = "treasure_loc_name")
    private String treasureLocName;

    @NotNull
    @Column(name = "treasure_loc_lat")
    private Double treasureLocLat;

    @NotNull
    @Column(name = "treasure_loc_lng")
    private Double treasureLocLng;

    @Size(max = 70)
    @Column(name = "treasure_loc_address")
    private String treasureLocAddress;

    @Builder
    public Treasure(String treasureLocName, Double treasureLocLat, Double treasureLocLng, String treasureLocAddress) {
        this.treasureLocName = treasureLocName;
        this.treasureLocLat = treasureLocLat;
        this.treasureLocLng = treasureLocLng;
        this.treasureLocAddress = treasureLocAddress;
    }
}
