package kr.guards.memorybox.domain.treasure.service;

import kr.guards.memorybox.domain.treasure.db.bean.TreasureListBean;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface TreasureService {
    Boolean registerTreasure();
    List<TreasureListBean> getTreasureList();
    Boolean findTreasure(Long treasureSeq, Long userSeq);
}
