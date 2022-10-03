<template>
    <div class="container-bg"></div>
</template>
<script>
export default {
    name: "BGSky",
}
</script>
<style scoped>
.container-bg {
  position: absolute;
  background-image: url("/image/sky_bg_picture_filter_low.png");
  background-repeat: no-repeat;
  background-size: inherit;
  /* 어둡게 하는 거 */
  background-color:rgba(0, 0, 0, 0.4);
  /* 곱하기 효과 */
  background-blend-mode: multiply;
  /* Add the blur effect */
  filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
    
</style>