<template>
  <div>
    <div class="userInfo">
      <h3>이름</h3>
      <input 
        type="text"
        v-model="form.name"
        required
        >
      <h3>이메일</h3>
      <input 
        type="text"
        v-text="form.email"
        v-model="form.email"
        required
        disabled
        >
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";


import axios from "axios";

const store = useAuthStore();
const route = useRoute();
const router = useRouter();

const codes = route.query.code;
const form = ref({
  password: "",
  email: "",
  name: "",
});

function getToken() {
  console.log("code : " + codes)
  axios
    .get("http://localhost:8080/api/be/klogin?authorize_code=" + codes)
    .then((res) => {
      console.log(res.data);
      form.value.email = res.data.email;
      form.value.password = res.data.id;
      if (form.value.password == undefined) {
        alert("잘못된 접근");
        router.replace("/");
      } else {
        alert("성공");
      }
    })
}

if (codes) {
  getToken(codes);
}


// if (token) {
//   store.saveToken(token);
//   store.fetchUserInfo();
// }
// router.replace("/");
</script>

<style scoped>
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}
</style>
