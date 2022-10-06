<template>
  <div class="score-modal" tabindex="-1">
    <div class="modal-content">
      <br>
      <div class="modal-body">
        <div>축하합니다!</div>
        <!-- 점수 받아와야 됨 -->
        <div>{{ score }} 점입니다!</div>
      </div>
      <div class="modal-footer">
        <button
          @click="getNextStage()"
          class="next-btn"
          data-bs-dismiss="modal"
        >
          다음 탐험으로
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";
import { useRouter, useRoute } from "vue-router";

// store 사용
const store = useGameStore();
const authStore = useAuthStore();

// 점수 불러오기
const score = store.score;

// 라우터 사용
const route = useRoute();
const router = useRouter();

// 다음 스테이지로 넘어가기
// BE 에 점수 저장하는 API 호출
const getNextStage = () => {
  if (store.stage === "swamp") {
    store.saveScore(authStore.userInfo.userId, score, store.stage);
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "darkCaveStartView" });
  } else if (store.stage === "darkcave") {
    store.saveScore(authStore.userInfo.userId, score, 'cave');
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "skyStartView" });
  } else if (store.stage === "sky") {
    store.saveScore(authStore.userInfo.userId, score, store.stage);
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "EpilogueDialogView" });
  }
};
</script>

<style scoped>
.score-modal {
  height: 50vh;
  border-radius: 18px;
  border: 18px dashed #faf4bd;
  background-color: #94c178;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.modal-body {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>
