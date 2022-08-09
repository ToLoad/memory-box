package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoxServiceTest {
    @InjectMocks
    BoxServiceImpl boxService;

    @Mock
    BoxRepository boxRepository;
    
    @Nested
    @DisplayName("기억함 생성")
    public class CreateBox {
        @Test
        @DisplayName("성공")
        void createBoxSuccess() {
        /*
        기억함 생성 시 제대로 BoxId를 return 하는지 체크
        또한 box 를 저장하는 호출이 한 번만 실행되었는지 확인함.
         */

            BoxCreatePostReq boxCreatePostReq = new BoxCreatePostReq("테스트 기억함", "테스트 기억함 입니다", LocalDateTime.now().plusDays(1), false, null, 0, 0, null);

            // when
            String result = boxService.boxCreate(boxCreatePostReq, 1L);
            System.out.println("생성된 기억함 번호 : " + result);

            // then
            assertThat(result).isNotNull();

            // verify
            verify(boxRepository, times(1)).save(any(Box.class));
        }

        @Test
        @DisplayName("실패")
        void createBoxFail() {
        /*
        기억함 생성 중에 오류가 발생했을 경우에 대한 테스트
         */

            String result = "";
            try {
                when(boxRepository.save(any(Box.class))).thenThrow(new Exception());
            } catch (Exception e) {
                System.out.println("기억함 저장 중 오류 발생");
                result = null;
            }
            // then
            assertThat(result).isNull();
        }
    }
}
