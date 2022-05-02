package kr.guards.memorybox.domain.box.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.request.AllMemoriesPostReq;
import kr.guards.memorybox.domain.box.service.MemoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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
    @GetMapping("/{boxId}")
    public ResponseEntity<String> boxCreateUserFrame(@Parameter(description = "기억함 번호", required = true) @PathVariable String boxId, @ApiIgnore Principal principal) {
        log.info("boxCreateUserFrame - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.boxCreateUserFrame(boxId, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Tag(name = "기억")
    @Operation(summary = "기억들 저장(유저)", description = "기억함에 사용자의 기억들을 저장")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "사용자 기억들 저장 완료"),
            @ApiResponse(responseCode = "404", description = "사용자 기억들 저장 중 오류 발생"),
    })
    @PostMapping("/{boxId}")
    public ResponseEntity<String> saveAllMemories(@Parameter(description = "기억함 번호") @PathVariable String boxId,
                                                @RequestBody AllMemoriesPostReq allMemoriesPostReq, @ApiIgnore Principal principal) {
        log.info("allMemorySave - Call");
        Long userSeq = Long.valueOf(principal.getName());

        if (memoryService.saveAllMemories(allMemoriesPostReq, boxId, userSeq)) {
            return ResponseEntity.status(201).build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
