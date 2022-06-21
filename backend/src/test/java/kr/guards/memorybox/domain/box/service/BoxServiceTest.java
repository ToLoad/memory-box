package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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

    @Test
    @DisplayName("Box Create Success")
    void createBoxSuccess() {
        BoxCreatePostReq boxCreatePostReq = new BoxCreatePostReq("테스트 기억함", "테스트 기억함 입니다", LocalDateTime.now().plusDays(1), false, null, 0, 0, null);

        Box box = Box.builder()
                .boxId("tESt1234")
                .boxName(boxCreatePostReq.getBoxName())
                .boxDescription(boxCreatePostReq.getBoxDescription())
                .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                .userSeq(1L)
                .build();

        when(boxRepository.save(any(Box.class))).thenReturn(box);

        // when
        String result = boxService.boxCreate(boxCreatePostReq, 1L);

        // then
        assertThat(result).isNotNull();

        // verify
        verify(boxRepository, times(1)).save(any(Box.class));
    }

    @Test
    @DisplayName("Box Create Fail")
    void createBoxFail() {
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
