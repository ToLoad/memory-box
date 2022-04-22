package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import kr.guards.memorybox.domain.box.request.BoxUserTextPostReq;
import kr.guards.memorybox.domain.box.service.MemoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@Tag(name = "기억함", description = "기억함 관련")
@RequestMapping("/api/box")
public class MemoryController {
    private final MemoryService memoryService;

    public MemoryController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }



    // =================================================
    @Tag(name = "기억")
    @Operation(summary = "기억틀 생성", description = "기억함에 새 사용자의 기억을 담을 틀 추가")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "사용자 기억틀 생성 완료"),
            @ApiResponse(responseCode = "404", description = "사용자 기억틀 생성 중 오류 발생"),
    })
    @GetMapping("/memory/{boxSeq}")
    public ResponseEntity<String> boxCreateUserFrame(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq) {
        log.info("boxCreateUserFrame - Call");
        Long userSeq = 1L; // JWT로 User 정보 받으면 대체
        if (memoryService.boxCreateUserFrame(boxSeq, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "글로된 기억 저장", description = "기억틀에 글로된 기억 담기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "글로된 기억 저장 완료"),
            @ApiResponse(responseCode = "404", description = "글로된 기억 저장 중 오류 발생"),
    })
    @PostMapping("/memory/text")
    public ResponseEntity<String> boxSaveUserText(@RequestBody BoxUserTextPostReq boxUserTextPostReq) {
        log.info("boxSaveUserText - Call");
        Long userSeq = 2L; // JWT로 User 정보 받으면 대체
        if (memoryService.boxSaveUserText(boxUserTextPostReq, userSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "사진 기억 저장", description = "기억틀에 사진으로된 기억 담기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "사진으로된 기억 저장 완료"),
            @ApiResponse(responseCode = "404", description = "사진으로된 기억 저장 중 오류"),
    })
    @PostMapping("/memory/image/{boxUserSeq}")
    public ResponseEntity<String> boxSaveUserImage(MultipartHttpServletRequest request, @Parameter(description = "기억틀 번호", required = true) @PathVariable Long boxUserSeq) {
        log.info("boxSaveUserImage - Call");

        if (memoryService.boxSaveUserImage(request, boxUserSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "기억틀 준비 완료", description = "기억틀에 준비된 기억을 담고 준비 완료 상태로 변경")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억틀 준비 완료 상태로 변경"),
            @ApiResponse(responseCode = "404", description = "기억틀 준비 완료 상태로 변경 중 오류"),
    })
    @PostMapping("/lock-ready/{boxUserSeq}")
    public ResponseEntity<String> boxChangeLockReady(@Parameter(description = "사용자 기억틀 번호", required = true) @PathVariable Long boxUserSeq) {
        log.info("boxChangeLockReady - Call");

        // Token의 유저 정보와 boxUserSeq에 담긴 유저 정보가 일치하는지 확인하는 과정 넣기

        if (memoryService.boxChangeLockReady(boxUserSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
