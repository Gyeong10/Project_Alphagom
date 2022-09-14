package com.d210.alphagom.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "gamestatus")
public class GameStatus {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean status;

    @Enumerated(EnumType.STRING)
    private GameTag gameTag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public GameStatus(Long id, boolean status, GameTag gameTag, User user) {
        this.id = id;
        this.status = status;
        this.gameTag = gameTag;
        this.user = user;
    }
}