package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;
import kr.guards.memorybox.domain.box.response.AllMemoriesGetRes;
import kr.guards.memorybox.domain.box.response.BoxListGetRes;
import kr.guards.memorybox.domain.box.response.OpenBoxReadyListGetRes;
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
    public ResponseEntity<String> boxCreate(@RequestBody BoxCreatePostReq boxCreatePostReq, @ApiIgnore Principal principal) {
        log.info("boxCreate - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxCreate(boxCreatePostReq, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 상세(유저)", description = "기억함 상세 정보 확인(기억함에 포함된 유저만 조회가능)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 조회 완료"),
            @ApiResponse(responseCode = "401", description = "기억함에 포함되지 않는 유저가 조회 요청"),
            @ApiResponse(responseCode = "404", description = "기억함 조회 중 오류 발생")
    })
    @GetMapping("/{boxSeq}")
    public ResponseEntity<BoxDetailBean> boxInfo(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxInfo - Call");
        Long userSeq = Long.valueOf(principal.getName());

        BoxDetailBean boxDetailBean;
        if (boxService.checkUserInBox(boxSeq, userSeq)) {
            boxDetailBean = boxService.getBoxDetailByBoxSeq(boxSeq);
            if (boxDetailBean != null) return ResponseEntity.status(200).body(boxDetailBean);
            else ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(401).build();
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 수정(유저)", description = "기억함 내용을 수정(기억함 생성자만 수정 가능)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 수정 성공"),
            @ApiResponse(responseCode = "404", description = "기억함 수정 중 오류 발생"),
    })
    @PutMapping("/{boxSeq}")
    public ResponseEntity<String> boxModify(@RequestBody BoxModifyPutReq boxModifyPutReq, @Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxModify - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxModify(boxModifyPutReq, boxSeq, userSeq)) {
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
    @DeleteMapping("/{boxSeq}")
    public ResponseEntity<String> boxRemove(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxRemove - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.boxRemove(boxSeq, userSeq)) {
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "전체 기억함 조회(유저)", description = "사용자가 포함된(개인 혹은 그룹) 전체 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "전체 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "전체 기억함 존재하지 않음")
    })
    @GetMapping("/all")
    public ResponseEntity<List<BoxDetailVO>> allBoxListDetail (@ApiIgnore Principal principal) {
        log.info("allBoxListDetail - Call");
        Long userSeq = Long.valueOf(principal.getName());

        List<BoxDetailVO> boxDetailVOList = boxService.boxAllDetailList(userSeq);

        if (boxDetailVOList != null && !boxDetailVOList.isEmpty()) {
            return ResponseEntity.status(200).body(boxDetailVOList);
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "열린 기억함 조회(유저)", description = "사용자가 포함된(개인 혹은 그룹) 열린 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "열린 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "열린 기억함 존재하지 않음")
    })
    @GetMapping("/open")
    public ResponseEntity<List<BoxDetailVO>> openBoxListDetail(@ApiIgnore Principal principal) {
        log.info("openBoxListDetail - Call");
        Long userSeq = Long.valueOf(principal.getName());

        List<BoxDetailVO> boxDetailVOList = boxService.boxOpenDetailList(userSeq);

        if (boxDetailVOList != null && !boxDetailVOList.isEmpty()) {
            return ResponseEntity.status(200).body(boxDetailVOList);
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "닫힌 기억함 조회(유저)", description = "사용자가 포함된(개인 혹은 그룹) 닫힌 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닫힌 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "닫힌 기억함 존재하지 않음")
    })
    @GetMapping("/close")
    public ResponseEntity<List<BoxDetailVO>> closeBoxListDetail(@ApiIgnore Principal principal) {
        log.info("closeBoxListDetail - Call");
        Long userSeq = Long.valueOf(principal.getName());

        List<BoxDetailVO> boxDetailVOList = boxService.boxCloseDetailList(userSeq);

        if (boxDetailVOList != null && !boxDetailVOList.isEmpty()) {
            return ResponseEntity.status(200).body(boxDetailVOList);
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "준비중인 기억함 조회(유저)", description = "사용자가 포함된(개인 혹은 그룹) 준비중인 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닫힌 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "닫힌 기억함 존재하지 않음")
    })
    @GetMapping("/ready")
    public ResponseEntity<List<BoxDetailVO>> readyBoxListDetail(@ApiIgnore Principal principal) {
        log.info("readyBoxListDetail - Call");
        Long userSeq = Long.valueOf(principal.getName());

        List<BoxDetailVO> boxDetailVOList = boxService.boxReadyDetailList(userSeq);

        if (boxDetailVOList != null && !boxDetailVOList.isEmpty()) {
            return ResponseEntity.status(200).body(boxDetailVOList);
        } else {
            return ResponseEntity.status(204).build();
        }

    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 숨기기(유저)", description = "사용자는 본인이 속한 기억함을 숨길 수 있습니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "기억함 숨김 완료"),
            @ApiResponse(responseCode = "201", description = "기억함 숨길 수 없음."),
            @ApiResponse(responseCode = "404", description = "기억함 숨김 중 오류 발생")
    })
    @PutMapping("/hide/{boxSeq}")
    public ResponseEntity<? extends BaseResponseBody> boxHideModify(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq,
                                                                    @ApiIgnore Principal principal) {
        log.info("boxHideModify - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.openBoxHide(boxSeq, userSeq) == SUCCESS) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
        } else if (boxService.openBoxHide(boxSeq, userSeq) == NONE) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "None"));
        } else {
            log.error("boxHideModify - Error");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Error"));
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 열기 대기상태 조회(유저)", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 조회"),
            @ApiResponse(responseCode = "204", description = "대기 중인 사람이 존재하지 않음"),
            @ApiResponse(responseCode = "401", description = "기억함에 포함되지 않는 유저가 조회 요청"),
            @ApiResponse(responseCode = "404", description = "기억함 대기 상해 조회 시 오류 발생")
    })
    @GetMapping("/unlock-ready/{boxSeq}")
    public ResponseEntity<OpenBoxReadyListGetRes> openBoxReady(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("openBoxReadyList - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (boxService.checkUserInBox(boxSeq, userSeq)) {
            List<OpenBoxReadyBean> openBoxReadyList = boxService.openBoxReadyList(boxSeq);
            Integer openBoxReadyCount = boxService.openBoxReadyCount(boxSeq);

            if (openBoxReadyList != null && !openBoxReadyList.isEmpty()) {
                if (boxService.openBoxActivation(boxSeq)) {
                    return ResponseEntity.status(200).body(OpenBoxReadyListGetRes.of(200, "Success", openBoxReadyList, openBoxReadyCount, true));
                } else if (!boxService.openBoxActivation(boxSeq)) {
                    return ResponseEntity.status(200).body(OpenBoxReadyListGetRes.of(200, "Success", openBoxReadyList, openBoxReadyCount, false));
                }
            } else {
                return ResponseEntity.status(204).body(OpenBoxReadyListGetRes.of(204, "No one is waiting.", openBoxReadyList, openBoxReadyCount, false));
            }
        }return ResponseEntity.status(401).build();
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 열기 대기상태 변경(유저)", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 변경 완료"),
            @ApiResponse(responseCode = "403", description = "대기 상태 변경 중 오류 발생")
    })
    @PutMapping("/unlock-ready/{boxSeq}")
    public ResponseEntity<? extends BaseResponseBody> openBoxReadyModify(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("openBoxReadyModify - call");
        Long userSeq = Long.valueOf(principal.getName());

        if(boxService.openBoxReadyCheck(boxSeq, userSeq)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
        }else{
            log.error("openBoxReadyModify - Error");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Error"));
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "열린함의 기억 전체 조회(유저)", description = "기억함에 속한 모든 기억들을 조회합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "모든 기억 조회 성공"),
            @ApiResponse(responseCode = "404", description = "기억 조회 중 오류 발생"),
    })
    @GetMapping("/{boxSeq}/memory")
    public ResponseEntity<AllMemoriesGetRes> getAllMemories(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("getAllMemories - Call");
        Long userSeq = Long.valueOf(principal.getName());

        BoxDetailBean box = boxService.getBoxDetailByBoxSeq(boxSeq);
        if (box == null) return ResponseEntity.notFound().build();

        List<MemoriesVO> memories = boxService.getAllMemories(boxSeq, userSeq);

        // 조회 중 문제가 있거나 해당 기억함에 접근 권한이 없는 유저일 때
        if (memories == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok().body(AllMemoriesGetRes.of(box, memories));
    }
}