<template>
  <div class="score">{{ score }}</div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { computed } from "vue";

const store = useGameStore();
const score = computed(() => store.score);

// 점수 1초당 10점씩 깎기
// 게임 진행 시에만 깎도록 조정해야 한다
const interval = setInterval(() => {
  if (store.score === 0) clearInterval(interval);
  else store.score = store.score - 10;
}, 1000);
</script>

<style scoped>
.score {
  color: #faf4bd;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  white-space: nowrap;
}
</style>
