package kr.guards.memorybox.global.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
@Slf4j
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(request, response);
        } catch (NullPointerException e) {
            if (e.getMessage().charAt(0) == '만') {
                log.error("JwtExceptionFilter - 만료된 토큰입니다.");
                setErrorResponse(HttpStatus.UNAUTHORIZED, response, "만료된 토큰입니다.");
            } else {
                log.error("JwtExceptionFilter - 존재하지 않는 유저입니다.");
                setErrorResponse(HttpStatus.BAD_REQUEST, response, "존재하지 않는 유저입니다.");
            }

        } catch (SignatureException ex) {
            log.error("JwtExceptionFilter - 유효하지 않은 JWT 서명입니다.");
            setErrorResponse(HttpStatus.BAD_REQUEST, response, "유효하지 않은 JWT 서명입니다.");
        } catch (MalformedJwtException ex) {
            log.error("JwtExceptionFilter - 올바르지 않은 JWT 토큰입니다.");
            setErrorResponse(HttpStatus.BAD_REQUEST, response, "올바르지 않은 JWT 토큰입니다.");
        } catch (UnsupportedJwtException ex) {
            log.error("JwtExceptionFilter - 지원하지 않는 형식의 JWT 토큰입니다.");
            setErrorResponse(HttpStatus.BAD_REQUEST, response, "지원하지 않는 형식의 JWT 토큰입니다.");
        } catch (IllegalArgumentException ex) {
            log.error("JwtExceptionFilter - 정보가 담겨있지 않은 빈 토큰입니다.");
            setErrorResponse(HttpStatus.BAD_REQUEST, response, "정보가 담겨있지 않은 빈 토큰입니다.");
        } catch (SecurityException ex) {
            log.error("JwtExceptionFilter - 사용할 수 없는 토큰입니다.");
            setErrorResponse(HttpStatus.FORBIDDEN, response, "사용할 수 없는 토큰입니다.");
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse response, String message) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");

        BaseResponseBody res = new BaseResponseBody(status.value(), message);

        PrintWriter out = response.getWriter();
        String jsonResponse = objectMapper.writeValueAsString(res);
        out.print(jsonResponse);
    }
}
