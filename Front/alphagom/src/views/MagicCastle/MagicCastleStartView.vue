<template>
  <div class="container">
    <div class="container-bg"></div>
    <!-- <div class="top-title">{{ stage.name }}</div> -->
    <div class="top-title">마법의 성</div>
    <BackButton class="back-btn" />
    <div class="bottom-items">
      <PlayBar class="bottom-icons"></PlayBar>
    </div>
    <div class="items-cont">
      <div class="game-title">
        <!-- <div class="title">{{ stage.name }}</div> -->
        <div class="title">마법의 성</div>
        <div class="subTitle">~프롤로그~</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";
import PlayBar from "@/components/game/PlayBar.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useGameStore } from "@/stores/game";
import { useBgStore } from "@/stores/bg";
import { useSettingStore } from "@/stores/setting";
import router from "@/router";

const bgStore = useBgStore();
const settingStore = useSettingStore();
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

const game = useGameStore();
const stage = reactive({ name: "MagicCastle" });
//reactive : 객체의 반응형 복사본을 반환합니다.
game.setStage(stage.name);

// 배경 경로 수정
onMounted(() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/seaCastle_in_bg_picture_filter_low.png")';
  console.log(bgStore.bgUrlState.value);

  // bgm 설정
  const bgmTitle = computed(() => settingStore.bgmTitle);
  settingStore.setBGM("MAGICCASTLE");
});

// 3초 후 다음 뷰로 넘기기
setTimeout(() => {
  router.push({
    name: "MagicCastleDialogView",
  });
}, 3000);
</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  /* 위 필터는 모바일 브라우저 대비 */
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}
.bottom-score {
  position: absolute;
  top: 370px;
  left: 800px;
  /* margin: 0; */
  text-align: end;
}
.score-- {
  position: absolute;
  top: 370px;
  left: 878px;
  color: #faf4bd;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  white-space: nowrap;
}
.top-title {
  position: absolute;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  top: 8px;
  left: 416px;
  white-space: nowrap;
}
.game-title {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 173px;
  left: 360px;
}
.title,
.subTitle {
  color: #fff;
  font-family: "Noto Serif KR", serif;
  font-weight: 800;
  white-space: nowrap;
}
.title {
  font-size: 50px;
}
.subTitle {
  font-size: 32px;
}
.back-btn {
  position: absolute;
  top: 20px;
  left: 884px;
}
.bottom-items {
  position: absolute;
}
.bottom-icons {
  width: 95vw;
  top: 377px;
  left: 30px;
}
</style>
