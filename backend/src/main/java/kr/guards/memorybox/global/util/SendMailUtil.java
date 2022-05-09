package kr.guards.memorybox.global.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;

@Component
public class SendMailUtil {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Autowired
    public SendMailUtil(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void sendOpenNotificationEmail(String userName, String created, String title, String desc, String to) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setSubject("[기억:함(函)] " + userName + "님의 기억함 열림 안내");
        helper.setTo(to);

        Context context = new Context();
        context.setVariable("created", created);
        context.setVariable("title", title);
        context.setVariable("desc", desc);

        String html = templateEngine.process("open-notification.html", context);
        helper.setText(html, true);

        javaMailSender.send(message);
    }
}
