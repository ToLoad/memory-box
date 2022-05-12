package kr.guards.memorybox.global.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.service.UserService;
import kr.guards.memorybox.global.model.response.BaseResponseBody;
import kr.guards.memorybox.global.util.CookieUtil;
import kr.guards.memorybox.global.util.JwtTokenUtil;
import kr.guards.memorybox.global.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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
import java.io.PrintWriter;
import java.util.Optional;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

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
        String accessToken = request.getHeader(jwtTokenUtil.HEADER_STRING);

        // < Access Token 유효할 경우 >
        if (accessToken != null) {
            // 1. Access Token이 이미 재발급 되어서 redis에 블랙리스트로 들어가있는지 확인
            String inBlackList = redisUtil.getData(accessToken.replace(jwtTokenUtil.TOKEN_PREFIX, ""));
            if (inBlackList != null && inBlackList.equals("B")) {
                throw new SecurityException("사용할 수 없는 토큰입니다.");
            }
            try {
                log.error("ACCESS-TOKEN" + accessToken);
                // 2. Access Token에서 사용자 정보 추출
                Long userSeq = jwtTokenUtil.getUserSeq(accessToken);
                log.error("USERSEQ" + userSeq);
                if (userSeq == null) {throw new IllegalArgumentException("정보가 담겨있지 않은 빈 토큰입니다.");}

                // 3. Access Token 토큰에 포함된 유저 정보를 통해 실제 DB에 해당 정보의 계정이 있는지 조회
                Optional<User> isUserPresent = userRepository.findById(userSeq);
                if (isUserPresent.isPresent()) {
                    User user = isUserPresent.get();

                    // 4. 토큰 유효성 검증
                    if (jwtTokenUtil.validateToken(accessToken)) {
                        // 4-1. 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성
                        UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userSeq,
                                userSeq + adminKey, AuthorityUtils.createAuthorityList(user.getUserRole()));

                        // 4-2. jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정
                        SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);

                        log.info("Security Filter - 로그인 한 유저 닉네임 : "+ user.getUserNickname());
                    }
                } else {    // DB에 해당 유저 없는 경우
                    throw new NullPointerException("존재하지 않는 유저입니다.");
                }
            } catch (SignatureException ex) {
                throw new SignatureException("유효하지 않은 JWT 서명입니다.");
            } catch (MalformedJwtException ex) {
                throw new MalformedJwtException("올바르지 않은 JWT 토큰입니다.");
            } catch (ExpiredJwtException ex) {
                throw new NullPointerException("만료된 JWT 토큰입니다.");
            } catch (UnsupportedJwtException ex) {
                throw new UnsupportedJwtException("지원하지 않는 형식의 JWT 토큰입니다.");
            } catch (IllegalArgumentException ex) {
                throw new IllegalArgumentException("정보가 담겨있지 않은 빈 토큰입니다.");
            } catch (Exception ex) {
                log.error("올바르지 않은 JWT 토큰입니다. - Exception");
            }
        }
        filterChain.doFilter(request, response);
    }
}

