<template>
  <div>
    <ChevronLeftIcon @click="moveBackView()" class="backicon text-blue-500" />
  </div>
</template>
<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";

const router = useRouter();

function moveBackView() {
  router.go(-1);
}
</script>
<style scoped>
.backicon {
  /* width: 3rem; */
  height: 1.5rem;
  color: #fff;
}
</style>
