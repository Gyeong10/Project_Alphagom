import api from "@/api/api";
import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
export const useAuthStore = defineStore("auth", () => {
  // state
  // const userInfo = ref(null); // 사용자 정보
  const userInfo = ref({ // 더미 데이터~~
    userId: 7,
    username: '이미현',
    userNickname: '이면',
    email: 'alphagom@ssafy.com',
    profile: 'https://www.snsboom.co.kr/common/img/default_profile.png',
    rank: '100',
  })
  const token = ref(localStorage.getItem("token") || "");

  // getters
  const recentUserInfo = computed(() => userInfo);
  const recentToken = computed(() => token);
  // const isLoggedIn = computed(() => !!token.value);
  const isLoggedIn = true;
  const authHeader = computed(() => token.value ? { Authorization: `Bearer ${token.value}` } : "");

  // actions
  // 토큰 저장
  function saveToken() {
    token.value = token.value
    localStorage.setItem("token", token.value)
  }
  // 사용자 정보 가져오기
  function fetchUserInfo() {
    axios({
      url: api.user.getUser(userInfo.value.userId),
      // url: "http://localhost:8080/api/be/user/1234",
      method: 'get',
      // headers: authHeader
      headers: authHeader.value.valueOf.prototype,
    })
      .then(res => {
        userInfo.value = res.data.body.data;
      })
      .catch(err => {
        console.error(err.response);
      });
  }

  // 사용자 정보 수정 (일단 닉네임 인자만 수정해볼게용)
  function updateUserInfo(payload: string) {
    axios({
      url: api.user.postUserInfo(userInfo.value.userId),
      method: 'put',
      // headers: authHeader
      headers: authHeader.value.valueOf.prototype,
      data: payload,
    })
      .then(res => {
        userInfo.value.username = res.data.body.data;
      })
      .catch(err => {
        console.error(err.response);
      });
  }

  // 로그아웃
  function logout() {
    token.value = token.value
    localStorage.setItem('token', '')

  }

  return {
    // state
    userInfo,
    token,

    // getters
    recentUserInfo,
    recentToken,
    isLoggedIn,
    authHeader,

    // actions
    saveToken,
    fetchUserInfo,
    updateUserInfo,
    logout,
  }
});
