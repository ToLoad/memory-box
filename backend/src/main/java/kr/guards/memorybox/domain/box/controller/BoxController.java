package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.response.BoxListGetRes;
import kr.guards.memorybox.domain.box.service.BoxService;
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
    @Operation(summary = "열린 기억함 조회", description = "사용자가 포함된(개인 혹은 그룹) 열린 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "열린 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "열린 기억함 존재하지 않음")
    })
    @GetMapping("/open/{userSeq}")
    public ResponseEntity<BoxListGetRes> openBoxListDetail (@PathVariable Long userSeq) {
        log.info("openBoxListDetail - Call");
        List<BoxDetailList> openBoxList = boxService.boxOpenListByUserSeq(userSeq);
        List<BoxUserDetailList> openBoxUserList = boxService.boxOpenUserListByUserSeq(userSeq);

        if(!openBoxList.isEmpty() && openBoxList != null) {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Success", openBoxList, openBoxUserList));
        }else {
            return ResponseEntity.status(204).body(BoxListGetRes.of(204, "Box doesn't exit.", null, null));
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "닫힌 기억함 조회", description = "사용자가 포함된(개인 혹은 그룹) 닫힌 기억함 정보입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "닫힌 기억함 조회"),
            @ApiResponse(responseCode = "204", description = "닫힌 기억함 존재하지 않음")
    })
    @GetMapping("/close/{userSeq}")
    public ResponseEntity<BoxListGetRes> closeBoxListDetail (@PathVariable Long userSeq) {
        log.info("closeBoxListDetail - Call");
        List<BoxDetailList> closeBoxList = boxService.boxCloseListByUserSeq(userSeq);
        List<BoxUserDetailList> closeBoxUserList = boxService.boxCloseUserListByUserSeq(userSeq);

        if(!closeBoxList.isEmpty() && closeBoxList != null) {
            return ResponseEntity.status(200).body(BoxListGetRes.of(200, "Success", closeBoxList, closeBoxUserList));
        }else {
            return ResponseEntity.status(204).body(BoxListGetRes.of(204, "Box doesn't exit.", null, null));
        }
    }
}
