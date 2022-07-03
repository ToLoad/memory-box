package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.request.UserLoginPostReq;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public interface UserService {
    List<String> userLogin(UserLoginPostReq userLoginPostReq);
    List<String> reissueToken(String originAccessToken, String originRefreshToken);
    Boolean userLogout(HttpServletRequest request, Long userSeq);
    Boolean deleteToken(HttpServletRequest request);
}
