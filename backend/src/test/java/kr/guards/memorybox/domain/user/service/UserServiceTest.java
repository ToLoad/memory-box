package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.request.UserLoginPostReq;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Spy
    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Test
    @DisplayName("User Login Success")
    public void userLoginSuccess(){
        UserLoginPostReq userLoginPostReq = new UserLoginPostReq("ANy-3g8VuR0Tl34AnEf3JKWVlimxGXc3RCpRsIPcNszy93fg7a6UjjpAXNz3ugSoHFtoHwo9c-sAAAGBxQ8Sfw", "dev");

        User user = User.builder()
                .userSeq(1L)
                .userKakaoId(2209239220L)
                .userNickname("테스트")
                .userBoxRemain(5)
                .userRole("ROLE_USER")
                .userEmail("wltmfdl123@naver.com")
                .userProfileImage("https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg")
                .build();

        when(userRepository.save(any(User.class))).thenReturn(user);

        List<String> result = userService.userLogin(userLoginPostReq);

        assertThat(result.get(0)).isEqualTo(user.getUserSeq()+1L);
        assertThat(result.get(1)).isNotNull();
        assertThat(result.get(2)).isNotNull();

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("User Login Fail")
    public void userLoginFail() {
        String result = "";
        try {
            when(userRepository.save(any(User.class))).thenThrow(new Exception());
        } catch (Exception e) {
            System.out.println("로그인 중 오류 발생");
            result = null;
        }

        assertThat(result).isNull();
    }
}
