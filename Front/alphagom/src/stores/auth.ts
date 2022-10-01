import api from "@/api/api";
import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
// export const useAuthStore = defineStore("auth", () => {
  // state
  // const userInfo = ref(null); // 사용자 정보
  // const token = ref(localStorage.getItem("token") || "");

  // getters
  // const recentUserInfo = computed(() => userInfo);
  // const recentToken = computed(() => token);
  // const isLoggedIn = computed(() => !!token.value);
  // const authHeader = computed(() => token.value ? { Authorization: `Bearer ${token.value}` } : "");

  // actions
  // function fetchUserInfo() {
    // console.log('userInfo.value: ' + userInfo.value)
    // console.log('recentUserInfo.value: ' + recentUserInfo.value)
    // console.log('recentUserInfo.effect: ' + recentUserInfo.effect.active)

    // console.log('prototype: ' + authHeader.value.valueOf.prototype)
    // console.log('toString: ' + authHeader.value.toString)
    // console.log('authHeader: ' + authHeader.value)

    // axios({
      // url: api.user.getUser(userInfo.value.userId),
      // url: "http://localhost:8080/api/be/user/1234",
      // method: 'get',
      // headers: authHeader
      // headers: authHeader.value.valueOf.prototype,
    // })
      // .then(res => {
      //   userInfo.value = res.data.body.data;
      // })
      // .catch(err => {
      //   console.error(err.response);
      // });
  // }

//   return {
//     // state
//     userInfo,
//     token,

//     // getters
//     recentUserInfo,
//     recentToken,
//     isLoggedIn,
//     authHeader,

//     // actions
//     fetchUserInfo,
//   }
// });
