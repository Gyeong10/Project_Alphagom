<template>
  <div class="box-cont">
    <div class="container-bg"></div>
    <text class="top-title">내 정보</text>
    <div class="box">
      <div class="box-header">
        <button
          class="btn-edit"
          @click="gameStore.updateModal()"
          style="cursor: pointer"
        >
          <svg
            class="btn-edit-svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.68476 11.1652L9.68484 5.16509L6.83491 2.31516L0.834833 8.31524C0.752189 8.39789 0.693435 8.50184 0.665026 8.61483L0 12L3.38453 11.335C3.49816 11.3066 3.60211 11.2478 3.68476 11.1652ZM11.6218 3.22812C12.1261 2.72386 12.1261 1.90646 11.6218 1.4022L10.5978 0.378193C10.0935 -0.126064 9.27614 -0.126064 8.77188 0.378193L7.74787 1.4022L10.5978 4.25213L11.6218 3.22812Z"
              fill="#325AA6"
            />
          </svg>
          <text class="btn-edit-text">수정</text>
        </button>
      </div>
      <div class="content tab-space">
        <!-- 유저 사진 -->
        <div class="my-avatar">
          <img :src="userInfo.profile" alt="" class="myphoto" />
        </div>
        <div class="text-box">
          <div class="card">
            <div class="card-body">
              <p class="user-nickname">{{ userInfo.userNickname }}</p>
              <p class="user-email">{{ userInfo.email }}</p>
              <p class="user-rank">{{ userInfo.rank }}위</p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="warning btn-logout"
        @click="logout"
        style="cursor: pointer"
      >
        로그아웃
      </button>
    </div>

    <!-- <MyPageUpdateModal v-model:updateModalOpen="updateModalOpen" /> -->
    <MyPageUpdateModal v-if="gameStore.Modal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import { storeToRefs } from "pinia";

import MyPageUpdateModal from "@/views/Modal/MyPageUpdateModal.vue";
// import { PencilAltIcon } from '@heroicons/vue/solid';
import { useBgStore } from "@/stores/bg";

// 배경 경로 수정
onMounted(() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/map_bg_picture_filter_low.png")';
  console.log(bgStore.bgUrlState.value);
  gameStore.updateModal()
});

// store 가져오기
const bgStore = useBgStore();
const gameStore = useGameStore();
const store = useAuthStore();

// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

// modal 띄우는 state
// const updateModalOpen = ref(false);
// console.log('오픈 전: updateModalOpen.value: ' + updateModalOpen.value)
// const Modal = computed(() => gameStore.Modal)

function openUpdateMypage() {
  // if (this.isLoggedIn){
  //   return this.mypageopen = !this.mypageopen
  //   }
  // else{
  //   alert('로그인이 필요합니다.')
  //   this.$router.push({ name: 'LoginView'})
  // }
  return (updateModalOpen.value = true);
  console.log('오픈 후: updateModalOpen.value: ' + updateModalOpen.value)

}

// function testFunc() {
//   this.store.fetchUserInfo()
//   console.log('testFunc 잘 가져왔나요?')
// }

function logout() {}

// 더미 데이터 잘 나오는지 테스트
const { userInfo } = storeToRefs(store);
console.log("userInfoTest:" + userInfo.value.profile);
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
.box-cont {
  display: flex;
  justify-content: center;
}
.top-title {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #483737;
  white-space: nowrap;
  position: absolute;
  top: 8px;
  left: 427px;
}
.box {
  position: absolute;
  top: 111px;
  left: 301px;
  width: 323px;
  height: 233px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.4);
}
.btn-edit {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-edit:hover, .btn-edit:active, .btn-edit:focus {
  border: 0 solid transparent;
  outline: 0;
}
.btn-edit-svg {
  margin-right: 5px;
}
.btn-edit-text {
  font-size: 14px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #325aa6;
  white-space: nowrap;
}

.myimg {
  width: 6rem;
  height: 6rem;
}

/* btn---- */
.btn-logout {
  padding: 0;
  margin: 10px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
  position: absolute;
  top: 170px;
  left: 106px;
}
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: var(--button-bg-color);
  color: var(--button-color);
  margin: 0;
  padding: 0.5rem 2rem;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-weight: 700;
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
  --button-bg-color: #ffb0b1;
  --button-hover-bg-color: #faf4bd;
  border: 3px solid #faf4bd;
  width: 112px;
  height: 36px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-weight: 700;
  white-space: nowrap;
}
button:active,
button:hover,
button:focus {
  background: var(--button-hover-bg-color);
  border: 3px solid #ffb0b1;
  outline: 0;
}
button:disabled {
  opacity: 0.5;
}
/* ----btn */

.content {
  display: flex;
  flex-flow: row;
  /* padding-top: 47px; */
  padding-left: 30px;
  top: 47px;
}

.box-header {
  position: absolute;
  padding-top: 25px;
  padding-left: 258px;
}

.card-body {
  display: flex;
  flex-flow: column;
  justify-content: center;
  /* align-items: center; */
}

.my-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 25px;
}

.myphoto {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.user-nickname {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-weight: 800;
  font-size: 24px;
  white-space: nowrap;
  color: #483737;
  margin-top: 10px;
}

.user-email {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-size: 14px;
  white-space: nowrap;
  color: #646464;
  margin-top: -5px;
}
.user-rank {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 1rem;
  font-size: 20px;
  white-space: nowrap;
  color: #646464;
}
</style>
