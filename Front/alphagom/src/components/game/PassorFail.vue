<template>
  <div>
    <div v-if="check === 'pass' || check === 'passbutton'">
      <div class="game-icon">정답이야!</div>
    </div>
    <div v-if="check === 'fail' || check === 'failbutton'">
      <div class="game-icon">오답이야!</div>
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
.game-icon {
  font-size: 50px;
  color: #fff;
}
</style>
