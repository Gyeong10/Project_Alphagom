<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="userInfo">
      <p>로그인</p>
      {{ username }}
    </div>
  </div>
</template>

<script setup>
  import { useBgStore } from "@/stores/bg"
  import { computed, onMounted } from 'vue'
  
  // 배경 경로 수정
  onMounted (() => {
    // store의 bgUrlState 값을 직접 변경
    bgStore.bgUrlState = 'url("/map_bg_picture_filter_low.png")'
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
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
} 
.container {
  /* background-image: url("src/assets/image/홈_배경_low.png"); */
  background-color: blueviolet;
  width: 100vw;
  height: 100vh;
}
.userInfo {
  position: relative;
}
</style>
