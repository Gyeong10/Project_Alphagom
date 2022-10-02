<template>
  <div class="container">
    <BGMagicCastle />
    <BackButton class="back-btn" />
    <div class="game-title">
      <div class="title">{{ stage.name }}</div>
      <div class="subTitle">~프롤로그~</div>
    </div>
    <div class="bottom-items">
      <PlayBar></PlayBar>
      <Score style="margin-top: 3px;"></Score>
    </div>
  </div>
</template>

<script>
import BGMagicCastle from "@/components/game/BGMagicCastle.vue";
import BackButton from "@/components/BackButton.vue";
import Score from "@/components/game/Score.vue";
import PlayBar from "@/components/game/PlayBar.vue";
import { ref, reactive } from "vue";
import { useGameStore } from "@/stores/game";
import router from "@/router";

export default {
  name: "MagicCastleStartView",
  components: {
    BGMagicCastle,
    BackButton,
    Score,
    PlayBar,
  },
  setup() {
    const game = useGameStore();
    const stage = reactive({ name: "darkcave" });
    //reactive : 객체의 반응형 복사본을 반환합니다.
    game.setStage(stage.name);

    // 3초 후 다음 뷰로 넘기기
    setTimeout(() => {
      router.push({
        name: "MagicCastleDialogView",
      });
    }, 3000);

    return { stage };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
}
.game-title {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title, .subTitle {
  color: #fff;
  font-family: 'Noto Serif KR', serif;
  font-weight: bold;
}
.title {
  font-size: 50px;
}
.subTitle {
  font-size: 32px;
}

.back-btn {
  position: absolute;
  color: black;
  top: 24px;
  left: 884px;
}
.bottom-items {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95vw;
  bottom: -20px;
  margin: 30px;
}

</style>
