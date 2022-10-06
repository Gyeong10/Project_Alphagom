import { createRouter, createWebHistory } from "vue-router";
import { computed } from "vue";
import authRouter from "./authRouter";
import gameRouter from "./gameRouter";
import { useAuthStore } from "@/stores/auth";

import HomeView from "@/views/HomeView.vue";
import MyPageView from "@/views/MyPageView.vue";
import RankView from "@/views/RankView.vue";
// import SettingView from "@/views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRouter,
    ...gameRouter,
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPageView,
    },
    {
      path: "/rank",
      name: "rank",
      component: RankView,
    },
    // {
    //   path: "/setting",
    //   name: "setting",
    //   component: SettingView,
    // },
  ],
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   const isLoggedIn = computed(() => authStore.isLoggedIn);
//   // 로그인되어 있지 않으면
//   if (
//     !isLoggedIn.value &&
//     to.name !== "login" &&
//     to.name !== "OAuthRedirectView"
//   ) {
//     console.log("isLoggedIn", isLoggedIn.value, "to.name", to.name);
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

export default router;
