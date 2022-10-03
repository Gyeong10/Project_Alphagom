<template>
  <div class="container">
    <div class="container-bg"></div>
    <BGSwamp />
    <BackButton class="back-btn" />
    <div class="game-title">
      <div class="title">{{ stage.name }}</div>
      <div class="subTitle">~별주부전~</div>
    </div>
    <div class="bottom-items">
      <PlayBar></PlayBar>
      <Score style="margin-top: 3px;"></Score>
    </div>
  </div>
</template>

<script setup>
import BGSwamp from "@/components/game/BGSwamp.vue";
import BackButton from "@/components/BackButton.vue";
import Score from "@/components/game/Score.vue";
import PlayBar from "@/components/game/PlayBar.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useGameStore } from "@/stores/game";
import router from "@/router";
import { useBgStore } from "@/stores/bg"


// 배경 경로 수정
onMounted (() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/chase_bg_picture_filter_low.png")'
  console.log(bgStore.bgUrlState.value)
})
const bgStore = useBgStore()
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState)


const game = useGameStore();
const stage = reactive({ name: "swamp" });
//reactive : 객체의 반응형 복사본을 반환합니다.
game.setStage(stage.name);

// 3초 후 다음 뷰로 넘기기
setTimeout(() => {
  router.push({
    name: "swampDialog",
  });
}, 3000);

</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
} 
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
