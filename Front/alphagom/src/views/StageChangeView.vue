<template>
  <div class="container-bg"></div>
  <div class="modal-overlay" @click.self="$emit('close')"></div>
  <GameScoreModal class="modal-content" />
</template>

<script setup>
import GameScoreModal from "@/views/Modal/GameScoreModal.vue";
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
/* .modal-overlay {
  position: absolute;
  top: -100px;
  left: -190px;
  width: 100vw;
  height: 100vh;

  background-color: black;
  opacity: 0.5;
} */
.modal-content {
  z-index: 1;
}
</style>
