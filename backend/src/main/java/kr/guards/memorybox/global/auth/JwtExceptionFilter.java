package kr.guards.memorybox.global.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
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
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        try {
            chain.doFilter(request, response);
        } catch (NullPointerException ex) {
            setErrorResponse(HttpStatus.UNAUTHORIZED, response, "만료 또는 잘못된 토큰입니다.");
        } catch (BadCredentialsException ex) {
            setErrorResponse(HttpStatus.BAD_REQUEST, response, "토큰이 너무 깁니다.");
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
