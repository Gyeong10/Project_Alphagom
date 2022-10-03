<template>
  <div>
    <BackGroundMusic v-if="audiostate" />
    <CommonDialog></CommonDialog>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import CommonDialog from "@/components/game/CommonDialog.vue";
import { ref, computed } from "vue";
import BackGroundMusic from "@/components/BackGroundMusic.vue";
// import bgm from "@/assets/music/backgroundmusic/anewbeginning_Magiccastle.mp3";

const game = useGameStore();
game.setStage("MagicCastle");
game.setBGM("MagicCastle");
game.AudioState = true;
</script>

<style scoped></style>
