<template>
  <div class="container">
    <p>내 정보</p>
    {{ testFunc() }}
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const store = useAuthStore();
function testFunc() {
  // this.store.fetchUserInfo()
  console.log('testFunc 잘 가져왔나요?')
}

// 더미 데이터 잘 나오는지 테스트
const { userInfo } = storeToRefs(store)
console.log("userInfoTest:" + userInfo.value.profile)

</script>


<style scoped>
  
</style>