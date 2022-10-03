<template>
  <div class="score">{{ SwampScore }}</div>
</template>

<script>
import { mapState } from "pinia";
import { useGameStore } from "@/stores/game";

export default {
  name: "Score",
  computed: {
    ...mapState(useGameStore, ["SwampScore"]),
  },
};
</script>

<style scoped>
  .score {
    color: #FAF4BD;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 24px;
    font-weight: 800;
    white-space: nowrap;
  }
</style>
