<template>
  <div class="container">
    <div class="home">
      <div class="container-bg"></div>
      <div class="item-cont">
        <div class="btn-cont">
          <router-link to="/map">
            <button class="warning button-custom-home btn-go-map">탐험하기</button>
          </router-link>
          <router-link to="/rank">
            <button class="warning button-custom-home">순위보기</button>
          </router-link>
          <router-link to="/myPage">
            <button class="warning button-custom-home">내 정보</button>
          </router-link>
        </div>
        <img class="img-hello" src="@/assets/image/alphagom_hello.png" width="150" alt="홈 이미지" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBgStore } from "@/stores/bg"
import { computed, onMounted } from 'vue'

// 배경 경로 수정
onMounted (() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/home_bg_low.jpg")'
  console.log(bgStore.bgUrlState.value)
})
const bgStore = useBgStore()
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState)



</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
.item-cont {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.btn-cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px;
  position: absolute;
  top: 75px;
  left: 250px;
}
.button-custom-home {
  margin: 10px;
  font-weight: 600;
}
.img-hello {
  position: absolute;
  top: 66px;
  left: 511px;
}

:root {
  --button-color: #ffffff;
  --button-bg-color: #0d6efd;
  --button-hover-bg-color: #025ce2;
}
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: var(--button-bg-color);
  color: var(--button-color);
  margin: 0;
  padding: 0.5rem 2rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 30px;
  display: inline-block;
  width: auto;
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  cursor: pointer;
  transition: 0.5s;
}
button.success {
  --button-bg-color: #28a745;
  --button-hover-bg-color: #218838;
}
button.error {
  --button-bg-color: #dc3545;
  --button-hover-bg-color: #c82333;
}
button.warning {
  --button-color: #212529;
  --button-bg-color: #FAF4BD;
  --button-hover-bg-color: #e0a800;
  border: 4px solid #FFF170;
  width: 150px;
}
button:active,
button:hover,
button:focus {
  background: var(--button-hover-bg-color);
  outline: 0;
}
button:disabled {
  opacity: 0.5;
}

</style>


