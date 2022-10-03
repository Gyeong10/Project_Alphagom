package com.d210.alphagom.domain.service;

import com.d210.alphagom.domain.entity.Game;
import com.d210.alphagom.common.GameTag;
import com.d210.alphagom.domain.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameService {

    private final GameRepository gameRepository;

    public Game getGame(GameTag tag) {
        List<Game> games = gameRepository.getGameByGameTagEquals(tag);
        Collections.shuffle(games);
        Game game = games.stream()
                .limit(1)
                .collect(Collectors.toList()).get(0);
        return game;
    }

    public List<Game> getWordGameList(GameTag tag) {
        List<Game> games = gameRepository.getGameByGameTagEquals(tag);
        return games;
    }
}
