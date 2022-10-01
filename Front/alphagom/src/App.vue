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

// Get the root element
var r = document.querySelector(':root');
var rs = getComputedStyle(r);
const bgUrl = ""

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  // Alert the value of the --blue variable
  console.log(rs.getPropertyValue('--bg-url'))
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  // r.style.setProperty('--bg-url', bgUrl);
  r.style.setProperty('--bg-url', 'url("/src/assets/image/bg_map.png")');
  console.log(rs.getPropertyValue('--bg-url'))
}
</script>

<style>
/* body {
  position: relative;
  width: 926px;
  height: 428px;
  max-height: 428px;
}; */
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