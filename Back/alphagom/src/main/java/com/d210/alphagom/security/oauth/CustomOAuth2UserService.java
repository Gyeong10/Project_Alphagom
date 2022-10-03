package com.d210.alphagom.security.oauth;

import com.d210.alphagom.common.AuthProvider;
import com.d210.alphagom.common.Role;
import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.repository.UserRepository;
import com.d210.alphagom.security.exception.OAuthProcessingException;
import com.d210.alphagom.security.oauth.user.CustomUserDetails;
import com.d210.alphagom.security.oauth.user.OAuth2UserInfo;
import com.d210.alphagom.security.oauth.user.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;
    private final HttpSession httpSession;

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        return process(userRequest, oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        // OAuth2 서비스 id (구글, 카카오, 네이버)
        AuthProvider authProvider = AuthProvider.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

        if (userInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }
        Optional<User> userOptional = userRepository.findByEmail(userInfo.getEmail());
        User user;

        if (userOptional.isPresent()) {		// 이미 가입된 경우
            user = userOptional.get();
            if (authProvider != user.getAuthProvider()) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }

        } else {			            // 가입되지 않은 경우
            user = createUser(userInfo, authProvider);
        }
        return CustomUserDetails.create(user, oAuth2User.getAttributes());
    }
    
    private User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        User user = User.builder()
                .email(userInfo.getEmail())
                .picture(userInfo.getImageUrl())
                .role(Role.USER)
                .authProvider(authProvider)
                .build();
        return userRepository.save(user);
    }
}