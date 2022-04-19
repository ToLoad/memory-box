package kr.guards.memorybox.domain.box.db.entity;

import kr.guards.memorybox.domain.user.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
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

    @Column(name = "box_user_text")
    private String boxUserText;

    @Column(name = "box_user_isCome")
    private boolean boxUserIsCome;

    @Column(name = "box_user_isDone")
    private boolean boxUserIsDone;

    @OneToOne
    @JoinColumn(name = "box_seq", insertable = false, updatable = false)
    private Box box;

    @OneToOne
    @JoinColumn(name = "user_seq", insertable = false, updatable = false)
    private User user;

}
