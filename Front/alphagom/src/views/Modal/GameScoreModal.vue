<template>
  <div class="score-modal" tabindex="-1">
    <div class="modal-content">
      <br />
      <div class="modal-body">
        <ul>
          <li>축하합니다!</li>
          <!-- 점수 받아와야 됨 -->
          <li>{{ score }} 점입니다!</li>
        </ul>
      </div>
      <div class="modal-footer">
        <button
          v-if="store.stage.value !== 'sky'"
          @click="getNextStage()"
          class="next-btn"
          data-bs-dismiss="modal"
        >
          다음 탐험으로
        </button>
        <button
          v-if="store.stage.value === 'sky'"
          @click="getNextStage()"
          class="next-btn"
          data-bs-dismiss="modal"
        >
          순위 보기!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { useRouter, useRoute } from "vue-router";

// store 사용
const store = useGameStore();

// 점수 불러오기
const score = store.score;

// 라우터 사용
const route = useRoute();
const router = useRouter();

// 다음 스테이지로 넘어가기
// BE 에 점수 저장하는 API 호출
const getNextStage = () => {
  console.log(store.stage);
  if (store.stage === "swamp") {
    // Swamp 점수 저장
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "darkCaveStartView" });
  } else if (store.stage === "darkcave") {
    // darkcave 점수 저장
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "skyStartView" });
  } else if (store.stage === "sky") {
    // sky 점수저장
    store.score = 3000;
    store.scriptNum = 0;
    router.push({ name: "rank" });
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
