package kr.guards.memorybox.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5); // 기본 동시작업이 가능한 쓰레드 수 (5개가 꽉차면 MaxPoolSize 만큼 추가로 생성됨)
        executor.setMaxPoolSize(10); // 쓰레드의 최대 개수
        executor.setQueueCapacity(30); // 대기큐
        executor.setThreadNamePrefix("MemoryBox-ASYNC-");
        executor.initialize();
        return executor;
    }
}
