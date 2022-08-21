package kr.guards.memorybox.domain.box.controller;

import kr.guards.memorybox.domain.box.service.BoxService;
import kr.guards.memorybox.domain.box.service.BoxServiceImpl;
import kr.guards.memorybox.utils.MockAuthentication;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.security.Principal;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ExtendWith(MockitoExtension.class)
public class BoxControllerTest {
    MockMvc mockMvc;

    // @InjectMocks와 @Mock이 먹히지 않아서 Mock을 직접 주입해서 사용하니 되더라... 왜냐구 ㅠㅠㅠ
    BoxService boxService = mock(BoxServiceImpl.class);
    BoxController boxController = new BoxController(boxService);
    MockAuthentication authentication = new MockAuthentication();


    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(boxController).build();
    }

    @Nested
    @DisplayName("기억함 열기")
    public class unLockBox {
        @Test
        @DisplayName("상태로 변경 성공하여 200 리턴")
        public void unLockBoxSuccess() throws Exception {
            when(boxService.unlockBox("123123", 1L)).thenReturn(true);

            mockMvc.perform(put("/api/box/unlock/{boxId}", "123123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .principal((Principal) authentication.getPrincipal()))
                    .andDo(print())
                    .andExpect(MockMvcResultMatchers.status().isOk());
        }

        @Test
        @DisplayName("상태로 변경 중 오류 발생하여 404 리턴")
        public void unLockBoxFailed() throws Exception {
            when(boxService.unlockBox("123123", 1L)).thenReturn(false);

            mockMvc.perform(put("/api/box/unlock/{boxId}", "123123")
                            .contentType(MediaType.APPLICATION_JSON)
                            .principal((Principal) authentication.getPrincipal()))
                    .andDo(print())
                    .andExpect(MockMvcResultMatchers.status().isNotFound());
        }
    }
}
