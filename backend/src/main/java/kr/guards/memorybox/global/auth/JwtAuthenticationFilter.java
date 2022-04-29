package kr.guards.memorybox.global.auth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.service.UserService;
import kr.guards.memorybox.global.util.CookieUtil;
import kr.guards.memorybox.global.util.JwtTokenUtil;
import kr.guards.memorybox.global.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String HEADER_STRING = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

    @Value("${kakao.admin}")
    private String adminKey;

    @Value("{spring.cookie.refresh-token-name}")
    private String refreshTokenName;

    private final UserService userService;
    private final UserRepository userRepository;
    private final CookieUtil cookieUtil;
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisUtil redisUtil;

    @Autowired
    public JwtAuthenticationFilter(UserService userService, UserRepository userRepository, CookieUtil cookieUtil, JwtTokenUtil jwtTokenUtil, RedisUtil redisUtil) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.cookieUtil = cookieUtil;
        this.jwtTokenUtil = jwtTokenUtil;
        this.redisUtil = redisUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader(HEADER_STRING);

        if (accessToken != null) {
            try {   // Access Token 유효할 경우
                Long userSeq = jwtTokenUtil.getUserSeq(accessToken);
                if (userSeq == null) {throw new IllegalArgumentException("정보가 담겨있지 않은 빈 토큰입니다.");}

                // jwt 토큰에 포함된 유저 정보를 통해 실제 DB에 해당 정보의 계정이 있는지 조회.
                Optional<User> isUserPresent = userRepository.findById(userSeq);
                if (isUserPresent.isPresent()) {
                    User user = isUserPresent.get();
                    log.info("Security Filter - 로그인 한 유저 닉네임 : "+ user.getUserNickname());

                    if (jwtTokenUtil.validateToken(accessToken)) {   // 토큰 검증
                        // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                        UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userSeq,
                                userSeq + adminKey, AuthorityUtils.createAuthorityList(user.getUserRole()));

                        // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
                        SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
                    }
                } else {    // DB에 해당 유저 없는 경우
                    throw new NullPointerException("해당 유저가 존재하지 않습니다.");
                }
            } catch (SignatureException ex) {
                log.error("유효하지 않은 JWT 서명입니다.");
                throw new SignatureException("유효하지 않은 JWT 서명입니다.");
            } catch (MalformedJwtException ex) {
                log.error("올바르지 않은 JWT 토큰입니다.");
                throw new MalformedJwtException("올바르지 않은 JWT 토큰입니다.");
            } catch (ExpiredJwtException ex) {
                log.error("만료된 JWT 토큰입니다.");
                throw new NullPointerException("만료된 JWT 토큰입니다.");
            } catch (UnsupportedJwtException ex) {
                log.error("지원하지 않는 형식의 JWT 토큰입니다.");
                throw new UnsupportedJwtException("지원하지 않는 형식의 JWT 토큰입니다.");
            } catch (IllegalArgumentException ex) {
                log.error("정보가 담겨있지 않은 빈 토큰입니다.");
                throw new IllegalArgumentException("정보가 담겨있지 않은 빈 토큰입니다.");
            } catch (Exception ex) {
                log.error("올바르지 않은 JWT 토큰입니다.");
                throw new MalformedJwtException("올바르지 않은 JWT 토큰입니다.");
            }
        }
        filterChain.doFilter(request, response);
    }
}

