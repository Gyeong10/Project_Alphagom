package com.d210.alphagom.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RankResponse {

    private String gameTag;

    private String nickName;

    private int score;

    private String picture;

    private Long rank;

    public RankResponse(String gameTag, String nickName, int score, String picture) {
        this.gameTag = gameTag;
        this.nickName = nickName;
        this.score = score;
        this.picture = picture;
    }

    public RankResponse(String gameTag, String nickName, int score, String picture, Long rank) {
        this.gameTag = gameTag;
        this.nickName = nickName;
        this.score = score;
        this.picture = picture;
        this.rank = rank;
    }
}
