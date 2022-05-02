package kr.guards.memorybox.global.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

/**
 * jwt 토큰 유틸 정의.
 */
@Slf4j
@Component
public class JwtTokenUtil {
    private final Key key;

    private static Integer accessTokenExpiration;
    private static Integer refreshTokenExpiration;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    @Autowired
    public JwtTokenUtil(@Value("${spring.security.jwt.secret}") String secretKey,
                        @Value("${spring.security.jwt.access-token-expiration}") Integer accessTokenExpiration,
                        @Value("${spring.security.jwt.refresh-token-expiration}") Integer refreshTokenExpiration) {

        // secretKey 바이트로 변환하여 Base64로 인코딩
        String encodingSecretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        log.info(encodingSecretKey);
        // Base64 byte[]로 변환
        byte[] decodedByte = Base64.getDecoder().decode(encodingSecretKey.getBytes(StandardCharsets.UTF_8));
        log.info(String.valueOf(decodedByte));
        // byte[]로 key 생성
        this.key = Keys.hmacShaKeyFor(decodedByte);
        log.info(String.valueOf(this.key));

        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    // Access Token 생성
    public String createAccessToken(long userSeq) {
        Date expires = JwtTokenUtil.getTokenExpiration(accessTokenExpiration);
        return Jwts.builder()
                .setSubject("Access Token")
                .claim("userSeq", userSeq)  // userSeq 저장
                .setExpiration(expires) // 만료시간
                .setIssuer("Memory Box")    // 발행자
                .signWith(key, SignatureAlgorithm.HS512)    // 암호화
                .compact();
    }

    // Refresh Token 생성
    public String createRefreshToken() {
        Date expires = JwtTokenUtil.getTokenExpiration(refreshTokenExpiration);
        return Jwts.builder()
                .setSubject("Refresh Token")
                .setExpiration(expires) // 만료시간
                .setIssuer("Memory Box")    // 발행자
                .signWith(key, SignatureAlgorithm.HS512)    // 암호화
                .compact();
    }

    // 토큰에 담긴 payload 값 가져오기
    public Claims extractAllClaims(String token) throws ExpiredJwtException {
        String tokenDelPrefix = token.replace(TOKEN_PREFIX, "");
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(tokenDelPrefix)
                .getBody();
    }

    // 토큰에서 userSeq 가져오기
    public Long getUserSeq(String token) {
        return extractAllClaims(token).get("userSeq", Long.class);
    }

    // 토큰 만료 날짜 가져오기
    public static Date getTokenExpiration(Integer expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    // 토큰 만료 시간 가져오기
    public Long getTokenExpirationAsLong(String token) {
        // 남은 유효시간
        Date expiration = extractAllClaims(token).getExpiration();
        // 현재 시간
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    // 토큰 만료 됐는지 안됐는지 확인
    public Boolean isTokenExpired(String token) {
        final Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    // 토큰 유효성 검사 (security에서 사용)
    public Boolean validateToken(String token) {
        String tokenDelPrefix = token.replace(TOKEN_PREFIX, "");

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(tokenDelPrefix);
            return true;
        } catch (SignatureException ex) {
            log.error("validateToken - 유효하지 않은 JWT 서명입니다.");
            throw new SignatureException("유효하지 않은 JWT 서명입니다.");
        } catch (MalformedJwtException ex) {
            log.error("validateToken - 올바르지 않은 JWT 토큰입니다.");
            throw new MalformedJwtException("올바르지 않은 JWT 토큰입니다.");
        } catch (ExpiredJwtException ex) {
            log.error("validateToken - 만료된 JWT 토큰입니다.");
            throw new NullPointerException("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException ex) {
            log.error("validateToken - 지원하지 않는 형식의 JWT 토큰입니다.");
            throw new UnsupportedJwtException("지원하지 않는 형식의 JWT 토큰입니다.");
        } catch (IllegalArgumentException ex) {
            log.error("validateToken - 정보가 담겨있지 않은 빈 토큰입니다.");
            throw new IllegalArgumentException("정보가 담겨있지 않은 빈 토큰입니다.");
        }
    }
}
