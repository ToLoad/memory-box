package kr.guards.memorybox.domain.box.db.entity;

import kr.guards.memorybox.domain.user.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "box_user_file")
public class BoxUserFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long fileId;

    @Column(name = "box_user_seq")
    private Long boxUserSeq;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_size")
    private int fileSize;

    @Column(name = "file_content")
    private String fileContent;

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "file_reg_dt")
    private LocalDateTime fileRegDt;

    @OneToOne
    @JoinColumn(name = "box_user_seq", insertable = false, updatable = false)
    private BoxUser boxUser;
}
