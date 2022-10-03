<template>
  <div>
    <PlayIcon></PlayIcon>
    <PauseIcon></PauseIcon>
  </div>
</template>
<script>
import { PlayIcon, PauseIcon } from "@heroicons/vue/24/solid";

export default {
  name: "PlayBar",
  components: {
    PlayIcon,
    PauseIcon,
  },
};
</script>
<style scoped>
div {
  display: flex;
  width: 4rem;
  height: 4rem;
  color: var(--light-yellow)
}
</style>
