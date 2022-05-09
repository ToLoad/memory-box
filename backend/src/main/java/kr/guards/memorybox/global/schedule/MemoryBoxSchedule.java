package kr.guards.memorybox.global.schedule;

import kr.guards.memorybox.domain.box.db.bean.OpenNotificationUserBean;
import kr.guards.memorybox.domain.box.db.bean.OpenNotificationVO;
import kr.guards.memorybox.domain.box.service.BoxService;
import kr.guards.memorybox.global.mattermost.MatterMostSender;
import kr.guards.memorybox.global.util.SendMailUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@Slf4j
public class MemoryBoxSchedule {
    private final BoxService boxService;
    private final SendMailUtil sendMailUtil;
    private final MatterMostSender matterMostSender;

    @Autowired
    public MemoryBoxSchedule(BoxService boxService, SendMailUtil sendMailUtil, MatterMostSender matterMostSender) {
        this.boxService = boxService;
        this.sendMailUtil = sendMailUtil;
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

    // 아침 9시마다 기억함 열기 예정 시간이 24시간 미만인 사람들에게 메일 발송
    @Scheduled(cron = "0 0 9 * * *")
    public void boxOpenNotification() {
        try {
            List<OpenNotificationVO> openNotificationList = boxService.getOpenBoxInfo();
            for (OpenNotificationVO openNotificationVO : openNotificationList) {
                LocalDateTime createdAt = openNotificationVO.getBoxCreatedAt();
                String date = createdAt.format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일")) + "에 담은 기억함이 곧 열려요";
                for (OpenNotificationUserBean user : openNotificationVO.getUser()) {
                    sendMailUtil.sendOpenNotificationEmail(user.getUserNickname(), date, openNotificationVO.getBoxName(), openNotificationVO.getBoxDescription(), user.getUserNickname());
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
