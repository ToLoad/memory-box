package kr.guards.memorybox.global.schedule;

import kr.guards.memorybox.domain.box.service.BoxService;
import kr.guards.memorybox.global.mattermost.MatterMostSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MemoryBoxSchedule {
    private final BoxService boxService;
    private final MatterMostSender matterMostSender;

    @Autowired
    public MemoryBoxSchedule(BoxService boxService, MatterMostSender matterMostSender) {
        this.boxService = boxService;
        this.matterMostSender = matterMostSender;
    }

    // 생성한지 24시간 동안 묻지 않은 함 제거
    @Scheduled(cron = "0 0 4 * * *")
    public void removePrepareBox() {
        matterMostSender.sendMessage("생성한지 24시간 동안 묻지 않은 함을 제거 시작");
        if (boxService.removePrepareBox()) {
            matterMostSender.sendMessage("생성한지 24시간 동안 묻지 않은 함을 제거하였습니다.");
        } else {
            matterMostSender.sendMessage("생성한지 24시간 동안 묻지 않은 함을 제거 중 오류가 발생하였습니다.");
        }
    }
}
