package kr.guards.memorybox.domain.box.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import kr.guards.memorybox.domain.user.db.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "box_id")
    private String boxId;

    @Column(name = "user_seq")
    private Long userSeq;

    @Size(max = 1000)
    @Column(name = "box_user_text", columnDefinition="TEXT")
    private String boxUserText;

    @Column(name = "box_user_voice")
    private String boxUserVoice;

    @Size(max = 20)
    @Column(name = "box_user_nickname")
    private String boxUserNickname;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "box_user_isCome")
    private boolean boxUserIsCome;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "box_user_isDone")
    private boolean boxUserIsDone;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "box_user_is_hide")
    private boolean boxUserIsHide;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "box_user_is_open")
    private boolean boxUserIsOpen;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "box_id", insertable = false, updatable = false)
    private Box box;

    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "boxUser", cascade = CascadeType.REMOVE)
    List<BoxUserFile> boxUserFileList = new ArrayList<>();

    public void setBoxUserText(String boxUserText) {
        this.boxUserText = boxUserText;
    }

    public void setBoxUserVoice(String boxUserVoice) {
        this.boxUserVoice = boxUserVoice;
    }

    public void setBoxUserIsDone(boolean isDone) {
        this.boxUserIsDone = isDone;
    }

    public void setBoxUserNickname(String nickname) { this.boxUserNickname = nickname; }

    @Builder
    public BoxUser(Long boxUserSeq, String boxId, Long userSeq, String boxUserText, String boxUserVoice, String boxUserNickname, boolean boxUserIsCome, boolean boxUserIsDone, boolean boxUserIsHide) {
        this.boxUserSeq = boxUserSeq;
        this.boxId = boxId;
        this.userSeq = userSeq;
        this.boxUserText = boxUserText;
        this.boxUserVoice = boxUserVoice;
        this.boxUserNickname = boxUserNickname;
        this.boxUserIsCome = boxUserIsCome;
        this.boxUserIsDone = boxUserIsDone;
        this.boxUserIsHide = boxUserIsHide;
    }
}
