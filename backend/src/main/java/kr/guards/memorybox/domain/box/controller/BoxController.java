package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;
import kr.guards.memorybox.domain.box.response.*;
import kr.guards.memorybox.domain.box.service.BoxService;
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
@Tag(name = "기억함", description = "기억함 관련 API")
@RequestMapping("/api/box")
public class BoxController {
    private final BoxService boxService;

    @Autowired
    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    private final int SUCCESS = 1;
    private final int NONE = 0;
    private final int FAIL = -1;

    @Tag(name = "기억함")
    @Operation(summary = "기억함 생성(유저)", description = "기억을 모을 기억함을 생성함")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "기억함 생성 완료"),
            @ApiResponse(responseCode = "404", description = "기억함 생성 중 오류 발생"),
    })
    @PostMapping("/create")
    public ResponseEntity<BoxCreatePostRes> boxCreate(@RequestBody BoxCreatePostReq boxCreatePostReq, @ApiIgnore Principal principal) {
        log.info("boxCreate - Call");
        Long userSeq = Long.valueOf(principal.getName());

        String boxId = boxService.boxCreate(boxCreatePostReq, userSeq);
        if (boxId != null) {
            return ResponseEntity.status(201).body(BoxCreatePostRes.of(boxId));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 상세(모두)", description = "기억함 상세 정보 확인(기억함에 포함된 유저만 조회가능)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 조회 완료"),
            @ApiResponse(responseCode = "404", description = "기억함 조회 중 오류 발생")
    })
    @GetMapping("/detail/{boxId}")
    public ResponseEntity<MemoriesBoxDetailBean> boxInfo(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId) {
        log.info("boxInfo - Call");

        MemoriesBoxDetailBean boxDetail;
        boxDetail = boxService.getMemoriesBoxDetailByBoxId(boxId);
        if (boxDetail != null) return ResponseEntity.status(200).body(boxDetail);
        else return ResponseEntity.notFound().build();
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 수정(유저)", description = "기억함 내용을 수정(기억함 생성자만 수정 가능)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 수정 성공"),
            @ApiResponse(responseCode = "404", description = "기억함 수정 중 오류 발생"),
    })
    @PutMapping("/{boxId}")
    public ResponseEntity<String> boxModify(@RequestBody BoxModifyPutReq boxModifyPutReq, @Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("boxModify - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxModify(boxModifyPutReq, boxId, userSeq)) {
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 삭제(유저)", description = "기억함을 삭제함(기억함 생성자만 삭제 가능)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "기억함 삭제 중 오류 발생"),
    })
    @DeleteMapping("/{boxId}")
    public ResponseEntity<String> boxRemove(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("boxRemove - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxRemove(boxId, userSeq)) {
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 조회(유저)", description = "준비중, 대기중, 닫힘, 열림 기억함을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 조회")
    })
    @GetMapping("/list")
    public ResponseEntity<BoxListGetRes> boxListDetail(@ApiIgnore Principal principal) {
        log.info("boxListDetail - Call");
        Long userSeq = Long.valueOf(principal.getName());

        List<BoxDetail> boxList = boxService.boxDetailList(userSeq);

        return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Success", boxList));
    }

    @Tag(name = "기억함 숨김")
    @Operation(summary = "기억함 숨기기(유저)", description = "사용자는 본인이 속한 기억함을 숨길 수 있습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 숨김 완료"),
            @ApiResponse(responseCode = "404", description = "기억함 숨김 중 오류 발생")
    })
    @PutMapping("/hide/{boxId}")
    public ResponseEntity<String> boxHideModify(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId,
                                                                    @ApiIgnore Principal principal) {
        log.info("boxHideModify - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxHide(boxId, userSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함 숨김")
    @Operation(summary = "숨긴 기억함 조회(유저)", description = "본인이 숨긴 기억함 전체 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "숨긴 기억함 조회 성공"),
            @ApiResponse(responseCode = "204", description = "숨긴 기억함이 없습니다")
    })
    @GetMapping("/hide")
    public ResponseEntity<List<BoxDetailVO>> boxHideList(@ApiIgnore Principal principal) {
        log.info("boxHideList - Call");
        Long userSeq = Long.valueOf(principal.getName());

        List<BoxDetailVO> boxDetailVOList = boxService.getHideBoxList(userSeq);
        if (boxDetailVOList.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(boxDetailVOList);
        }
    }

    @Tag(name = "기억함 숨김")
    @Operation(summary = "기억함 숨기기 복구(유저)", description = "숨긴 기억함을 복구합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "숨긴 기억함 복구 완료"),
            @ApiResponse(responseCode = "404", description = "숨긴 기억함 복구 중 오류 발생")
    })
    @PutMapping("/show/{boxId}")
    public ResponseEntity<String> boxShowModify(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId,
                                                @ApiIgnore Principal principal) {
        log.info("boxShowModify - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxShow(boxId, userSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함 열기")
    @Operation(summary = "기억함 열기 대기상태 조회(유저)", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 조회"),
            @ApiResponse(responseCode = "204", description = "조회하려는 기억함이 오픈 예정 시간이 지나지 않음"),
            @ApiResponse(responseCode = "401", description = "기억함에 포함되지 않는 유저가 조회 요청"),
            @ApiResponse(responseCode = "404", description = "기억함 대기 상태 조회 시 오류 발생")
    })
    @GetMapping("/unlock-ready/{boxId}")
    public ResponseEntity<OpenBoxReadyListGetRes> openBoxReady(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("openBoxReady - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.checkUserInBox(boxId, userSeq) != 0) {
            List<OpenBoxReadyBean> openBoxReadyList = boxService.openBoxReadyList(boxId);
            MemoriesBoxDetailBean boxDetail = boxService.getMemoriesBoxDetailByBoxIdAfterOpenAt(boxId);
            Integer openBoxReadyCount = boxService.openBoxReadyCount(boxId);
            if (boxDetail == null) return ResponseEntity.noContent().build();

            if (openBoxReadyList != null && !openBoxReadyList.isEmpty()) {
                return ResponseEntity.status(200).body(OpenBoxReadyListGetRes.of(openBoxReadyList, openBoxReadyCount, boxService.openBoxActivation(boxId), boxDetail.getBoxLocLat(), boxDetail.getBoxLocLng(), userSeq));
            } else {
                return ResponseEntity.notFound().build();
            }
        }return ResponseEntity.status(401).build();
    }

    @Tag(name = "기억함 열기")
    @Operation(summary = "기억함 열기 대기상태 변경(유저)", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 변경 완료"),
            @ApiResponse(responseCode = "403", description = "대기 상태 변경 중 오류 발생")
    })
    @PutMapping("/unlock-ready/{boxId}")
    public ResponseEntity<? extends BaseResponseBody> openBoxReadyModify(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("openBoxReadyModify - call");
        Long userSeq = Long.valueOf(principal.getName());

        if(boxService.openBoxReadyCheck(boxId, userSeq)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
        }else{
            log.error("openBoxReadyModify - Error");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Error"));
        }
    }

    @Tag(name = "기억함 열기")
    @Operation(summary = "기억함 열기(유저)", description = "기억함을 열었다를 표시할 상태를 변경")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "열기 상태 변경 완료"),
            @ApiResponse(responseCode = "404", description = "열기 상태 변경 중 오류 발생")
    })
    @PutMapping("/unlock/{boxId}")
    public ResponseEntity<String> unlockBox(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("unlockBox - call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.unlockBox(boxId, userSeq)) {
            return ResponseEntity.ok().build();
        } else return ResponseEntity.notFound().build();
    }

    @Tag(name = "기억함 묻기")
    @Operation(summary = "기억함 묻기 대기상태 조회(유저)", description = "기억함을 묻고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 조회"),
            @ApiResponse(responseCode = "204", description = "이미 준비된 기억함에서 대기상태 조회"),
            @ApiResponse(responseCode = "401", description = "기억함에 포함되지 않는 유저가 조회 요청"),
    })
    @GetMapping("/lock-ready/{boxId}")
    public ResponseEntity<CloseBoxReadyListGetRes> closeBoxReady(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("closeBoxReady - Call");
        Long userSeq = Long.valueOf(principal.getName());

        int divide = boxService.checkUserInBox(boxId, userSeq);
        if (divide != 0) {
            List<CloseBoxReadyBean> closeBoxReadyList = boxService.closeBoxReadyList(boxId);
            Integer closeBoxReadyCount = boxService.closeBoxReadyCount(boxId);

            if (closeBoxReadyList != null && !closeBoxReadyList.isEmpty()) {
                return ResponseEntity.status(200).body(CloseBoxReadyListGetRes.of(closeBoxReadyList, closeBoxReadyCount, divide != 1, userSeq));
            } else {
                return ResponseEntity.noContent().build();
            }
        }return ResponseEntity.status(401).build();
    }

    @Tag(name = "기억함 묻기")
    @Operation(summary = "기억함에 추가한 유저 제거(유저)", description = "기억함에 추가한 유저 제거(기억함 준비 상태일 때)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함에 포함된 유저 제거 성공"),
            @ApiResponse(responseCode = "404", description = "기억함에 포함된 유저 제거시 오류 발생")
    })
    @DeleteMapping("/lock-ready/{boxUserSeq}")
    public ResponseEntity<String> removeBoxUserInBox(@Parameter(description = "기억틀 번호", required = true) @PathVariable Long boxUserSeq, @ApiIgnore Principal principal) {
        log.info("removeBoxUserInBox - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.removeBoxUserInBox(boxUserSeq, userSeq)) {
            return ResponseEntity.ok().build();
        } else return ResponseEntity.notFound().build();
    }

    @Tag(name = "기억함 묻기")
    @Operation(summary = "기억함 묻기(유저)", description = "기억함 주인이 묻었다를 표시할 상태를 변경")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "묻기 상태 변경 완료"),
            @ApiResponse(responseCode = "404", description = "묻기 상태 변경 중 오류 발생")
    })
    @PutMapping("/lock/{boxId}")
    public ResponseEntity<String> lockBox(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("lockBox - call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.lockBox(boxId, userSeq)) {
            return ResponseEntity.ok().build();
        } else return ResponseEntity.notFound().build();
    }

    @Tag(name = "기억함 열기")
    @Operation(summary = "열린함의 기억 전체 조회(유저)", description = "기억함에 속한 모든 기억들을 조회합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "모든 기억 조회 성공"),
            @ApiResponse(responseCode = "204", description = "조회하려는 기억함이 오픈 예정 시간이 지나지 않음"),
            @ApiResponse(responseCode = "404", description = "기억 조회 중 오류 발생"),
    })
    @GetMapping("/{boxId}/memory")
    public ResponseEntity<AllMemoriesGetRes> getAllMemories(@Parameter(description = "기억함 ID", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("getAllMemories - Call");
        Long userSeq = Long.valueOf(principal.getName());

        MemoriesBoxDetailBean boxDetail = boxService.getMemoriesBoxDetailByBoxIdAfterOpenAt(boxId);
        if (boxDetail == null) return ResponseEntity.noContent().build();

        List<MemoriesVO> memories = boxService.getAllMemories(boxId, userSeq);

        // 조회 중 문제가 있거나 해당 기억함에 접근 권한이 없는 유저일 때
        if (memories == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok().body(AllMemoriesGetRes.of(boxDetail, memories));
    }
}