package kr.guards.memorybox.domain.box.db.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BoxUserDetailList {
    private Long boxSeq;
    private Long userSeq;
    private String userProfileImage;
}
