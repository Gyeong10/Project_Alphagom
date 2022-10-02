<template>
  <div class="container">
    <div class="container-bg"></div>
    <p>내 정보</p>
    <!-- {{ testFunc() }} -->
    <div class="container2">
      <div class="box">
        <!-- <div class="px-4 py-5 flex-auto"> -->
        <div class="box-header">
          <button @click="openUpdateMypage" style="cursor: pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            수정
          </button>
        </div>
        <div class="content tab-space">
          <!-- 유저 사진 -->
          <div class="my-avatar">
            <img :src="userInfo.profile" alt="" class="myphoto">
            <!-- <img src="@/assets/image/alphagom_look_normal.png" alt="프사" class="myimg"> -->
          </div>
          <div class="text-box">
            <!-- <div class="update-btn"> -->

            <!-- </div> -->
            <!-- <br>
            <br> -->
            <div class="card">
              <div class="card-header">
                
              </div>
              <div class="card-body">
                <p>닉네임 : {{ userInfo.userNickname }}</p>
                <p>이메일 : {{ userInfo.email }}</p>
                <p>순위 : {{ userInfo.rank }}위</p>
              </div>
              
            </div>
          </div>
        </div>
        <!-- <br> -->
        <button @click="logout" style="cursor: pointer">로그아웃</button>
        <!-- </div> -->
      </div>
    </div>

    <!-- <MyPageUpdateModal v-model:updateModalOpen="updateModalOpen"/> -->
    <!-- <transition name="bounce" mode="out-in"> -->
      <MyPageUpdateModal></MyPageUpdateModal>
    <!-- </transition> -->

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

import MyPageUpdateModal from '@/views/Modal/MyPageUpdateModal.vue'
// import { PencilAltIcon } from '@heroicons/vue/solid';
import { useBgStore } from "@/stores/bg"

// 배경 경로 수정
onMounted (() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/map_bg_picture_filter_low.png")'
  console.log(bgStore.bgUrlState.value)
})
const bgStore = useBgStore()
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState)

const store = useAuthStore();
const updateModalOpen = ref(false)


function openUpdateMypage() {
  // if (this.isLoggedIn){
  //   return this.mypageopen = !this.mypageopen
  //   }
  // else{
  //   alert('로그인이 필요합니다.')
  //   this.$router.push({ name: 'LoginView'})
  // }
  return (updateModalOpen.value = true)

}

// function testFunc() {
//   this.store.fetchUserInfo()
//   console.log('testFunc 잘 가져왔나요?')
// }


function logout() {
  

}

// 더미 데이터 잘 나오는지 테스트
const { userInfo } = storeToRefs(store)
console.log("userInfoTest:" + userInfo.value.profile)

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
.box {
  position: absolute;
  width: 300px;
  height: 260px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

}

.box {
  /* position: absolute; */
  left: 240px;

  width: 400px;
  height: 300px;
  /* display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center; */

  border-radius: 18px;
  background: rgba(255, 255, 255, 0.4);
  /* color:white; */

}
  
.myimg {
  width: 6rem;
  height: 6rem;
}

svg {
  width: 1rem;
  height: 1rem;
}

.content {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

}

button {
  background: rgba(255, 255, 255, 0);
  border: none;
}

.box-header {
  padding: 16px;
  /* justify-content: end; */
  /* align-items: flex-end; */
}

.card-body {
  display: flex;
  flex-flow: column;
  justify-content: center;
  /* align-items: center; */

}

.my-avatar {
  padding-right: 18px;
}

.myphoto {
  width: 80px;
  height: 80px;

}

</style>