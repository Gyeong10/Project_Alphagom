package com.d210.alphagom.api;

import com.d210.alphagom.api.dto.BirdGameResponse;
import com.d210.alphagom.api.dto.TongueGameResponse;
import com.d210.alphagom.api.dto.WordGameResponse;
import com.d210.alphagom.domain.entity.Game;
import com.d210.alphagom.common.GameTag;
import com.d210.alphagom.domain.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/be/game")
@RequiredArgsConstructor
public class GameApiController {

    private final GameService gameService;

    @GetMapping("/cave/tonguetwister")
    public ResponseEntity<?> getTongueGame() {

        log.info("젠말놀이 문제 제공");
        Game cave = gameService.getGame(GameTag.cave);
        return ResponseEntity.ok(new TongueGameResponse(cave.getSentance()));
    }

    @GetMapping("/sky/bird")
    public ResponseEntity<?> getBirdGame() {

        log.info("새 속담 게임 문제 제공");
        Game game = gameService.getGame(GameTag.sky);
        String exampleList = game.getExample();
        List<String> example = Arrays.asList(exampleList.split(","));
        return ResponseEntity.ok(new BirdGameResponse(game.getAnswer(), example, game.getSentance()));
    }

    @GetMapping("/swamp/word")
    public ResponseEntity<?> getWordGame() {

        log.info("의성어 / 의태어 게임 문제 제공");
        List<Game> games = gameService.getWordGameList(GameTag.swamp);
        int randomNum = (int) (Math.random() * 99) + 1;

        if (randomNum % 2 == 1) {
            List<WordGameResponse> result = games.stream()
                    .limit(5)
                    .map(o -> new WordGameResponse(o.getAnswer(),
                            Arrays.asList(o.getExample().split(",")), o.getSentance()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(result);
        } else {
            List<WordGameResponse> result = games.stream()
                    .skip(5)
                    .map(o -> new WordGameResponse(o.getAnswer(),
                            Arrays.asList(o.getExample().split(",")), o.getSentance()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(result);
        }
    }
}
