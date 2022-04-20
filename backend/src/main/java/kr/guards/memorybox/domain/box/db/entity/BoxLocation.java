package kr.guards.memorybox.domain.box.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "box_location")
public class BoxLocation {
    @Id
    @Column(name = "box_seq")
    private Long boxSeq;

    @Column(name = "box_loc_lat")
    private double boxLocLat;

    @Column(name = "box_loc_lng")
    private double boxLocLng;

    @Column(name = "box_loc_address")
    private String boxLocAddress;

    @OneToOne
    @JoinColumn(name = "box_seq", insertable = false, updatable = false)
    private Box box;

    @Builder
    public BoxLocation(Long boxSeq, double boxLocLat, double boxLocLng, String boxLocAddress) {
        this.boxSeq = boxSeq;
        this.boxLocLat = boxLocLat;
        this.boxLocLng = boxLocLng;
        this.boxLocAddress = boxLocAddress;
    }
}
