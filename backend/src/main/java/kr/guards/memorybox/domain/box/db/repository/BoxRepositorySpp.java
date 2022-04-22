package kr.guards.memorybox.domain.box.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;
import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.QBox;
import kr.guards.memorybox.domain.box.db.entity.QBoxLocation;
import kr.guards.memorybox.domain.box.db.entity.QBoxUser;
import kr.guards.memorybox.domain.user.db.entity.QUser;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class BoxRepositorySpp {

    private final JPAQueryFactory jpaQueryFactory;

    public BoxRepositorySpp(JPAQueryFactory jpaQueryFactory) {this.jpaQueryFactory = jpaQueryFactory;}

    QBox qBox = QBox.box;
    QBoxLocation qBoxLocation = QBoxLocation.boxLocation;
    QBoxUser qBoxUser = QBoxUser.boxUser;
    QUser qUser = QUser.user;

    
    // 열린 함 조회
    public List<BoxDetailList> findOpenBoxByUserSeq(Long userSeq) {
       return jpaQueryFactory.select(Projections.constructor(BoxDetailList.class, qBox.boxSeq, qBox.boxName, qBox.boxDescription,
                       qBox.boxCreatedAt, qBox.boxOpenAt, qBoxLocation.boxLocLat, qBoxLocation.boxLocLng, qBoxLocation.boxLocAddress)).from(qBox)
               .leftJoin(qBoxUser).on(qBoxUser.boxSeq.eq(qBox.boxSeq))
               .leftJoin(qBoxLocation).on(qBoxLocation.boxSeq.eq(qBox.boxSeq))
               .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
               .where(qBoxUser.userSeq.eq(userSeq).and(qBox.boxIsOpen.isTrue()))
               .groupBy(qBox.boxSeq)
               .fetch();
    }

    // 닫힌 함 조회
    public List<BoxDetailList> findCloseBoxByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxDetailList.class, qBox.boxSeq, qBox.boxName, qBox.boxDescription,
                        qBox.boxCreatedAt, qBox.boxOpenAt, qBoxLocation.boxLocLat, qBoxLocation.boxLocLng, qBoxLocation.boxLocAddress)).from(qBox)
                .leftJoin(qBoxUser).on(qBoxUser.boxSeq.eq(qBox.boxSeq))
                .leftJoin(qBoxLocation).on(qBoxLocation.boxSeq.eq(qBox.boxSeq))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq).and(qBox.boxIsOpen.isFalse()))
                .groupBy(qBox.boxSeq)
                .fetch();
    }

    // 열린 함 개인 혹은 멤버 조회
    public List<Long> findOpenBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(qBoxUser.boxSeq).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxSeq.eq(qBoxUser.boxSeq))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq).and(qBox.boxIsOpen.isTrue()))
                .fetch();
    }

    // 닫힌 함 개인 혹은 멤버 조회
    public List<Long> findCloseBoxUserByUserSeq(Long userSeq) {
        return jpaQueryFactory.select(qBoxUser.boxSeq).from(qBoxUser)
                .leftJoin(qBox).on(qBox.boxSeq.eq(qBoxUser.boxSeq))
                .leftJoin(qUser).on(qUser.userSeq.eq(qBoxUser.userSeq))
                .where(qBoxUser.userSeq.eq(userSeq).and(qBox.boxIsOpen.isFalse()))
                .fetch();
    }


    public List<BoxUserDetailList> findAllBoxUserByBoxSeq(Long boxSeq) {
        return jpaQueryFactory.select(Projections.constructor(BoxUserDetailList.class, qBoxUser.boxSeq, qUser.userSeq, qUser.userProfileImage)).from(qUser)
                .leftJoin(qBoxUser).on(qBoxUser.userSeq.eq(qUser.userSeq))
                .where(qBoxUser.boxSeq.eq(boxSeq))
                .fetch();
    }
}
