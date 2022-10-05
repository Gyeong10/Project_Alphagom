import api from "@/api/api";
import axios from "axios";
import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
export const useAuthStore = defineStore("auth", () => {
  // state
  // const userInfo = ref(null); // 사용자 정보
  const userInfo = reactive({
    // 더미 데이터~~
    userId: 0,
    username: "",
    userNickname: "",
    email: "",
    profile:
      "https://item.kakaocdn.net/do/862539f7f2171437385154b3b749990f7154249a3890514a43687a85e6b6cc82",
    rank: 0,
  });
  const token = ref(localStorage.getItem("token") || "");
  const refreshToken = ref("");

  // getters
  const recentUserInfo = computed(() => userInfo);
  const recentToken = computed(() => token);
  // const isLoggedIn = computed(() => !!token.value);
  const isLoggedIn = true;
  const authHeader = computed(() =>
    token.value ? { Authorization: `Bearer ${token.value}` } : ""
  );

  // actions
  // 토큰 저장
  function saveToken(mytoken: string, myefreshToken: string) {
    token.value = mytoken;
    refreshToken.value = myefreshToken;
    localStorage.setItem("token", token.value);
  }
  // 사용자 정보 가져오기
  function fetchUserInfo() {
    axios({
      // url: api.user.getUser(userInfo.userId),
      url: "http://localhost:8080/api/be/user/" + `${userInfo.userId}`,
      method: "get",
      // headers: authHeader
      headers: authHeader.value.valueOf.prototype,
    })
      .then((res) => {
        console.log(res.data);
        // userInfo = res.data;
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  // 사용자 정보 수정 (일단 닉네임 인자만 수정해볼게용)
  function updateUserInfo(payload: string) {
    axios({
      url: api.user.postUserInfo(userInfo.value.userId),
      method: "put",
      // headers: authHeader
      headers: authHeader.value.valueOf.prototype,
      data: payload,
    })
      .then((res) => {
        userInfo.value.username = res.data.body.data;
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  // 로그아웃
  function logout() {
    token.value = token.value;
    localStorage.setItem("token", "");
  }

  return {
    // state
    userInfo,
    token,
    refreshToken,

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
  };
});
