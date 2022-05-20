package kr.guards.memorybox.domain.treasure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.treasure.db.bean.TreasureListBean;
import kr.guards.memorybox.domain.treasure.request.FindTreasureDelReq;
import kr.guards.memorybox.domain.treasure.service.TreasureService;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.security.Principal;
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
            @ApiResponse(responseCode = "200", description = "보물 추가 성공"),
            @ApiResponse(responseCode = "400", description = "보물 추가 실패")
    })
    public ResponseEntity<BaseResponseBody> registerTreasure() {
        log.info("registerTreasure - 호출");

        if (!treasureService.registerTreasure()) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "Fail"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping
    @Tag(name="보물찾기")
    @Operation(summary = "보물 리스트 가져오기", description = "전체 보물 정보들을 반환합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "보물 리스트 조회 성공")
    })
    public ResponseEntity<List<TreasureListBean>> getTreasureList() {
        log.info("getTreasureList - 호출");

        List<TreasureListBean> treasureList = treasureService.getTreasureList();

        return ResponseEntity.status(200).body(treasureList);
    }

    @PostMapping
    @Tag(name="보물찾기")
    @Operation(summary = "보물 찾았을 때", description = "찾은 보물을 DB에서 삭제하고 사용자가 가진 기억함 개수를 +1 합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "보물 찾기 성공"),
            @ApiResponse(responseCode = "400", description = "보물 찾기 실패")
    })
    public ResponseEntity<BaseResponseBody> findTreasure(@RequestBody FindTreasureDelReq findTreasureDelReq, @ApiIgnore Principal principal) {
        log.info("findTreasure - 호출");

        Boolean findTreasureResult = treasureService.findTreasure(findTreasureDelReq.getTreasureSeq(), Long.valueOf(principal.getName()));

        if (findTreasureResult == false){
           return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당 보물이 존재하지 않습니다."));
        } else if (findTreasureResult == null) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저의 남은 기억함 개수 추가에 실패하였습니다."));
        }
        return ResponseEntity.status(204).body(BaseResponseBody.of(204, "보물 찾기 성공"));
    }
}
