package kr.guards.memorybox.domain.box.controller;

import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.db.entity.Box;
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
    @Operation(summary = "기억함 상세", description = "기억함 상세 정보 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억함 조회 완료"),
            @ApiResponse(responseCode = "404", description = "기억함 조회 중 오류 발생"),
    })
    @GetMapping("/{boxSeq}")
    public ResponseEntity<BoxDetailBean> boxInfo(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq) {
        log.info("boxInfo - Call");

        BoxDetailBean boxDetailBean = boxService.getBoxDetailByBoxSeq(boxSeq);
        if (boxDetailBean != null) {
            return ResponseEntity.status(200).body(boxDetailBean);
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
            return ResponseEntity.status(204).body(BoxListGetRes.of(204, "Box doesn't exit.", openBoxList, openBoxUserList));
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
            return ResponseEntity.status(204).body(BoxListGetRes.of(204, "Box doesn't exit.", closeBoxList, closeBoxUserList));
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "준비중인 기억함 조회", description = "사용자가 포함된(개인 혹은 그룹) 준비중인 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닫힌 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "닫힌 기억함 존재하지 않음")
    })
    @GetMapping("/ready/{userSeq}")
    public ResponseEntity<BoxListGetRes> readyBoxListDeatil (@PathVariable @ApiParam("회원 번호") Long userSeq) {
        log.info("readyBoxListDeatil - Call");
        List<BoxDetailBean> readyBoxList = boxService.boxReadyList(userSeq);
        List<BoxUserDetailBean> readyBoxUserList = boxService.boxReadyUserList(userSeq);

        if(!readyBoxList.isEmpty() && readyBoxList != null) {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Success", readyBoxList, readyBoxUserList));
        }else {
            return ResponseEntity.status(204).body(BoxListGetRes.of(204, "Box doesn't exit.", readyBoxList, readyBoxUserList));
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 열기 대기상태 조회", description = "기억함을 열고자 할 때, 개인 혹은 그룹 대기 상태를 확인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "대기 상태 조회"),
            @ApiResponse(responseCode = "204", description = "대기 중인 사람이 존재하지 않음")
    })
    @GetMapping("/unlock-ready/{boxSeq}")
    public ResponseEntity<OpenBoxReadyListGetRes> openBoxReady(@PathVariable @ApiParam("기억함 번호") Long boxSeq) {
        log.info("openBoxReadyList - Call");
        List<OpenBoxReadyBean> openBoxReadyList = boxService.openBoxReadyList(boxSeq);

        if (!openBoxReadyList.isEmpty() && openBoxReadyList != null) {
            return ResponseEntity.status(200).body(OpenBoxReadyListGetRes.of(200, "Success", openBoxReadyList));
        }else {
            return ResponseEntity.status(204).body(OpenBoxReadyListGetRes.of(204, "No one is waiting.", openBoxReadyList));
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

    @Tag(name = "기억함")
    @Operation(summary = "열린함의 기억 전체 조회", description = "기억함에 속한 모든 기억들을 조회합니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "모든 기억 조회 성공"),
            @ApiResponse(responseCode = "404", description = "기억 조회 중 오류 발생"),
    })
    @GetMapping("/{boxSeq}/memory")
    public ResponseEntity<AllMemoriesGetRes> getAllMemories(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq) {
        log.info("getAllMemories - Call");
        Long userSeq = 1L; // JWT로 User 정보 받으면 대체

        BoxDetailBean box = boxService.getBoxDetailByBoxSeq(boxSeq);
        if (box == null) return ResponseEntity.notFound().build();

        List<MemoriesVO> memories = boxService.getAllMemories(boxSeq, userSeq);

        // 조회 중 문제가 있거나 해당 기억함에 접근 권한이 없는 유저일 때
        if (memories == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok().body(AllMemoriesGetRes.of(box, memories));
    }
}