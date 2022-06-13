package kr.guards.memorybox.global.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisUtil {
//
//    @Autowired
//    private StringRedisTemplate stringRedisTemplate;
//
//    public String getData(String key){
//        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
//        return valueOperations.get(key);
//    }
//
//    public void setDataExpire(String key, String value, Integer duration){
//        ValueOperations<String,String> valueOperations = stringRedisTemplate.opsForValue();
//        Duration expireDuration = Duration.ofMillis(duration);
//        valueOperations.set(key, value, expireDuration);
//    }
//
//    public void deleteData(String key){
//        stringRedisTemplate.delete(key);
//    }

}
