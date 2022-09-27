package com.d210.alphagom.security.oauth.user;


import com.d210.alphagom.common.AuthProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(AuthProvider authProvider, Map<String, Object> attributes) {
        switch (authProvider) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case NAVER: return null;
            case KAKAO: return null;
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
