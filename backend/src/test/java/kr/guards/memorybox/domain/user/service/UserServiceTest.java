package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.request.UserLoginPostReq;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.http.HttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    UserRepository userRepository;

    @Test
    @DisplayName("User Login Success")
    void userLoginSuccess(HttpServletResponse response){
        UserLoginPostReq userLoginPostReq = new UserLoginPostReq("asl12341234", "dev");

        User user = User.builder()
                .userKakaoId(2209239229L)
                .userNickname("지슬(Jiseul)")
                .userEmail("wltmfdl123@nate.com")
                .userBoxRemain(4)
                .build();

        when(userRepository.save(any(User.class))).thenReturn(user);

        String result = userService.userLogin(userLoginPostReq, response);

        assertThat(result).isNotNull();

        verify(userRepository, times(1)).save(any(User.class));
    }
}
