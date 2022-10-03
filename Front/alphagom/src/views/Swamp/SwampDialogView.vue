<template>
  <div>
    <div class="container-bg"></div>
    <CommonDialog></CommonDialog>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import CommonDialog from "@/components/game/CommonDialog.vue";
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


const game = useGameStore();
game.setStage("swamp");


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
</style>
