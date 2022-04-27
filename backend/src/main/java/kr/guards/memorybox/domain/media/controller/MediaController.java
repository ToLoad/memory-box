package kr.guards.memorybox.domain.media.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.media.service.MediaService;
import kr.guards.memorybox.domain.user.db.entity.UserProfileImg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@RestController
@Tag(name = "미디어", description = "미디어 출력 API")
@RequestMapping("/api/media")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @Value("${app.file.main.path}")
    private String filePath;

    @Tag(name = "미디어")
    @Operation(summary = "기억 이미지 불러오기", description = "서버에 저장된 이미지를 불러옵니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "기억 이미지 불러오기 성공"),
            @ApiResponse(responseCode = "404", description = "해당 이미지가 존재하지 않음"),
    })
    @GetMapping("/image/{fileSeq}")
    public ResponseEntity<Resource> image(@Parameter(description = "파일 번호", required = true) @PathVariable Long fileSeq) {
        BoxUserFile boxUserFile = mediaService.getUserFile(fileSeq);
        if(boxUserFile == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);   // fileSeq 존재하지 않는 경우

        Resource resource = new FileSystemResource(filePath + boxUserFile.getFileUrl());
        if(!resource.exists()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        HttpHeaders headers = new HttpHeaders();
        Path path = null;

        try {
            path = Paths.get(filePath + boxUserFile.getFileUrl());
            headers.add("Content-Type", Files.probeContentType(path));
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @Tag(name = "미디어")
    @Operation(summary = "유저 프로필 이미지 불러오기", description = "서버에 저장된 유저 프로필 이미지를 불러옵니다")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "유저 프로필 이미지 불러오기 성공"),
            @ApiResponse(responseCode = "404", description = "해당 프로필 이미지가 존재하지 않음"),
    })
    @GetMapping("/profile/{imgSeq}")
    public ResponseEntity<Resource> profile(@Parameter(description = "파일 번호", required = true) @PathVariable Long imgSeq) {
        UserProfileImg userProfileImg = mediaService.getUserProfileImg(imgSeq);
        if(userProfileImg == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);   // imgSeq 존재하지 않는 경우

        Resource resource = new FileSystemResource(filePath + userProfileImg.getImgUrl());
        if(!resource.exists()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        HttpHeaders headers = new HttpHeaders();
        Path path = null;

        try {
            path = Paths.get(filePath + userProfileImg.getImgUrl());
            System.out.println(path);
            headers.add("Content-Type", Files.probeContentType(path));
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
