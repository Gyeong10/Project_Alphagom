package com.d210.alphagom.domain.repository;

import com.d210.alphagom.domain.entity.Game;
import com.d210.alphagom.common.GameTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> getGameByGameTagEquals(GameTag gameTag);
}
