package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.request.BoxUserTextPostReq;
import kr.guards.memorybox.domain.box.service.MemoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import springfox.documentation.annotations.ApiIgnore;

import java.security.Principal;

@Slf4j
@Controller
@Tag(name = "기억", description = "기억함에 넣는 기억 관련 API")
@RequestMapping("/api/memory")
public class MemoryController {
    private final MemoryService memoryService;

    public MemoryController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }

    @Tag(name = "기억")
    @Operation(summary = "기억틀 생성(유저)", description = "기억함에 새 사용자의 기억을 담을 틀 추가")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "사용자 기억틀 생성 완료"),
            @ApiResponse(responseCode = "404", description = "사용자 기억틀 생성 중 오류 발생"),
    })
    @GetMapping("/{boxSeq}")
    public ResponseEntity<String> boxCreateUserFrame(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxCreateUserFrame - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.boxCreateUserFrame(boxSeq, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "글로된 기억 저장(유저)", description = "기억틀에 글로된 기억 담기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "글로된 기억 저장 완료"),
            @ApiResponse(responseCode = "404", description = "글로된 기억 저장 중 오류 발생"),
    })
    @PostMapping("/text/{boxSeq}")
    public ResponseEntity<String> boxSaveUserText(@RequestBody BoxUserTextPostReq boxUserTextPostReq, @Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxSaveUserText - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.boxSaveUserText(boxUserTextPostReq.getText(), boxSeq, userSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "사진 기억 저장(유저)", description = "기억틀에 사진으로된 기억 담기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "사진으로된 기억 저장 완료"),
            @ApiResponse(responseCode = "404", description = "사진으로된 기억 저장 중 오류"),
    })
    @PostMapping("/image/{boxSeq}")
    public ResponseEntity<String> boxSaveUserImage(MultipartHttpServletRequest request, @Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxSaveUserImage - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.boxSaveUserImage(request, boxSeq, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "기억틀 준비 완료(유저)", description = "기억틀에 준비된 기억을 담고 준비 완료 상태로 변경")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억틀 준비 완료 상태로 변경"),
            @ApiResponse(responseCode = "404", description = "기억틀 준비 완료 상태로 변경 중 오류"),
    })
    @PostMapping("/lock-ready/{boxSeq}")
    public ResponseEntity<String> boxChangeLockReady(@Parameter(description = "기억함 번호", required = true) @PathVariable Long boxSeq, @ApiIgnore Principal principal) {
        log.info("boxChangeLockReady - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.boxChangeLockReady(boxSeq, userSeq)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
