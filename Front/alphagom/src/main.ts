import { createApp } from "vue";
// kakao sdk
import { createVueKakaoSdk } from 'vue3-kakao-sdk'

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App)
  .use(createPinia())
  .use(router)
  // 카카오 sdk
  .use(createVueKakaoSdk('a1a0bbf228bc6fd22de3b5b7ed715df2'))
  .mount("#app")
