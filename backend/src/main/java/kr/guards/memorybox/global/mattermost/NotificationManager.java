package kr.guards.memorybox.global.mattermost;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class NotificationManager {
    private final MatterMostSender mmSender;

    public NotificationManager(MatterMostSender mmSender) {
        this.mmSender = mmSender;
    }

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification To MatterMost");
        mmSender.sendMessage(e, uri, params);
    }
}
