package com.d210.alphagom.domain.service;

import com.d210.alphagom.domain.entity.GameStatus;
import com.d210.alphagom.common.GameTag;
import com.d210.alphagom.domain.entity.User;
import com.d210.alphagom.domain.repository.GameStatusRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameStatusService {

    private final GameStatusRepository gameStatusRepository;

    private final RedisTemplate redisTemplate;


    // 점수 저장
    @Transactional
    public Long saveScore(int score, GameTag tag, User user) {

        // MySQL 저장
        GameStatus gameStatus = gameStatusRepository.save(new GameStatus(score, tag, user));

        // redis 점수 저장
        String key = tag.toString();
        try {

            Double beforeScore = redisTemplate.opsForZSet().score(key, user.getId().toString());

            if (beforeScore <= score) {
                redisTemplate.opsForZSet().add(tag.toString(), user.getId().toString(), score);
            }

            try {
                Double beforeAllScore = redisTemplate.opsForZSet().score("all", user.getId().toString());

                if (beforeAllScore - beforeScore + score > beforeAllScore) {
                    redisTemplate.opsForZSet().add("all", user.getId().toString(), beforeAllScore - beforeScore + score);
                }
            } catch (Exception e) {
                redisTemplate.opsForZSet().add("all", user.getId().toString(), score);
            }

        } catch (Exception e) {
            redisTemplate.opsForZSet().add(tag.toString(), user.getId().toString(), score);

            try {
                Double beforeAllScore = redisTemplate.opsForZSet().score("all", user.getId().toString());
                redisTemplate.opsForZSet().add("all", user.getId().toString(), beforeAllScore + score);
            } catch (Exception ex) {
                redisTemplate.opsForZSet().add("all", user.getId().toString(), score);
            }
        }

        return gameStatus.getId();
    }

}
