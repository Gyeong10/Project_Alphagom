<template>
  <div></div>
</template>

<script setup>
import { useSettingStore } from "@/stores/setting";

const store = useSettingStore();
const sound = store.sound;

sound.play();
</script>

<style scoped></style>
