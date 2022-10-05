<template>
  <div>
    <div class="container-bg"></div>
    <KingCureGameModal v-if="Modal" />
    <PassorFail v-if="PassFail" />
    <BackButton class="back-btn" />

    <!--버튼-->
    <div>
      <div v-if="PassFail === 'passbutton'">
        <button v-if="!GameEnd" @click="getProb()">
          다음 문제로 가보자구!
        </button>
        <button v-if="GameEnd" @click="getNextPage()">
          전부 통과! 축하해!
        </button>
      </div>
      <div v-if="PassFail === 'failbutton'">
        <button @click="getRecord()">다시 해보자!</button>
      </div>
    </div>
  </div>

  <!--문제 템플릿-->
  <div v-if="GameList">
    <div class="game-sentence">
      <h2>{{ GameList[probidx].sentance }}</h2>
    </div>
    <div
      class="game"
      v-for="(exam, idx) in GameList[probidx].example"
      :key="idx"
    >
      <h3>{{ exam }}</h3>
    </div>
    <div class="game">
      <div v-if="!VoiceOnOff" @click="getRecord()">
        <img
          v-if="GameList[0].sentance === '물을 ** 끓여 손질된 닭을 넣어요'"
          class="samgyetang"
          src="/assets/image/chicken_soup.png"
          width="200"
        />
        <img
          v-if="GameList[0].sentance === '물을 ** 끓여 된장을 넣어요'"
          class="dwenjangjjigae"
          src="/assets/image/dwenjangjjigae.png"
          width="200"
        />
        <div v-show="!Answer" class="game-howto">
          음식을 누르고<br />
          보기 중 정답을 골라 말해줘!
        </div>
      </div>
      <MicRecord class="game-count" v-if="VoiceOnOff" />
      <!--게임 그냥 넘어가는 디버깅 용도입니다~~~ 나중에 지우세요-->
      <button @click="getNextPage()">게임 스킵 버튼</button>
      <!---->
    </div>
    <div class="bottom-items">
      <PlayBar></PlayBar>
      <Score style="margin-top: 3px"></Score>
    </div>
  </div>
</template>

<script setup>
import MicRecord from "@/components/game/MicRecord.vue";
import { computed, ref, onMounted, watch } from "vue";
import { useGameStore } from "@/stores/game";
import { useRouter, useRoute } from "vue-router";
import { useBgStore } from "@/stores/bg";
import Score from "@/components/game/Score.vue";
import PlayBar from "@/components/game/PlayBar.vue";
import BackButton from "@/components/BackButton.vue";
import KingCureGameModal from "@/views/Modal/HowTo/KingCureGameModal.vue";
import PassorFail from "@/components/game/PassorFail.vue";

// 페이지가 렌더링 되자마자 마운트한다 (게임 받아오기)
onMounted(() => {
  store.getKingGame();
  // 배경 경로 수정
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/assets/image/chase_bg_picture_filter_low.png")';
  console.log(bgStore.bgUrlState.value);
});
// 스토어 가져오기
const store = useGameStore();
const bgStore = useBgStore();

// 라우터 사용
const route = useRoute();
const router = useRouter();

// 진입할 때 모달 창 띄우는 state
const Modal = computed(() => store.Modal);

// 내부 요소들 선언
const GameList = computed(() => store.GameList); // 의성어/의태어 구성 요소 (문제, 답) 저장
const VoiceOnOff = computed(() => store.VoiceOnOff); // 녹음기능 켜고(true) 끄는(false) 값 저장
const VoiceFile = computed(() => store.VoiceFile); // 녹음된 파일 들고오기
const Answer = computed(() => store.Answer); // Flask 에서 들고 온 플레이어의 답 저장
const score = computed(() => store.score); // 게임 점수 저장
const PassFail = computed(() => store.PassFail); // 정답, 오답 아이콘 띄우는 용, 초기화 필수
const probidx = ref(0); // BE 에서 받아온 문제들의 인덱스값

// (임시) 끝났을 때 라우트 주기 위한 state
const GameEnd = computed(() => store.GameEnd);

// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState);

// true 값이면 녹음기가 켜진다 (MicRecord.Vue)
// 녹음 시간 주기
// Answer 다시 초기화
const getRecord = () => {
  store.RecordTime = 1000;
  store.VoiceOnOff = true;
  store.Answer = null;
  store.PassFail = null;
};
// watch 로 녹음 파일 들어오는지 확인 후 바로 API 함수 실행
// Answer 값이 들어왔을 때 비교해서 정답 확인 함수 (view 내부에 작성) 실행
watch(VoiceFile, () => store.getKingAI(store.VoiceFile));
watch(Answer, () => compareAnswer());

// 정답비교하는 함수
const compareAnswer = () => {
  console.log(store.Answer);
  console.log(store.GameList[probidx.value].answer);
  if (store.GameList[probidx.value].answer === store.Answer && store.Answer) {
    store.PassFail = "pass";
  } else if (
    store.GameList[probidx.value].answer !== store.Answer &&
    store.Answer
  ) {
    store.PassFail = "fail";
  } else {
    store.PassFail = null;
  }
};

// 마지막 문제인지 확인하고, 정답 맞춘 후 다음 페이지로 라우트 시키기 위한 함수
// 계속 초기화 해주기!
const getProb = () => {
  probidx.value++;
  if (probidx.value + 1 === GameList.value.length) {
    store.Answer = null;
    store.GameEnd = true;
    store.PassFail = null;
  } else {
    store.Answer = null;
    store.PassFail = null;
  }
};

// 다시 에필로그 페이지로 렌더링
const getNextPage = () => {
  store.PassFail = null;
  router.push({
    name: "swampDialog",
    params: { scriptNum: store.scriptNum },
  });
};
</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}

.game {
  display: flex;
  justify-content: center;
}
.game-icon {
  font-size: 100px;
}
.game-sentence {
  display: flex;
  justify-content: center;
}
.game-howto {
  display: flex;
  justify-content: center;
}
.game-count {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.game-score {
  display: flex;
  justify-content: end;
  margin-right: 50px;
}
.bottom-items {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95vw;
  bottom: -20px;
  margin: 30px;
}
.back-btn {
  position: absolute;
  color: black;
  top: 24px;
  left: 884px;
}
</style>
