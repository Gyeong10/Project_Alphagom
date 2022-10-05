<template>
    <div class="modal" tabindex="-1">
        <div class="modal__modal-content">
            <!-- 모달 박스 -->
            <svg class="modal__modalbox" width="553" height="251" viewBox="0 0 553 251" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="2.5" width="548" height="246" rx="27.5" fill="#94C178" stroke="#FDF8E2" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"/>
            </svg>
            <!-- 모달 내용 -->
            <div class="modal__modal-body">
                <div class="modal__howto-title">의성어/의태어 게임</div>
                <div class="modal__howto-content">
                    <div class="modal__howto-content-regular">게임 방법을 알아볼까?</div>
                    <div style="height: 6px;" />
                    <div class="modal__howto-content-bold">의성어 의태어가 나올거야
                    <br>
                    답을 버튼을 누르고 읽으면 돼!</div>
                </div>
            </div>
            <!-- 버튼 -->
            <div class="modal__modal-footer">
                <button @click="gotoGame()" class="modal__next-btn" data-bs-dismiss="modal">시작하기</button>        
            </div>
        </div>
        <div class="modal__overlay" @click.self="$emit('close')"></div>
    </div>
</template>
  
<script setup>
import { useGameStore } from '@/stores/game'

// store 가져오기
const store = useGameStore()

// Modal 창 끄고 게임으로 넘어가기
const gotoGame = () => {
    store.Modal = false
}

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
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 800;
    white-space: nowrap;
    color: #FDF8E2;
    // text-shadow: -2px 0 #345A49, 0 2px #345A49, 2px 0 #345A49, 0 -2px #345A49;
    -webkit-text-stroke: 1.5px #345A49;

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
    color: #345A49;
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
    border: 5px solid #94C178;
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
}

</style>