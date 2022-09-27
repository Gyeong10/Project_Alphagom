package com.d210.alphagom.domain.entity;

import com.d210.alphagom.common.GameTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "game")
public class Game {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sentance;

    private String answer;

    private String example;

    @Enumerated(EnumType.STRING)
    private GameTag gameTag;

    public Game(Long id, String sentance, String answer, String example, GameTag gameTag) {
        this.id = id;
        this.sentance = sentance;
        this.answer = answer;
        this.example = example;
        this.gameTag = gameTag;
    }
}
