//package kr.guards.memorybox.global.auth;
//
//import kr.guards.memorybox.domain.user.db.entity.User;
//import kr.guards.memorybox.domain.user.service.UserService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Component
//@Slf4j
//public class OAuth2TokenAuthenticationFilter extends OncePerRequestFilter {
//
//    private static final String HEADER_STRING = "Authorization";
//
//    private final String adminKey;
//    private final UserService userService;
//
//    @Autowired
//    public OAuth2TokenAuthenticationFilter(UserService userService,
//                                           @Value("${kakao.admin}") String adminKey) {
//        this.userService = userService;
//        this.adminKey = adminKey;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String token = request.getHeader(HEADER_STRING);
//        if (token != null) {
//            try {
//                User user = userService.getUserInfoByToken(token);
//                log.info("Security Filter - 로그인 한 유저 닉네임 : "+ user.getUserNickname());
//
//                Long userSeq = user.getUserSeq();
//                Long kakaoId = user.getUserKakaoId();
//
//                UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userSeq,
//                        kakaoId + adminKey, AuthorityUtils.createAuthorityList(user.getUserRole()));
//
//                SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
//            } catch (NullPointerException | HttpClientErrorException.Unauthorized e) {
//                log.error("doFilterInternal - 만료 또는 잘못된 토큰입니다.");
//                throw new NullPointerException("토큰 기간 만료");
//            } catch (HttpClientErrorException.BadRequest e) {
//                log.error("doFilterInternal - 토큰이 너무 깁니다.");
//                throw new BadCredentialsException("토큰이 너무 깁니다.");
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//}
//
