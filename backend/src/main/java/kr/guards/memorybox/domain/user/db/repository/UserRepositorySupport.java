package kr.guards.memorybox.domain.user.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.guards.memorybox.domain.user.db.entity.QUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class UserRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QUser qUser = QUser.user;

    public Long modifyUserProfileImgUrl(Long userSeq, String profileImgUrl) {
        return jpaQueryFactory.update(qUser)
                .set(qUser.userProfileImage, profileImgUrl)
                .where(qUser.userSeq.eq(userSeq))
                .execute();
    }
}
