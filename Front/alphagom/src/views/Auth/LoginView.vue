<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="userInfo">
      <ul>
        <li>
          <a :href="socialLoginUrl('kakao')">
            <img :src="kakao_login_medium_wide" />
          </a>
        </li>
      </ul>
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
  bgStore.bgUrlState = 'url("/map_bg_picture_filter_low.png")';
  console.log(bgStore.bgUrlState.value);
});
const bgStore = useBgStore();
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

// 소셜로그인
const socialLoginUrl = (socialType) => {
  console.log(socialType);
  return $.getSocialLoginUrl(socialType);
};
</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}
.container {
  width: 100vw;
  height: 100vh;
}
.userInfo {
  position: relative;
}
</style>
