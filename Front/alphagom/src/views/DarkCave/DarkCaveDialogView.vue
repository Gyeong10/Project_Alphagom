<template>
  <div class="container">
    <div class="container-bg"></div>
    <!-- <div class="top-title">{{ stage.name }}</div> -->
    <div class="top-title">어둠의 동굴</div>
    <BackButton class="back-btn" />
    <!-- <Score class="bottom-score"></Score>
    <div class="score--">점</div> -->
    <div class="bottom-items">
      <PlayBar class="bottom-icons"></PlayBar>
    </div>
    <CommonDialog></CommonDialog>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { useBgStore } from "@/stores/bg";
import { reactive, computed, onMounted } from "vue";
import CommonDialog from "@/components/game/CommonDialog.vue";
import BackButton from "@/components/BackButton.vue";
import Score from "@/components/game/Score.vue";
import PlayBar from "@/components/game/PlayBar.vue";

// 배경 경로 수정
onMounted(() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/cave_bg_2_picture_filter_low.png")';
  console.log(bgStore.bgUrlState.value);
});
const bgStore = useBgStore();
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

const game = useGameStore();

const stage = reactive({ name: "darkcave" });
//reactive : 객체의 반응형 복사본을 반환합니다.

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
  left: 452px;
  white-space: nowrap;
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
