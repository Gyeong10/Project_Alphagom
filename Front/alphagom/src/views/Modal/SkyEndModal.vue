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
        <!-- 모달 내용 -->
        <div class="modal__modal-body">
          <div class="modal__howto-title">축하합니다!</div>
          <div class="modal__howto-content">
            <div class="modal__howto-content-regular">
              이제 탐험이 끝났어!
            </div>
            <div style="height: 6px" />
            <div class="modal__howto-content-bold">
              탐험하는 동안 즐거웠어!
              <br />
              다시 볼 수 있으면 좋겠다!
            </div>
          </div>
        </div>
        <!-- 버튼 -->
        <div class="modal__modal-footer">
          <button
            @click="gotoPage('map')"
            class="modal__next-btn"
            data-bs-dismiss="modal"
          >
            탐험 지도로
          </button>
        </div>
        <div class="modal__modal-footer">
          <button
            @click="gotoPage('rank')"
            class="modal__next-btn"
            data-bs-dismiss="modal"
          >
            순위보기
          </button>
          <div class="modal__modal-footer">
          <button
            @click="gotoPage('home')"
            class="modal__next-btn"
            data-bs-dismiss="modal"
          >
            홈으로
          </button>
        </div>
      </div>
      <div class="modal__overlay" @click.self="$emit('close')"></div>
    </div>
  </template>
  
  <script setup>
  import { useGameStore } from "@/stores/game";
  import { useRouter, useRoute } from "vue-router";
  
  // store 가져오기
  const store = useGameStore();
  
  const route = useRoute();
  const router = useRouter();
  
  // Modal 창 끄고 버튼에 따라 넘어가기
  const gotoPage = (data) => {
    if (data == "map") {        
        store.scriptNum = 0;
        router.push({ name: "mapView" });
    } else if (data == "rank") {
        store.scriptNum = 0;
        router.push({ name: "rank" });
    } else if (data == "home") {
        store.scriptNum = 0;
        router.push({ name: "rank" });
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
    }
    &__modal-content {
      z-index: 1;
    }
    &__modal-body {
      display: flex;
      flex-flow: column;
      position: absolute;
    }
    &__howto-title {
      font-size: 32px;
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
        "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #fdf8e2;
      // text-shadow: -2px 0 #345A49, 0 2px #345A49, 2px 0 #345A49, 0 -2px #345A49;
      -webkit-text-stroke: 1.5px #345a49;
  
      position: absolute;
      top: -235px;
      left: 158px;
    }
    &__howto-content {
      font-size: 20px;
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
        "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", sans-serif;
      font-weight: 500;
      white-space: nowrap;
      color: #345a49;
      text-align: center;
      line-height: 110%;
  
      position: absolute;
      top: -175px;
      left: 158px;
    }
    &__howto-content-bold {
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
      background-color: #faf4bd;
      cursor: pointer;
      box-shadow: 1px 1px 3px 1px gray;
  
      font-size: 20px;
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
        "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", sans-serif;
      font-weight: 700;
      white-space: nowrap;
      color: #594640;
    }
  }
  </style>
  