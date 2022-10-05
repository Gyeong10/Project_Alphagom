<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="top-title">
      <img src="/assets/image/title.png" width="150" alt="말해봐요 알파곰 제목">
    </div>
    <div class="home">
      <!-- <div class="container-bg"></div> -->
      <div class="item-cont">
        <div class="btn-cont">
          <router-link to="/map">
            <button class="warning button-custom-home btn-go-map">
              탐험하기
            </button>
          </router-link>
          <router-link to="/rank">
            <button class="warning button-custom-home">순위보기</button>
          </router-link>
          <router-link to="/myPage">
            <button class="warning button-custom-home">내 정보</button>
          </router-link>
          <router-link to="/myPage">
            <button class="warning button-custom-home">로그아웃</button>
          </router-link>
        </div>
        <img
          class="img-hello"
          src="/assets/image/alphagom_hello.png"
          width="150"
          alt="홈 이미지"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBgStore } from "@/stores/bg";
import { useSettingStore } from "@/stores/setting";
import { ref, computed, onMounted } from "vue";

// 배경 경로 수정
onMounted(() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/home_bg_low.jpg")';
  console.log(bgStore.bgUrlState.value);

  const bgmTitle = computed(() => settingStore.bgmTitle);
  settingStore.setBGM("HOME");
});

const bgStore = useBgStore();
const settingStore = useSettingStore();
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);
</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  /* 위 필터는 모바일 브라우저 대비 */
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
.top-title {
  position: absolute;
  /* font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #483737; */
  top: 18px;
  left: 388px;
  /* white-space: nowrap; */
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
  margin: 6px;
  font-weight: 600;
}
.img-hello {
  position: absolute;
  top: 80px;
  left: 511px;
}
/* btn---- */
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: var(--button-bg-color);
  color: var(--button-color);
  margin: 0;
  padding: 0.5rem 2rem;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 30px;
  display: inline-block;
  width: auto;
  cursor: pointer;
  transition: 0.5s;
}
button.warning {
  --button-color: #212529;
  --button-bg-color: #faf4bd;
  --button-hover-bg-color: #fff170;
  border: 4px solid #fff170;
  width: 150px;
}
button:active,
button:hover,
button:focus {
  background: var(--button-hover-bg-color);
  border: 4px solid #faf4bd;
  outline: 0;
}
button:disabled {
  opacity: 0.5;
}
/* ----btn */
</style>
