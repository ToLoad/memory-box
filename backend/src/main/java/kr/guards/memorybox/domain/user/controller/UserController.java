package kr.guards.memorybox.domain.user.controller;

import com.fasterxml.jackson.databind.ser.Serializers;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.user.request.ModifyUserProfileImgPutReq;
import kr.guards.memorybox.domain.user.response.UserLoginRes;
import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import kr.guards.memorybox.domain.user.service.MypageService;
import kr.guards.memorybox.domain.user.service.UserService;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;


@Slf4j
@RestController
@Tag(name="회원 관리", description="회원 관리 API")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final MypageService mypageService;

    @Autowired
    public UserController(UserService userService, MypageService mypageService) {
        this.userService = userService;
        this.mypageService = mypageService;
    }

    @PostMapping("/login")
    @Tag(name="회원 관리")
    @Operation(summary = "로그인", description = "카카오톡으로 로그인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 인가 코드입니다.")
    })
    public ResponseEntity<UserLoginRes> userLogin(@RequestBody String code, HttpServletRequest request, HttpServletResponse response) {
        log.info("userLogin - 호출");

        String accessToken = userService.userLogin(code,request, response);
        if (accessToken == null) {
            log.error("userLogin - 잘못된 인가코드");
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(UserLoginRes.of(200, "Success", accessToken));
    }

    @PostMapping("/refresh")
    @Tag(name="회원 관리")
    @Operation(summary = "토큰 재발급", description = "Refresh Token으로 Access Token을 재발급한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Access Token 재발급 성공"),
            @ApiResponse(responseCode = "400", description = "Refresh Token 없거나 존재하지 않는 사용자로 Refresh Token 재발급 실패"),
            @ApiResponse(responseCode = "401", description = "만료된 Refresh Token")
    })
    public ResponseEntity<UserLoginRes> reissueToken(HttpServletRequest request, HttpServletResponse response) {
        log.info("reissueToken - 호출");

        String accessToken = userService.reissueToken(request, response);
        if (accessToken == null) {
            log.error("reissueToken - Refresh Token이 없습니다.");
            return ResponseEntity.status(400).body(UserLoginRes.of(400, "Refresh Token이 없습니다.", null));
        } else if (accessToken.equals("DB")) {
            log.error("reissueToken - 존재하지 않는 사용자");
            return ResponseEntity.status(400).body(UserLoginRes.of(400, "존재하지 않는 사용자입니다.", null));
        } else if (accessToken.equals("EXP")) {
            log.error("reissueToken - 잘못되거나 만료된 Refresh Token");
            return ResponseEntity.status(401).body(UserLoginRes.of(401, "잘못되거나 만료된 Refresh Token입니다.", null));
        }
        return ResponseEntity.status(200).body(UserLoginRes.of(200, "Success", accessToken));
    }

    @PostMapping("/logout")
    @Tag(name="회원 관리")
    @Operation(summary = "로그아웃", description = "카카오톡 로그아웃")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "로그아웃 실패")
    })
    public ResponseEntity<BaseResponseBody> userLogout(@ApiIgnore Principal principal, HttpServletRequest request) {
        log.info("userLogout - 호출");

        Long userSeq = Long.valueOf(principal.getName());

        Boolean loginComplete = userService.userLogout(request, userSeq);
        if (loginComplete == false) {
            log.error("userLogout - 로그아웃 실패");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "로그아웃 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "로그아웃 성공"));
    }

    @GetMapping
    @Tag(name="회원 관리")
    @Operation(summary = "회원정보 조회", description = "유저의 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "해당 유저 없음")
    })
    public ResponseEntity<UserMypageGetRes> getUserMypage(@ApiIgnore Principal principal) {
        log.info("getUserMypage - 호출");

        Long userSeq = Long.valueOf(principal.getName());

        UserMypageGetRes userMypageInfo = mypageService.getUserMypage(userSeq);
        if (userMypageInfo == null){
            log.error("getUserMypage - 존재하지 않는 userSeq입니다.");
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(UserMypageGetRes.of(200, "Success", userMypageInfo));
    }

    @PutMapping
    @Tag(name="회원 관리")
    @Operation(summary = "유저 프로필 이미지 변경", description = "유저 프로필 이미지를 변경한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "프로필 이미지 변경 성공"),
            @ApiResponse(responseCode = "400", description = "프로필 이미지 변경 실패")
    })
    public ResponseEntity<BaseResponseBody> modifyUserProfileImg(@ApiIgnore Principal principal, @RequestBody ModifyUserProfileImgPutReq modifyUserProfileImgPutReq) {
        log.info("modifyUserProfileImg - 호출");

        Long userSeq = Long.valueOf(principal.getName());

        Boolean isComplete = mypageService.modifyUserProfileImg(userSeq, modifyUserProfileImgPutReq.getImgUrl());
        if (isComplete == false){
            log.error("modifyUserProfileImg - 프로필 변경 실패");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "프로필 변경에 실패했습니다."));
        }

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "프로필 이미지 변경 성공"));
    }

    @DeleteMapping
    @Tag(name="회원 관리")
    @Operation(summary = "회원탈퇴", description = "유저의 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "회원 탈퇴 성공"),
            @ApiResponse(responseCode = "400", description = "회원 탈퇴 실패(해당 회원 없음)")
    })
    public ResponseEntity<BaseResponseBody> deleteUser(@ApiIgnore Principal principal, HttpServletRequest request) {
        log.info("deleteUser - 호출");

        Long userSeq = Long.valueOf(principal.getName());

        Boolean isComplete = mypageService.deleteUser(userSeq, request);
        if (isComplete == false){
            log.error("deleteUser - 회원 탈퇴 실패");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "해당하는 회원이 DB에 없습니다."));
        }
        return ResponseEntity.status(204).body(BaseResponseBody.of(204, "회원 탈퇴 성공"));
    }
}

