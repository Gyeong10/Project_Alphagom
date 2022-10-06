<template>
  <div></div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";

import axios from "axios";

const store = useAuthStore();
const route = useRoute();
const router = useRouter();

const codes = route.query.code;

function getToken() {
  console.log("code : " + codes);
  axios
    // .get("http://localhost:8080/api/be/klogin?authorize_code=" + codes)
    .get("https://j7d210.p.ssafy.io/api/be/klogin?authorize_code=" + codes)
    .then((res) => {
      console.log(res.data);
      store.userInfo.userId = res.data.id;
      store.saveToken(res.data.accessToken, res.data.refreshToken);
      store.fetchUserInfo();
      router.replace("/");
    });
}

if (codes) {
  getToken(codes);
}
</script>

<style scoped>
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}
</style>
