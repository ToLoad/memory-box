package kr.guards.memorybox.domain.box.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import kr.guards.memorybox.domain.user.db.entity.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "box")
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "box_seq")
    private Long boxSeq;

    @NotNull
    @Column(name = "user_seq")
    private Long userSeq;

    @NotBlank
    @Size(max = 20)
    @Column(name = "box_name")
    private String boxName;

    @NotBlank
    @Size(max = 50)
    @Column(name = "box_description")
    private String boxDescription;

    @CreatedDate
    @Column(name = "box_created_at")
    private LocalDateTime boxCreatedAt;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @Column(name = "box_open_at")
    private LocalDateTime boxOpenAt;

    @NotNull
    @Column(name = "box_isSolo")
    private boolean boxIsSolo;

    @NotNull
    @Column(name = "box_isOpen")
    private boolean boxIsOpen;

    @Size(max = 30)
    @Column(name = "box_loc_name")
    private String boxLocName;

    @Column(name = "box_loc_lat")
    private double boxLocLat;

    @Column(name = "box_loc_lng")
    private double boxLocLng;

    @Size(max = 50)
    @Column(name = "box_loc_address")
    private String boxLocAddress;

    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

    @Builder
    public Box(Long userSeq, String boxName, String boxDescription, LocalDateTime boxOpenAt, boolean boxIsSolo, boolean boxIsOpen, String boxLocName, double boxLocLat, double boxLocLng, String boxLocAddress) {
        this.userSeq = userSeq;
        this.boxName = boxName;
        this.boxDescription = boxDescription;
        this.boxOpenAt = boxOpenAt;
        this.boxIsSolo = boxIsSolo;
        this.boxIsOpen = boxIsOpen;
        this.boxLocName = boxLocName;
        this.boxLocLat = boxLocLat;
        this.boxLocLng = boxLocLng;
        this.boxLocAddress = boxLocAddress;
    }
}
