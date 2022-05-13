package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.request.UserLoginPostReq;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public interface UserService {
    String userLogin(UserLoginPostReq userLoginPostReq, HttpServletResponse response);
    String reissueToken(HttpServletRequest request, HttpServletResponse response);
    Boolean userLogout(HttpServletRequest request, Long userSeq);
    Boolean deleteToken(HttpServletRequest request);
}
