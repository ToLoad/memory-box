package kr.guards.memorybox.domain.treasure.service;

import kr.guards.memorybox.domain.treasure.db.bean.TreasureListBean;
import kr.guards.memorybox.domain.treasure.db.entity.Treasure;
import kr.guards.memorybox.domain.treasure.db.repository.TreasureRepository;
import kr.guards.memorybox.domain.treasure.db.repository.TreasureRepositorySpp;
import kr.guards.memorybox.domain.user.db.repository.UserRepositorySpp;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Service
@Slf4j
public class TreasureServiceImpl implements TreasureService {

    @Value("${public-data.service-key}")
    private String serviceKey;

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
    public Boolean registerTreasure() throws IOException, ParseException {
        StringBuilder result = new StringBuilder();
        String urlStr = "http://apis.data.go.kr/6260000/BusanTblPbaStusService/getTblPbaStusInfo" +
                "?serviceKey=" + serviceKey +
                "&numOfRows=1000" +
                "&resultType=json";

        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        String line;
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }

        conn.disconnect();

        if(saveJson(result.toString()) == false) {
            return false;
        };

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

    private Boolean saveJson(String data) {
        try {
            // JSON 객체 생성
            JSONObject jObj;
            // JSON 파싱 객체 생성
            JSONParser jsonParser = new JSONParser();
            // 파싱할 string을 JSON 객체로 parser를 통해 저장
            JSONObject jsonObj = (JSONObject) jsonParser.parse(data);

            // 데이터 분해 단계
            JSONObject parseResponse = (JSONObject) jsonObj.get("getTblPbaStusInfo");
            // item 안쪽의 데이터는 배열의 형태
            JSONArray items = (JSONArray) parseResponse.get("item");

            // treasuer entity에 매핑 후 저장
            for (int i = 0; i < items.size(); i++) {
                jObj = (JSONObject) items.get(i);

                Treasure treasure = Treasure.builder()
                        .treasureLocName(jObj.get("dept").toString())
                        .treasureLocLat(Double.valueOf(jObj.get("lat").toString()))
                        .treasureLocLng(Double.valueOf(jObj.get("lng").toString()))
                        .treasureLocAddress(jObj.get("addrRoad").toString())
                        .build();

                treasureRepository.save(treasure);
            }
        } catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

}
