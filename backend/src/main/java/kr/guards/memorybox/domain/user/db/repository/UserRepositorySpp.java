package kr.guards.memorybox.domain.user.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.guards.memorybox.domain.user.db.entity.QUser;
import kr.guards.memorybox.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class UserRepositorySpp {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QUser qUser = QUser.user;

    public Long modifyUserProfileImgUrl(Long userSeq, String profileImgUrl) {
        return jpaQueryFactory.update(qUser)
                .set(qUser.userProfileImage, profileImgUrl)
                .where(qUser.userSeq.eq(userSeq))
                .execute();
    }

    public Long modifyBoxRemain(Long userSeq, Integer boxCnt) {
        User user = jpaQueryFactory.selectFrom(qUser).where(qUser.userSeq.eq(userSeq)).fetchOne();
        return jpaQueryFactory.update(qUser)
                .set(qUser.userBoxRemain, user.getUserBoxRemain() + boxCnt)
                .where(qUser.userSeq.eq(userSeq))
                .execute();
    }
}
