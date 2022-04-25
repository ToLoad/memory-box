package kr.guards.memorybox.domain.box.controller;

import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailBean;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailBean;
import kr.guards.memorybox.domain.box.db.bean.OpenBoxReadyBean;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;
import kr.guards.memorybox.domain.box.response.BoxListGetRes;
import kr.guards.memorybox.domain.box.response.OpenBoxReadyListGetRes;
import kr.guards.memorybox.domain.box.service.BoxService;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Tag(name = "기억함", description = "기억함 관련 API")
@RequestMapping("/api/box")
public class BoxController {

    private final BoxService boxService;

    public BoxController(BoxService boxService) { this.boxService = boxService; }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 생성", description = "기억을 모을 기억함을 생성함")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "기억함 생성 완료"),
            @ApiResponse(responseCode = "404", description = "기억함 생성 중 오류 발생"),
    })
    @PostMapping("/create")
    public ResponseEntity<String> boxCreate(@RequestBody BoxCreatePostReq boxCreatePostReq) {
        log.info("boxCreate - Call");
        Long userSeq = 1L; // JWT로 User 정보 받으면 대체
        if (boxService.boxCreate(boxCreatePostReq, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 삭제", description = "기억함을 삭제함")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "기억함 삭제 중 오류 발생"),
    })
    @DeleteMapping("/{boxSeq}")
    public ResponseEntity<String> boxRemove(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq) {
        log.info("boxRemove - Call");
        Long userSeq = 1L; // JWT로 User 정보 받으면 대체
        if (boxService.boxRemove(boxSeq, userSeq)) {
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 수정", description = "기억함 내용을 수정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 수정 성공"),
            @ApiResponse(responseCode = "404", description = "기억함 수정 중 오류 발생"),
    })
    @PutMapping("/{boxSeq}")
    public ResponseEntity<String> boxModify(@RequestBody BoxModifyPutReq boxModifyPutReq, @Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq) {
        log.info("boxModify - Call");
        Long userSeq = 1L; // JWT로 User 정보 받으면 대체
        if (boxService.boxModify(boxModifyPutReq, boxSeq, userSeq)) {
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @Tag(name = "기억함")
    @Operation(summary = "열린 기억함 조회", description = "사용자가 포함된(개인 혹은 그룹) 열린 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "열린 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "열린 기억함 존재하지 않음")
    })
    @GetMapping("/open/{userSeq}")
    public ResponseEntity<BoxListGetRes> openBoxListDetail (@PathVariable @ApiParam("회원 번호") Long userSeq) {
        log.info("openBoxListDetail - Call");
        List<BoxDetailBean> openBoxList = boxService.boxOpenList(userSeq);
        List<BoxUserDetailBean> openBoxUserList = boxService.boxOpenUserList(userSeq);

        if(!openBoxList.isEmpty() && openBoxList != null) {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Success", openBoxList, openBoxUserList));
        }else {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Box doesn't exit.", openBoxList, openBoxUserList));
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "닫힌 기억함 조회", description = "사용자가 포함된(개인 혹은 그룹) 닫힌 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닫힌 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "닫힌 기억함 존재하지 않음")
    })
    @GetMapping("/close/{userSeq}")
    public ResponseEntity<BoxListGetRes> closeBoxListDetail (@PathVariable @ApiParam("회원 번호") Long userSeq) {
        log.info("closeBoxListDetail - Call");
        List<BoxDetailBean> closeBoxList = boxService.boxCloseList(userSeq);
        List<BoxUserDetailBean> closeBoxUserList = boxService.boxCloseUserList(userSeq);

        if(!closeBoxList.isEmpty() && closeBoxList != null) {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Success", closeBoxList, closeBoxUserList));
        }else {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Box doesn't exit.", closeBoxList, closeBoxUserList));
        }
    }


    @Tag(name = "기억함")
    @Operation(summary = "기억함 열기 대기상태 조회", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 조회"),
            @ApiResponse(responseCode = "200", description = "대기 중인 사람이 존재하지 않음")
    })
    @GetMapping("/unlock-ready/{boxSeq}")
    public ResponseEntity<OpenBoxReadyListGetRes> openBoxReady(@PathVariable @ApiParam("기억함 번호") Long boxSeq) {
        log.info("openBoxReadyList - Call");
        List<OpenBoxReadyBean> openBoxReadyList = boxService.openBoxReadyList(boxSeq);

        if (!openBoxReadyList.isEmpty() && openBoxReadyList != null) {
            return ResponseEntity.status(200).body(OpenBoxReadyListGetRes.of(200, "Success", openBoxReadyList));
        }else {
            return ResponseEntity.status(200).body(OpenBoxReadyListGetRes.of(200, "No one is waiting.", openBoxReadyList));
        }
    }


    @Tag(name = "기억함")
    @Operation(summary = "기억함 열기 대기상태 변경", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 변경 완료"),
            @ApiResponse(responseCode = "403", description = "대기 상태 변경 중 오류 발생")
    })
    @PutMapping("/unlock-ready/{boxSeq}/{userSeq}")
    public ResponseEntity<? extends BaseResponseBody> openBoxReadyModify(@PathVariable @ApiParam("기억함 번호") Long boxSeq, @PathVariable @ApiParam("회원 번호")Long userSeq) {
        log.info("openBoxReadyModify");

        if(boxService.openBoxReadyCheck(boxSeq, userSeq)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
        }else{
            log.error("openBoxReadyModify - Error");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Error"));
        }

    }
}
