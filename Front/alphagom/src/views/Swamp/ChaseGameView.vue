<template>
  <div>
    <div class="container-bg"></div>
  </div>
</template>

<script setup>
import { useBgStore } from "@/stores/bg"
import { computed, onMounted } from 'vue'

// 배경 경로 수정
onMounted (() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/chase_bg_picture_filter_low.png")'
  console.log(bgStore.bgUrlState.value)
})
const bgStore = useBgStore()
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState)

</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  /* 위 필터는 모바일 브라우저 대비 */
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
} 
</style>