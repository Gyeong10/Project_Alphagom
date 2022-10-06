package com.d210.alphagom.domain.service;

import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public User findUser(Long userId) {
        return userRepository.findUserById(userId);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
//                .orElseThrow(() -> new IllegalArgumentException("email이 존재하지 않습니다."));
    }
    @Transactional
    public String saveNickname(Long userId, String nickname) {
        User user = userRepository.findUserById(userId);
        user.setNickname(nickname);
        return nickname;
    }

    public String findUserNickName(Long userId) {
        return userRepository.findUserById(userId).getNickname();
    }

    @Transactional
    public Long checkIsCastle(Long userId) {
        User user = userRepository.findUserById(userId);
        user.updateIsCastle(true);
        return userId;
    }

    @Transactional
    public Long joinMember(User user) {
        return userRepository.save(user).getId();
    }
}
