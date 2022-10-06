<template>
  <div class="score">{{ score }}</div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { computed, onMounted } from "vue";

const store = useGameStore();
const score = computed(() => store.score);

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
