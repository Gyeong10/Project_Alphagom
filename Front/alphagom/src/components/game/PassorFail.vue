<template>
  <div>
    <div v-if="check === 'pass' || check === 'passbutton'">
      <div class="text-box pass-box"></div>
      <div class="text pass">정답!</div>
    </div>
    <div v-if="check === 'fail' || check === 'failbutton'">
      <div class="text-box fail-box"></div>
      <div class="text fail">오답!</div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const store = useGameStore();
const check = computed(() => store.PassFail);

// 라우터 사용
const route = useRoute();
const router = useRouter();

setTimeout(() => {
  if (store.stage == 'MagicCastle' ) {
    if (store.PassFail == "pass") {
      router.push({ name: 'MagicCastleTutorialView'})
    } else {
      store.PassFail = null
    }
  } else if (store.stage == 'epilogue') {
    if (store.PassFail == "pass") {
      store.scriptNum == 0
      router.push({ name: 'EpilogueEndView'})
    } else {
      store.PassFail = null
    }
  } else if (store.stage === 'sky') {
    if (store.PassFail === "pass") {
      store.PassFail = "birdpicture";
    } else {
      store.PassFail = "failbutton";
    }
  } else {
    if (store.PassFail === "pass") {
      store.PassFail = "passbutton";
    } else {
      store.PassFail = "failbutton";
    }
  }
}, 1500);

</script>

<style scoped>
.text-box {
  position: absolute;
  top: 183px;
  left: 351px;
  width: 224px;
  height: 133px;
  border-radius: 20px;
  background-color: #FFE1E2;
  opacity: 90%;
  z-index: 1;
}
.pass-box {
  background-color: #EDFFD8;
}
.text {
  position: absolute;
  top: 205px;
  left: 405px;

  font-size: 60px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-weight: 800;
  white-space: nowrap;
  text-align: center;
  z-index: 1;
}
.pass {
  color: #159D64;
}
.fail {
  color: #DD2E44;
}
</style>
