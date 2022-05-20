package kr.guards.memorybox.domain.treasure.service;

import kr.guards.memorybox.domain.treasure.db.bean.TreasureListBean;
import kr.guards.memorybox.domain.treasure.db.entity.Treasure;
import kr.guards.memorybox.domain.treasure.db.repository.TreasureRepository;
import kr.guards.memorybox.domain.treasure.db.repository.TreasureRepositorySpp;
import kr.guards.memorybox.domain.user.db.repository.UserRepositorySpp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.List;

@Service
@Slf4j
public class TreasureServiceImpl implements TreasureService {

    private final TreasureRepository treasureRepository;
    private final TreasureRepositorySpp treasureRepositorySpp;
    private final UserRepositorySpp userRepositorySpp;

    @Autowired
    public TreasureServiceImpl(TreasureRepository treasureRepository, TreasureRepositorySpp treasureRepositorySpp, UserRepositorySpp userRepositorySpp) {
        this.treasureRepository = treasureRepository;
        this.treasureRepositorySpp = treasureRepositorySpp;
        this.userRepositorySpp = userRepositorySpp;
    }

    @Override
    public Boolean registerTreasure() {
        BufferedReader br;
        String line;

        String path = "C:/Users/SSAFY/Downloads/보물위치(공공시설).csv";

        try {
            // csv 파일 읽어오기
            br = new BufferedReader(new InputStreamReader(new FileInputStream(path), "UTF-8"));
            while((line = br.readLine()) != null) {
                String[] temp = line.split(","); // 쉼표로 구분

                Double treasureLocLat = Double.valueOf(temp[2]);
                Double treasureLocLng = Double.valueOf(temp[3]);

                // 위도 경도 중복된 곳 방지
                Treasure treasureIsPresent = treasureRepository.findByTreasureLocLatAndTreasureLocLng(treasureLocLat, treasureLocLng);
                if (treasureIsPresent == null) {
                    // 중복된 곳 아니면 저장 
                    Treasure treasure = Treasure.builder()
                            .treasureLocName(temp[0])
                            .treasureLocAddress(temp[1])
                            .treasureLocLng(treasureLocLat)
                            .treasureLocLat(treasureLocLng)
                            .build();
                    treasureRepository.save(treasure);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<TreasureListBean> getTreasureList() {
        return treasureRepositorySpp.getTreasureList();
    }

    @Override
    public Boolean findTreasure(Long treasureSeq, Long userSeq) {
        // 보물 상자 지우기
        try {
            treasureRepository.deleteById(treasureSeq);
        } catch (EmptyResultDataAccessException e) {    // 해당 보물상자 없는 경우
            log.error("findTreasure - 해당 보물상자가 존재하지 않습니다.");
            return false;
        }

        // 상자 +1 해주기
        if (userRepositorySpp.modifyBoxRemain(userSeq, 1) == 0) {
            log.error("findTreasure - 남은 기억함 개수 추가에 실패하였습니다.");
            return null;
        }
        return true;
    }
}
