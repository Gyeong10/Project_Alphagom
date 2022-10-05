<template>
  <transition name="modal" appear>
    <section class="modal" tabindex="-1" appear>
      <div class="modal__modal-content">
        <!-- 모달 박스 -->
        <svg class="modal__modalbox" width="553" height="251" viewBox="0 0 553 251" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="548" height="246" rx="27.5" fill="#FDF8E2" stroke="#94C178" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"/>
        </svg>
        <!-- 창닫기 버튼 -->
        <div class="modal__modal-header">
          <button
            @click="gameStore.updateModal()" 
            class="modal__btn-close" data-bs-dismiss="modal"
            aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8636 9L17.4069 3.45662C18.1977 2.66586 18.1977 1.38382 17.4069 0.593066C16.6161 -0.197689 15.3342 -0.197689 14.5434 0.593066L9 6.13645L3.45662 0.593066C2.66586 -0.197689 1.38382 -0.197689 0.593066 0.593066C-0.197689 1.38382 -0.197689 2.66586 0.593066 3.45662L6.13645 9L0.593066 14.5434C-0.197689 15.3341 -0.197689 16.6162 0.593066 17.4069C0.988443 17.8023 1.50663 18 2.02482 18C2.54301 18 3.06124 17.8023 3.45658 17.4069L9 11.8636L14.5434 17.4069C14.9388 17.8023 15.4569 18 15.9751 18C16.4933 18 17.0115 17.8023 17.4069 17.4069C18.1976 16.6162 18.1976 15.3341 17.4069 14.5434L11.8636 9Z" fill="#484E23"/>
            </svg>
          </button>
        </div>
        <br>
        <!-- 모달 내용 -->
        <div class="modal__modal-body">
          <div class="modal__update-title">별명 수정</div>
          <div class="modal__update-input-cont">
            <input
              class="modal__update-input" 
              type="email"
              v-model="nick"
              placeholder="10자 이하로 입력해주세요."
              @change="setNick"
            >
            <button class="modal__update-btn" @click="updateNick">수정하기</button>
          </div>
        </div>
      </div>
      <div class="modal__overlay" @click.self="$emit('close')"></div>
    </section>
  </transition>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import { storeToRefs } from "pinia";
// import { ref, computed } from 'vue';

const store = useAuthStore();
const gameStore = useGameStore();
// const Modal = computed(() => gameStore.Modal)

const nick = ref('')
let inputText = ref('')

const UpdateMyPageClose = () => {
  console.log(this.updateModalOpen)
  context.emit('update:updateModalOpen', false)
    
}

const setNick = (e) => {
    // nick = e.target.value
    inputText = e.target.value
}

const { userInfo } = storeToRefs(store);
const updateNick = () => {
  // store.updateUserInfo(inputText)
  userInfo.userNickname = inputText
  console.log(inputText)
  console.log(userInfo.userNickname)
  // console.log(userInfo.value.username)
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
    width: 120vw;
    height: 120vh;

    background-color: black;
    opacity: 0.5;
  }
  &__modal-content {
    z-index: 1;
  }
  &__btn-close {
    background-color: transparent;
    border: 0;
    outline: 0;
    padding: 0;
    cursor: pointer;

    position: absolute;
    top: -230px;
    left: 505px;
    z-index: 50;
  }
  &__btn-close:hover, &__btn-close:active, &__btn-close:focus {
    border: 0 solid transparent;
    outline: 0;
  }

  &__modal-body {
    display: flex;
    flex-flow: column;
    position: absolute;
  }
  &__update-title {
    font-size: 32px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 800;
    white-space: nowrap;
    color: #345A49;

    position: absolute;
    top: -231px;
    left: 215px;
  }

  input {
    position: absolute;
    top: -150px;
    left: 96px;

    font-size: 20px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 400;
    white-space: nowrap;
    color: #C2C2C2;

    border-radius: 15px;
    width: 231px;
    height: 40px;
    border: 1px solid #ECECEC;
    outline: none;
    padding: 14px 10px 14px 10px;
    transition: .3s; /*서서히 나타내기*/
  }
  /*포커스 되었을 때*/

  input:focus {
    width: 231px;
    border: 2px solid #94C178;
    box-shadow:0 0 8px 0 #94C178;
    color: #345A49;
  }

  &__update-btn {
    position: absolute;
    top: -150px;
    left: 346px;
    width: 112px;
    height: 40px;
    /* margin-left: 19px; */

    outline: none;
    border: none;
    border-radius: 15px;
    background-color: #94C178;
    cursor: pointer;

    font-size: 16px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
    font-weight: 700;
    white-space: nowrap;
    color: #484E23;
  }
}

// .modal-box {
//   width: 553px;
//   height: 251px;
//   /* z-index: 90; */
//   /* display: flex;
//   justify-content: center;
//   align-items: center; */

//   position: absolute;
//   top: 88px;
//   left: 186px;
// }



</style>