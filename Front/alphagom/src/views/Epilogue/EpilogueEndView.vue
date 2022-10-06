<template>
  <div class="container-bg"></div>
  <!-- <div class="top-title">{{ stage.name }}</div> -->
  <div class="top-title">에필로그</div>
  <BackButton class="back-btn" />
  <div class="bottom-items">
    <PlayBar class="bottom-icons"></PlayBar>
  </div>
  <EpilogueModal />
</template>

<script setup>
import EpilogueModal from "@/views/Modal/EpilogueModal.vue";
import BackButton from "@/components/BackButton.vue";
import PlayBar from "@/components/game/PlayBar.vue";
import { useBgStore } from "@/stores/bg";
import { computed, onMounted } from "vue";

// 배경 경로 수정
onMounted(() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/sky_bg_picture_filter_low.png")';
  console.log(bgStore.bgUrlState.value);
});
const bgStore = useBgStore();
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

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
.top-title {
  position: absolute;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  top: 8px;
  left: 416px;
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