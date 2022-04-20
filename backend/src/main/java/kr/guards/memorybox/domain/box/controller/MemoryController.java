package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxLocationPostReq;
import kr.guards.memorybox.domain.box.service.MemoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@Tag(name = "기억함", description = "기억함 관련")
@RequestMapping("/api/box")
public class MemoryController {
    @Autowired
    MemoryService memoryService;

    @Tag(name = "기억함")
    @Operation(summary = "기억함 생성", description = "기억을 모을 기억함을 생성함")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "기억함 생성완료"),
            @ApiResponse(responseCode = "404", description = "기억함 생성 중 오류 발생"),
    })
    @PostMapping("/create")
    public ResponseEntity<String> boxCreate(@RequestBody BoxCreatePostReq boxCreatePostReq) {
        log.info("boxCreate - Call");
        if (memoryService.boxCreate(boxCreatePostReq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억함")
    @Operation(summary = "기억함 위치 저장", description = "기억함에 위치를 저장함")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "기억함 위치 저장 완료"),
            @ApiResponse(responseCode = "404", description = "기억함 위치 저장 중 오류 발생"),
    })
    @PostMapping("/location")
    public ResponseEntity<String> boxSaveLocation(@RequestBody BoxLocationPostReq boxLocationPostReq) {
        log.info("boxSaveLocation - Call");
        if (memoryService.boxSaveLocation(boxLocationPostReq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
