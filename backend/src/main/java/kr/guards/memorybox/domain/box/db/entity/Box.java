package kr.guards.memorybox.domain.box.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "box")
public class Box {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "box_seq")
    private Long boxSeq;

    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "box_name")
    private String boxName;

    @Column(name = "box_content")
    private String boxContent;

    @Column(name = "box_created_at")
    private LocalDateTime boxCreatedAt;

    @Column(name = "box_open_at")
    private LocalDateTime boxOpenAt;

    @Column(name = "box_loc_name")
    private String boxLocName;

    @Column(name = "box_isSolo")
    private boolean boxIsSolo;

}
