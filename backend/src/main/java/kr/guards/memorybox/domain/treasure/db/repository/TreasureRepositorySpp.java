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

//    public List<AroundTreasureGetRes> getAroundTreasure(Double treasureLocLat, Double treasureLocLng){
//        return jpaQueryFactory.select((Projections.constructor(AroundTreasureGetRes.class, qTreasure.treasureSeq, qTreasure.treasureLocLat, qTreasure.treasureLocLng)),
//                        Expressions.constantAs(distance, ))
//                .from(qTreasure)
//                .where((6371*acos(cos(treasureLocLat * Math.PI / 180.0)*cos(Math.toRadians(qTreasure.treasureLocLat)*cos(radians(qTreasure.treasureLocLng)-radians(treasureLocLng))+sin(radians(treasureLocLat))*sin(radians(qTreasure.treasureLocLat))) < 1))
//                .fetch();
//    }

}
