<template>
    <div class="modal" tabindex="-1">
        <div class="modal__modal-content">
        <!-- 모달 박스 -->
        <svg width="553" height="251" viewBox="0 0 553 251" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="548" height="246" rx="27.5" fill="#BC78C1" stroke="#FDF8E2" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"/>
        </svg>
        <!-- 모달 내용 -->
        <div class="modal__modal-body">
            <div class="modal__howto-title">새 속담 게임</div>
            <div class="modal__howto-content">
                <div class="modal__howto-content-regular">
                  견우와 직녀가 만날 수 있도록 새 다리를 만들어주며
                  <br>
                  새 이름이 들어간 한국의 속담들을 알아보자구!
                </div>
                <div style="height: 6px;" />
                <div class="modal__howto-content-bold">물음표에 들어갈 단어를 말하면 돼!</div>
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
  store.minusScore()
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
    z-index: 1;
  }
  &__modal-content {
    z-index: 2;
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
    -webkit-text-stroke: 1.5px #55345A;

    position: absolute;
    top: -235px;
    left: 200px;
  }
  &__howto-content {
    font-size: 20px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 500;
    white-space: nowrap;
    color: #55345A;
    text-align: center;
    line-height: 110%;

    position: absolute;
    top: -175px;
    left: 157px;
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
    border: 5px solid #BC78C1;
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
    color: #55345A;
  }
}
</style>