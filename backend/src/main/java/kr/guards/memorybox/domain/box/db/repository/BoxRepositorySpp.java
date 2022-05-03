package kr.guards.memorybox.domain.box.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserMemoryBean;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
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


    // 전체 함 조회
    public List<BoxDetailBean> findAllBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress)).from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq).and(qBoxUser.boxUserIsHide.isFalse()))
                .orderBy(qBox.boxOpenAt.asc())
                .fetch();
    }
    
    // 열린 함 조회
    public List<BoxDetailBean> findOpenBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress)).from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq).and(qBox.boxIsOpen.isTrue()).and(qBoxUser.boxUserIsHide.isFalse()))
                .fetch();
    }

    // 닫힌 함 조회
    public List<BoxDetailBean> findCloseBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress)).from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq)
                        .and(qBox.boxIsOpen.isFalse())
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(qBox.boxCreatedAt.loe(LocalDateTime.now()))
                        .and(qBox.boxOpenAt.gt(LocalDateTime.now())))
                .fetch();
    }

    // 준비중인 함 조회
    public List<BoxDetailBean> findReadyBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress)).from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxId.eq(qBox.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq)
                        .and(qBox.boxIsOpen.isFalse())
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(qBox.boxOpenAt.loe(LocalDateTime.now())))
                .fetch();
    }

    // 전체 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findAllBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qUser.userNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(qBoxUser.userSeq.eq(userSeq)
                                .and(qBoxUser.boxUserIsHide.isFalse()))))
                .fetch();
    }

    // 열린 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findOpenBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qUser.userNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(qBoxUser.userSeq.eq(userSeq)
                        .and(qBoxUser.boxUserIsHide.isFalse())))
                        .and(qBox.boxIsOpen.isTrue()))
                .fetch();
    }

    // 닫힌 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findCloseBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qUser.userNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(qBoxUser.userSeq.eq(userSeq)
                        .and(qBoxUser.boxUserIsHide.isFalse())))
                        .and(qBox.boxIsOpen.isFalse())
                        .and(qBox.boxCreatedAt.loe(LocalDateTime.now()))
                        .and(qBox.boxOpenAt.gt(LocalDateTime.now())))
                .fetch();
    }

    // 준비중인 함 개인 혹은 멤버 조회
    public List<BoxUserDetailBean> findReadyBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailBean.class, qBoxUser.boxId, qUser.userSeq, qUser.userNickname, qUser.userProfileImage)).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.boxId.in(select(qBoxUser.boxId).from(qBoxUser).where(qBoxUser.userSeq.eq(userSeq)
                                .and(qBoxUser.boxUserIsHide.isFalse())))
                        .and(qBox.boxIsOpen.isFalse())
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(qBox.boxOpenAt.loe(LocalDateTime.now())))
                .fetch();
    }

    // 기억함 열기 대기 상태 조회(열기 예정 시간이 현재 시간 이전이고 숨기기 안했을 때 조회)
    public List<OpenBoxReadyBean> findOpenBoxReadyByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(OpenBoxReadyBean.class, qBoxUser.boxUserSeq, qBoxUser.userSeq, qUser.userNickname, qUser.userProfileImage, qBoxUser.boxUserIsCome)).from(qBoxUser)
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .leftJoin(qBox).on(qBox.boxId.eq(qBoxUser.boxId))
                .where(qBoxUser.boxId.eq(boxId)
                        .and(qBoxUser.boxUserIsHide.isFalse())
                        .and(qBox.boxOpenAt.loe(LocalDateTime.now())))
                .fetch();
    }

    public BoxDetailBean findBoxDetailByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailBean.class, qBox.boxId, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBox.boxLocName, qBox.boxLocLat, qBox.boxLocLng, qBox.boxLocAddress)).from(qBox)
                .where(qBox.boxId.eq(boxId))
                .fetchOne();
    }

    public List<BoxUserMemoryBean> findBoxUserDetailByBoxId(String boxId) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserMemoryBean.class, qBoxUser.boxUserSeq, qUser.userSeq, qUser.userEmail, qBoxUser.boxUserNickname, qUser.userProfileImage, qBoxUser.boxUserText, qBoxUser.boxUserVoice))
                .from(qUser)
                .leftJoin(qBoxUser).on(qBoxUser.userSeq.eq(qUser.userSeq))
                .where(qBoxUser.boxId.eq(boxId))
                .fetch();
    }
}
