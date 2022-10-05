package com.d210.alphagom.security.oauth;

import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.repository.UserRepository;
import com.d210.alphagom.security.exception.LoginException;
import com.d210.alphagom.security.exception.RefreshTokenNotFoundException;
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
        User user = userRepository.findById(userId).get();
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
