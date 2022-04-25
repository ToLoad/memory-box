package kr.guards.memorybox.domain.user.controller;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@Controller
@Tag(name="회원관리", description="회원 관리 api")
//@RequestMapping("")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/api/user/login")
    @Operation(summary = "카카오톡 로그인")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public String userLogin(@RequestParam String code) {
        log.info("userLogin - 호출");

        String accessToken = userService.userLogin(code);
        log.info(accessToken);
        return accessToken;
    }

}

