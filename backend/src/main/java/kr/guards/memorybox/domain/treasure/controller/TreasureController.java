package kr.guards.memorybox.domain.treasure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.treasure.db.bean.TreasureListBean;
import kr.guards.memorybox.domain.treasure.service.TreasureService;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@Tag(name="보물찾기", description="보물찾기 관련 API")
@RequestMapping("/api/treasure")
public class TreasureController {

    @Autowired
    private TreasureService treasureService;

    @PostMapping("/register")
    @Tag(name="보물찾기")
    @Operation(summary = "보물 장소 추가", description = "공공 행정기관에 보물을 추가합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패")
    })
    public ResponseEntity<BaseResponseBody> registerTreasure() {
        log.info("registerTreasure - 호출");

        try {
            treasureService.registerTreasure();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping
    @Tag(name="보물찾기")
    @Operation(summary = "보물 리스트 가져오기", description = "전체 보물 정보들을 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "400", description = "조회 실패")
    })
    public ResponseEntity<List<TreasureListBean>> getTreasureList() {
        log.info("getTreasureList - 호출");

        List<TreasureListBean> treasureList = treasureService.getTreasureList();

        return ResponseEntity.status(200).body(treasureList);
    }
}
