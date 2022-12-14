package com.d210.alphagom.security.oauth.user;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KakaoLogin {

    @Transactional
    public String getAccessToken(String authorize_code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        System.out.println("code = " + authorize_code);

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=a330ef34e781fc0054c0e48cc1702b6a");
//            sb.append("&redirect_uri=http://localhost:5173/oauth/redirect");
            sb.append("&redirect_uri=https://j7d210.p.ssafy.io/oauth/redirect");
            sb.append("&code=" + authorize_code);
            bw.write(sb.toString());
            bw.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    public HashMap<String, String> getUserInfo(String access_Token) {

        HashMap<String, String> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            System.out.println("kakao_account : " + kakao_account);
            String id = element.getAsJsonObject().get("id").getAsString();

            String email = null;
            if (kakao_account.getAsJsonObject().get("email") != null) {
                email = kakao_account.getAsJsonObject().get("email").getAsString();
                userInfo.put("id", id);
                userInfo.put("email", email);
            }

            if (kakao_account.getAsJsonObject().get("profile") != null) {
                JsonObject profile = kakao_account.getAsJsonObject().get("profile").getAsJsonObject();
                System.out.println("profile : " + profile);

                String picture = null;
                if (profile.getAsJsonObject().get("profile_image_url") != null) {
                    picture = profile.getAsJsonObject().get("profile_image_url").getAsString();
                    userInfo.put("picture", picture);
                }

                String nickname = null;
                if (profile.getAsJsonObject().get("nickname") != null) {
                    nickname = profile.getAsJsonObject().get("nickname").getAsString();
                    userInfo.put("nickname", nickname);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return userInfo;
    }
}