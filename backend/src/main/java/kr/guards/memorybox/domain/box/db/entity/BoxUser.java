package kr.guards.memorybox.domain.box.db.entity;

import kr.guards.memorybox.domain.user.db.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Table(name = "box_user")
public class BoxUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "box_user_seq")
    private Long boxUserSeq;

    @Column(name = "box_seq")
    private Long boxSeq;

    @Column(name = "user_seq")
    private Long userSeq;

    @Size(max = 1000)
    @Column(name = "box_user_text", columnDefinition="TEXT")
    private String boxUserText;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "box_user_isCome")
    private boolean boxUserIsCome;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "box_user_isDone")
    private boolean boxUserIsDone;

    @OneToOne
    @JoinColumn(name = "box_seq", insertable = false, updatable = false)
    private Box box;

    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

    @Builder
    public BoxUser(Long boxUserSeq, Long boxSeq, Long userSeq, String boxUserText, boolean boxUserIsCome, boolean boxUserIsDone) {
        this.boxUserSeq = boxUserSeq;
        this.boxSeq = boxSeq;
        this.userSeq = userSeq;
        this.boxUserText = boxUserText;
        this.boxUserIsCome = boxUserIsCome;
        this.boxUserIsDone = boxUserIsDone;
    }
}
