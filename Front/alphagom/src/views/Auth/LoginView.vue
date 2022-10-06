<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="white-box"></div>
    <div class="center-alignment">
      <div class="logo">
        <img
          src="/assets/image/alphagom_look_normal.png"
          width="90"
          alt="말해봐요 알파곰 로고"
        />
        <img
          src="/assets/image/title.png"
          width="200"
          alt="말해봐요 알파곰 제목"
        />
      </div>
      <div class="kakao-login-btn">
        <a :href="socialLoginUrl('kakao')">
          <img :src="kakao_login_medium_wide" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import kakao_login_medium_wide from "/assets/image/kakao_login_medium_wide.png";
import { useBgStore } from "@/stores/bg";
import { computed, onMounted } from "vue";
import $ from "@/utils";

// 배경 경로 수정
onMounted(() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/home_bg_low.jpg")';
});
const bgStore = useBgStore();
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

// 소셜로그인
const socialLoginUrl = (socialType) => {
  return $.getSocialLoginUrl(socialType);
};
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
  width: 926px;
  height: 428px;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.white-box {
  position: absolute;
  top: 104px;
  left: 263px;
  width: 400px;
  height: 250px;
  background-color: white;
  border-radius: 20px;
  opacity: 45%;
  z-index: 0;
}
.center-alignment {
  position: absolute;
  top: 140px;
  left: 286px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.logo {
  display: flex;
  align-items: center;
}

.logo > img {
  margin: 15px;
}
.kakao-login-btn {
  position: relative;
  margin-left: 3px;
}



</style>
