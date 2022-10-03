<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="userInfo">
      <ul>
        <li>
          <a :href="socialLoginUrl('kakao')">
            <!-- <div class="icon-box">
              <img src="/social/kakao-icon.svg" />
            </div> -->
            <p>카카오톡 계정으로 로그인</p>
          </a>
        </li>
        <li>
          <a :href="socialLoginUrl('naver')">
            <!-- <div class="icon-box">
              <img src="/social/naver-icon.png" />
            </div> -->
            <p>네이버 계정으로 로그인</p>
          </a>
        </li>
        <li>
          <a :href="socialLoginUrl('google')">
            <!-- <div class="icon-box">
              <img src="/social/google-icon.svg" />
            </div> -->
            <p>구글 계정으로 로그인</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
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
