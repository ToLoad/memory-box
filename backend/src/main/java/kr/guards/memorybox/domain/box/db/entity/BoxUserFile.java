package kr.guards.memorybox.domain.box.db.entity;

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
@Table(name = "box_user_file")
public class BoxUserFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_seq")
    private Long fileSeq;

    @NotNull
    @Column(name = "box_user_seq")
    private Long boxUserSeq;

    @NotBlank
    @Column(name = "file_name")
    private String fileName;

    @NotNull
    @Column(name = "file_size")
    private Long fileSize;

    @NotBlank
    @Size(max = 10)
    @Column(name = "file_content_type")
    private String fileContentType;

    @NotBlank
    @Column(name = "file_url")
    private String fileUrl;

    @CreatedDate
    @Column(name = "file_reg_dt")
    private LocalDateTime fileRegDt;

    @OneToOne
    @JoinColumn(name = "box_user_seq", insertable = false, updatable = false)
    private BoxUser boxUser;

    @Builder
    public BoxUserFile(Long boxUserSeq, String fileName, Long fileSize, String fileContentType, String fileUrl) {
        this.boxUserSeq = boxUserSeq;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.fileContentType = fileContentType;
        this.fileUrl = fileUrl;
    }
}
