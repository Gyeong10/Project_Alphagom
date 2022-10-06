<template>
  <div class="modal" tabindex="-1">
    <div class="modal__modal-content">
      <!-- 모달 박스 -->
      <svg
        class="modal__modalbox"
        width="553"
        height="251"
        viewBox="0 0 553 251"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.5"
          y="2.5"
          width="548"
          height="246"
          rx="27.5"
          fill="#94C178"
          stroke="#FDF8E2"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="10 10"
        />
      </svg>
      <br>
      <!-- 모달 내용 -->
      <div class="modal__modal-body">
        <div class="modal__howto-title">축하합니다!</div>
        <div class="modal__howto-content">
          <div style="height: 6px"></div>
          <div class="modal__howto-content-bold">{{ score }} 점</div>
        </div>
      </div>
      <div class="modal__modal-footer">
        <button
          @click="getNextStage()"
          class="modal__next-btn"
          data-bs-dismiss="modal"
        >
          다음 탐험으로
        </button>
      </div>
    </div>
    <div class="modal__overlay" @click.self="$emit('close')"></div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import { useRouter, useRoute } from "vue-router";

// store 사용
const store = useGameStore();
const authStore = useAuthStore();

// 점수 불러오기
const score = store.score;

// 라우터 사용
const route = useRoute();
const router = useRouter();

// 다음 스테이지로 넘어가기
// BE 에 점수 저장하는 API 호출
const getNextStage = () => {
  if (store.stage === "swamp") {
    store.saveScore(authStore.userInfo.userId, score, store.stage);
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "darkCaveStartView" });
  } else if (store.stage === "darkcave") {
    store.saveScore(authStore.userInfo.userId, score, 'cave');
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "skyStartView" });
  } else if (store.stage === "sky") {
    store.saveScore(authStore.userInfo.userId, score, store.stage);
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "EpilogueDialogView" });
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  width: 553px;
  height: 251px;
  top: 95px;
  left: 186px;
  &__overlay {
    position: absolute;
    top: -100px;
    left: -190px;
    width: 100vw;
    height: 100vh;

    background-color: black;
    opacity: 0.5;
    // z-index: 1;
  }
  &__modal-content {
    z-index: 1;
    // z-index: 2;
  }
  &__modal-body {
    display: flex;
    flex-flow: column;
    position: absolute;
  }
  &__howto-title {
    font-size: 32px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 800;
    white-space: nowrap;
    color: #FDF8E2;
    // text-shadow: -2px 0 #345A49, 0 2px #345A49, 2px 0 #345A49, 0 -2px #345A49;
    -webkit-text-stroke: 1.5px #34435A;

    position: absolute;
    top: -235px;
    left: 158px;
  }
  &__howto-content {
    font-size: 20px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 500;
    white-space: nowrap;
    color: #34435A;
    text-align: center;
    line-height: 110%;

    position: absolute;
    top: -175px;
    left: 135px;
  }
  &__howto-content-bold {
    font-size: 60px;
    font-weight: 800;
  }
  &__next-btn {
    position: absolute;
    top: -87px;
    left: 202px;
    width: 149.17px;
    height: 48px;
    /* margin-left: 19px; */

    outline: none;
    border: 5px solid #94c178;
    border-radius: 30px;
    background-color: #FAF4BD;
    cursor: pointer;
    box-shadow: 1px 1px 3px 1px gray;

    font-size: 20px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 700;
    white-space: nowrap;
    color: #594640;
  }



  /* height: 50vh;
  border-radius: 18px;
  border: 18px dashed #faf4bd;
  background-color: #94c178; */

  /* display: flex;
  justify-content: center;
  align-items: center; */
}

</style>
