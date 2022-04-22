package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.user.db.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService{
    String userLogin(String authorizedCode);
}
