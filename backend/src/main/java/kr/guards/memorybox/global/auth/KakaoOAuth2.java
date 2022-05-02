package kr.guards.memorybox.global.auth;

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

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.admin}")
    private String adminKey;

    @Value("${kakao.redirect-url}")
    private String redirectUrl;

    public String getAccessToken(String authorizedCode) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUrl);
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
            log.error("getAccessToken - 잘못된 인가 코드");
            return null;
        }
    }

    public KakaoUser getUserInfoByToken(String accessToken) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST, kakaoProfileRequest, String.class);

        JSONObject body = new JSONObject(response.getBody());
        Long id = body.getLong("id");
        String email = body.getJSONObject("kakao_account").getString("email");
        String nickname = body.getJSONObject("properties").getString("nickname");
        String profileImgUrl;
        try {
            profileImgUrl = body.getJSONObject("kakao_account").getJSONObject("profile").getString("thumbnail_image_url");
        } catch (Exception e) {
            profileImgUrl = null;
        }

        KakaoUser user = KakaoUser.builder()
                .userKakaoId(id)
                .userNickname(nickname)
                .userEmail(email)
                .userProfileImage(profileImgUrl)
                .build();

        return user;
    }

    public Long logout(Long userKakaoId) {
        // 카카오에 요청 보내기
        ResponseEntity<String> response = requestToKakaoByAK(String.valueOf(userKakaoId), "v1/user/logout");

        // 응답받은 id값 가져오기
        JSONObject body = new JSONObject(response.getBody());
        Long resKakaoId = body.getLong("id");

        return resKakaoId;
    }

    public Long unlinkUser(Long userKakaoId) {
        // 카카오에 요청 보내기
        ResponseEntity<String> response = requestToKakaoByAK(String.valueOf(userKakaoId), "v1/user/unlink");

        // 응답받은 id값 추출
        JSONObject body = new JSONObject(response.getBody());
        Long resKakaoId = body.getLong("id");

        return resKakaoId;
    }

    private ResponseEntity<String> requestToKakaoByAK(String userKakaoId, String requestUrl) {
        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "KakaoAK " + adminKey);

        // HttpBody 오브젝트 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("target_id", String.valueOf(userKakaoId));
        params.add("target_id_type", "user_id");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoAKRequest = new HttpEntity<>(params, headers);

        // Http 요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음.
        ResponseEntity<String> response = rt.exchange("https://kapi.kakao.com/" + requestUrl, HttpMethod.POST, kakaoAKRequest, String.class);
        return response;
    }

}
