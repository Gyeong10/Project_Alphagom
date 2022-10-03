<template>
  <div class="app">
    {{ myFunction_get() }}
    {{ myFunction_set() }}
    <NavBar></NavBar>
    <router-view class="view" />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import { useBgStore } from "./stores/bg";
import { computed } from 'vue'

/* bgUrl 변경 과정 */
// const bgUrl = 'url("/bg_map.png")' 이런 식으로 url을 쏠 거에요. public 디렉토리에 접근하면 에러가 안 떠요!!
const bgStore = useBgStore()
// store의 state로 bgUrl 값 변경 
const bgUrl = computed(() => bgStore.bgUrlState)

// bgUrl = bgStore.bgUrlGetters.value
console.log("bgUrl: " + bgUrl.value)
console.log("bgStore.bgUrlGetters.value: " + bgStore.bgUrlState)


/* css 전역 변수 값 변경 과정 */
// Get the root element(css)
let r = document.querySelector(':root');
let rs = getComputedStyle(r);

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  console.log(rs.getPropertyValue('--bg-url'))
}
// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--bg-url', bgUrl.value);
  console.log(rs.getPropertyValue('--bg-url'))
}
</script>

<style>
:root {
  --bg-url: url("");
}
#app {
  position: relative;
  width: 926px;
  height: 428px;
  background-color: #F5F5DC;
  padding: 0 !important;
  overflow: hidden;
  background-image: var(--bg-url);
  /* background-repeat: no-repeat;
  background-size: inherit; */
}
</style>