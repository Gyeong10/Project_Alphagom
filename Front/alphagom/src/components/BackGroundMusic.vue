<template>
  <button v-if="!playing" @click="audioStart">BGM PLAYyyyyyyyyyyyyyyyy</button>
  <button v-if="playing" @click="audioStop">BGM STOPpppppppppppppppp</button>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { ref } from "vue";

const store = useGameStore();
const playing = ref(false);

const audio = new Audio(store.stageBgm);

function audioStart() {
  playing.value = true;
  audio.play();
}

function audioStop() {
  audio.pause();
  playing.value = false;
}
</script>

<style scoped></style>
