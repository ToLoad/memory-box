package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

@Service
public interface MypageService {
    UserMypageGetRes getUserMypage(Long userSeq);
    Boolean modifyUserProfileImg(Long userSeq, String imgUrl);
    Boolean deleteUser(Long userSeq);
}
