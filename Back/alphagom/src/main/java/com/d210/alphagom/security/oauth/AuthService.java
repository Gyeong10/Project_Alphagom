package com.d210.alphagom.security.oauth;

import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final MyTokenProvider tokenProvider;

    @Transactional
    public String createRefreshToken(Long userId) {
        User user = userRepository.findUserById(userId);
//                .orElseThrow(() -> new LoginException());
        String refreshToken = tokenProvider.createRefreshToken(user);
        user.createRefreshToken(refreshToken);
        return refreshToken;
    }

    public String createNewAccessToken(String refreshToken) {
        User user = userRepository.findByRefreshToken(refreshToken).get();
//                .orElseThrow(() -> new RefreshTokenNotFoundException());
        String newAccessToken = tokenProvider.createAccessToken(user);
        return newAccessToken;
    }
}
