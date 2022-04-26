package kr.guards.memorybox.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.user.response.UserLoginRes;
import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import kr.guards.memorybox.domain.user.service.UserService;
import kr.guards.memorybox.global.auth.KakaoOAuth2;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;


@Slf4j
@RestController
@Tag(name="회원 관리", description="회원 관리 API")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    KakaoOAuth2 kakaoOAuth2;

    @PostMapping("/login")
    @Tag(name="회원 관리")
    @Operation(summary = "로그인", description = "카카오톡으로 로그인")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 인가 코드입니다.")
    })
    public ResponseEntity<UserLoginRes> userLogin(@RequestParam @Parameter(description = "인가 코드", required = true) String code) {
        log.info("userLogin - 호출");

        String accessToken = userService.userLogin(code);
        if (accessToken == null) {
            return ResponseEntity.status(400).build();
        }
        log.info(accessToken);
        return ResponseEntity.status(200).body(UserLoginRes.of(200, "Success", accessToken));
    }

    @PostMapping("/logout")
    @Tag(name="회원 관리")
    @Operation(summary = "로그아웃", description = "카카오톡 로그아웃")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 Access Token입니다.")
    })
    public ResponseEntity<BaseResponseBody> userLogout(HttpServletRequest request) {
        log.info("userLogout - 호출");

        Long userKakaoId = kakaoOAuth2.logout(request);
        if (userKakaoId == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/test")
    @Tag(name="회원 관리")
    @Operation(summary = "security 테스트용", description = "테스트용 곧 삭제할 예정")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = ""),
            @ApiResponse(responseCode = "400", description = "")
    })
    public ResponseEntity<UserLoginRes> test(Principal principal) {
        log.info("test - 호출");
        log.info(principal.getName());
        return null;
    }

    @GetMapping
    @Tag(name="회원 관리")
    @Operation(summary = "회원정보 조회", description = "유저의 회원 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "해당 유저 없음")
    })
    public ResponseEntity<UserMypageGetRes> getUserMypage(Principal principal) {
        log.info("getUserMypage - 호출");

        Long userSeq = Long.valueOf(principal.getName());
        UserMypageGetRes userMypageInfo = userService.getUserMypage(userSeq);
        if (userMypageInfo == null){
            log.error("getUserMypage - 존재하지 않는 userSeq입니다.");
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).body(UserMypageGetRes.of(200, "Success", userMypageInfo));
    }
}

