package kr.guards.memorybox.global.auth;

import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Component
public class KakaoOAuth2 {

    private static final String HEADER_STRING = "Authorization";
    private final String clientId;

    @Autowired
    public KakaoOAuth2(@Value("${kakao.client-id}") String clientId) {
        this.clientId = clientId;
    }

    public String getAccessToken(String authorizedCode) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", "http://localhost:3000/kakao/callback");
        params.add("code", authorizedCode);

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        try {
            // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
            ResponseEntity<String> response = rt.exchange( "https://kauth.kakao.com/oauth/token", HttpMethod.POST, kakaoTokenRequest, String.class );
            // JSON -> 액세스 토큰 파싱
            String tokenJson = response.getBody();
            JSONObject rjson = new JSONObject(tokenJson);
            String accessToken = rjson.getString("access_token");

            return accessToken;
        } catch (HttpClientErrorException.BadRequest e){
            System.out.println(e);
            log.error("getAccessToken - 잘못된 인가 코드");
            return null;
        }
    }

    public KakaoUser getUserInfoByToken(String accessToken) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders(); headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        try {
            // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
            ResponseEntity<String> response = rt.exchange( "https://kapi.kakao.com/v2/user/me", HttpMethod.POST, kakaoProfileRequest, String.class );

            JSONObject body = new JSONObject(response.getBody());
            Long id = body.getLong("id");
            String email = body.getJSONObject("kakao_account").getString("email");
            String profileImgUrl = body.getJSONObject("kakao_account").getJSONObject("profile").getString("thumbnail_image_url");
            String nickname = body.getJSONObject("properties").getString("nickname");

            KakaoUser user = KakaoUser.builder()
                    .userKakaoId(id)
                    .userNickname(nickname)
                    .userEmail(email)
                    .userProfileImage(profileImgUrl)
                    .build();

            return user;
        } catch (HttpClientErrorException.Unauthorized e) { // accessToken 만료된경우
            log.error("getUserInfoByToken - 잘못된 accessToken");
            return null;
        }
    }

    public Long logout(HttpServletRequest request) {
        String accessToken = request.getHeader(HEADER_STRING);
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders(); headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        try {
            // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
            ResponseEntity<String> response = rt.exchange("https://kapi.kakao.com/v1/user/logout", HttpMethod.POST, kakaoProfileRequest, String.class);
            JSONObject body = new JSONObject(response.getBody());
            Long id = body.getLong("id");

            return id;
        } catch (HttpClientErrorException.Unauthorized e) {
            return null;
        }
    }

}
