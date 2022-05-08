package kr.guards.memorybox.domain.box.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.db.entity.QBox;
import kr.guards.memorybox.domain.box.db.entity.QBoxUser;
import kr.guards.memorybox.domain.user.db.entity.QUser;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.querydsl.jpa.JPAExpressions.select;


@Repository
public class BoxRepositorySpp {

    private final JPAQueryFactory jpaQueryFactory;

    public BoxRepositorySpp(JPAQueryFactory jpaQueryFactory) {this.jpaQueryFactory = jpaQueryFactory;}

    QBox qBox = QBox.box;
    QBoxUser qBoxUser = QBoxUser.boxUser;
    QUser qUser = QUser.user;


    private final int READY = 0;
    private final int WAIT = 1;
    private final int CLOSE = 2;
    private final int OPEN = 3;


    // 열린 함 조회
    public List<BoxDetailBean> findOpenBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress, Expressions.asNumber(OPEN).as("boxType"), qBoxUser.boxUserIsDone))
                .from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(userSeqEquals(userSeq)
                        .and(qBoxUser.boxUserIsOpen.isTrue())
                        .and(qBoxUser.boxUserIsHide.isFalse()))
                .fetch();

    }

    // 닫힌 함 조회
    public List<BoxDetailBean> findCloseBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress, Expressions.asNumber(CLOSE).as("boxType"), qBoxUser.boxUserIsDone))
                .from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(userSeqEquals(userSeq)
                        .and(qBox.boxIsDone.isTrue())
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(boxCreatedAtLoe(LocalDateTime.now()))
                        .and(boxOpenAtGt(LocalDateTime.now())))
                .fetch();
    }

    // 기억함 오픈 대기중인 함 조회
    public List<BoxDetailBean> findWaitBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress, Expressions.asNumber(WAIT).as("boxType"), qBoxUser.boxUserIsDone))
                .from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(userSeqEquals(userSeq)
                        .and(qBox.boxIsDone.isTrue())
                        .and(qBoxUser.boxUserIsOpen.isFalse())
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(boxOpenAtLoe(LocalDateTime.now())))
                .fetch();
    }


    // 기억함 담기 준비중인 함 조회
    public List<BoxDetailBean> findReadyBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress, Expressions.asNumber(READY).as("boxType"), qBoxUser.boxUserIsDone))
                .from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(userSeqEquals(userSeq)
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(qBox.boxIsDone.isFalse()))
                .fetch();
    }

    // 숨긴 기억함 조회
    public List<BoxDetailBean> findHideBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress, Expressions.asNumber(READY).as("boxType"), qBoxUser.boxUserIsDone)).from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq).and(qBoxUser.boxUserIsHide.isTrue()))
                .fetch();
    }


    // 열린 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findOpenBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(userSeqEquals(userSeq)
                        .and(qBoxUser.boxUserIsOpen.isTrue()).and(qBoxUser.boxUserIsHide.isFalse()))))
                        .fetch();
    }

    // 닫힌 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findCloseBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(userSeqEquals(userSeq)
                                .and(qBox.boxIsDone.isTrue())
                                .and(qBoxUser.boxUserIsHide.isFalse())
                                .and(boxCreatedAtLoe(LocalDateTime.now()))
                                .and(boxOpenAtGt(LocalDateTime.now())))))
                        .fetch();
    }

    // 기억함 오픈 대기중인 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findWaitBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(userSeqEquals(userSeq)
                                .and(qBox.boxIsDone.isTrue())
                                .and(qBoxUser.boxUserIsHide.isFalse())
                                .and(qBoxUser.boxUserIsOpen.isFalse())
                                .and(boxOpenAtLoe(LocalDateTime.now())))))
                        .fetch();
    }

    // 기억함 담기 준비중인 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findReadyBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(userSeqEquals(userSeq)
                                .and(qBoxUser.boxUserIsHide.isFalse()).and(qBox.boxIsDone.isFalse()))))
                .fetch();
    }

    // 숨긴 기억함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findHideBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(qBoxUser.userSeq.eq(userSeq)
                        .and(qBoxUser.boxUserIsHide.isTrue()))))
                .fetch();
    }

    // 기억함 열기 대기 상태 조회(열기 예정 시간이 현재 시간 이전이고)
    public List<OpenBoxReadyBean> findOpenBoxReadyByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(OpenBoxReadyBean.class, qBoxUser.boxUserSeq, qBoxUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage, qBoxUser.boxUserIsCome))
                .from(qBoxUser)
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .where(boxUserBoxIdEquals(boxId).and(boxOpenAtLoe(LocalDateTime.now())))
                .fetch();
    }

    // 기억함 묻기 준비 상태 조회
    public List<CloseBoxReadyBean> findCloseBoxReadyByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(CloseBoxReadyBean.class, qBoxUser.boxUserSeq, qBoxUser.userSeq, qBoxUser.boxUserNickname, qUser.userProfileImage, qBoxUser.boxUserIsDone))
                .from(qBoxUser)
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .where(boxUserBoxIdEquals(boxId))
                .fetch();
    }

    public MemoriesBoxDetailBean findBoxDetailByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(MemoriesBoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress, qBox.boxIsSolo)).from(qBox)
                .where(qBox.boxId.eq(boxId))
                .fetchOne();
    }

    public List<BoxUserMemoryBean> findBoxUserDetailByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserMemoryBean.class, qBoxUser.boxUserSeq, qUser.userSeq, qUser.userEmail, qBoxUser.boxUserNickname, qUser.userProfileImage, qBoxUser.boxUserText, qBoxUser.boxUserVoice))
                .from(qUser)
                .leftJoin(qBoxUser).on(qBoxUser.userSeq.eq(qUser.userSeq))
                .where(boxUserBoxIdEquals(boxId))
                .fetch();
    }


    private BooleanExpression userSeqEquals(Long userSeq) {
        return userSeq != null ? qBoxUser.userSeq.eq(userSeq) : null;
    }

    private BooleanExpression boxCreatedAtLoe(LocalDateTime boxCreateAt) {
        return boxCreateAt != null ? qBox.boxCreatedAt.loe(LocalDateTime.now()) : null;
    }

    private BooleanExpression boxOpenAtGt(LocalDateTime boxOpenAt) {
        return boxOpenAt != null ? qBox.boxOpenAt.gt(LocalDateTime.now()) : null;
    }

    private BooleanExpression boxOpenAtLoe(LocalDateTime boxOpenAt) {
        return boxOpenAt != null ? qBox.boxOpenAt.loe(LocalDateTime.now()) : null;
    }

    private BooleanExpression boxUserBoxIdEquals(String boxId) {
        return boxId != null ? qBoxUser.boxId.eq(boxId) : null;
    }

    private BooleanExpression boxIdEquals(String boxId) {
        return boxId != null ? qBox.boxId.eq(boxId) : null;
    }
}
