<template>
  <div>
    <ChevronLeftIcon @click="moveBackView()" class="backicon text-blue-500" />
  </div>
</template>
<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";

export default {
  name: "BackButtonView",
  components: {
    ChevronLeftIcon,
  },
  setup() {
    //
  },
};
</script>
<style scoped>
.backicon {
  /* width: 3rem; */
  height: 1.5rem;
  color: #fff;
}
</style>
