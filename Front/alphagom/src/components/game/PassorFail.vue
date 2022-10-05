<template>
  <div>
    <div v-if="check === 'pass' || check === 'passbutton'">
      <div class="text pass">정답이야!</div>
    </div>
    <div v-if="check === 'fail' || check === 'failbutton'">
      <div class="text fail">오답이야!</div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { computed } from "vue";

const store = useGameStore();
const check = computed(() => store.PassFail);

setTimeout(() => {
  if (store.PassFail === "pass") {
    store.PassFail = "passbutton";
  } else {
    store.PassFail = "failbutton";
  }
}, 1500);
</script>

<style scoped>
.text {
  position: absolute;
  top: 240px;
  left: 420px;

  font-size: 128px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #F48196;
  text-align: center;
  line-height: 29px;
}
</style>
