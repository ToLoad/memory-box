package kr.guards.memorybox.domain.treasure.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.guards.memorybox.domain.treasure.db.bean.TreasureListBean;
import kr.guards.memorybox.domain.treasure.db.entity.QTreasure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TreasureRepositorySpp {

    private final JPAQueryFactory jpaQueryFactory;

    public TreasureRepositorySpp(JPAQueryFactory jpaQueryFactory) {this.jpaQueryFactory = jpaQueryFactory;}

    QTreasure qTreasure = QTreasure.treasure;

    public List<TreasureListBean> getTreasureList() {
        return jpaQueryFactory.select((Projections.constructor(TreasureListBean.class, qTreasure.treasureSeq, qTreasure.treasureLocLat, qTreasure.treasureLocLng)))
                .from(qTreasure)
                .fetch();
    }
}
