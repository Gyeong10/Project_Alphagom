<template>
  <div>
    <div class="container-bg"></div>
    <!-- <div class="top-title">{{ stage.name }}</div> -->
    <div class="top-title">하늘</div>
    <BirdProverbGameModal v-if="Modal" />
    <PassorFail v-if="PassFail" />
    <BackButton class="back-btn" />
    <Score class="bottom-score"></Score>
    <div class="score--">점</div>
    <div class="bottom-items">
      <PlayBar class="bottom-icons"></PlayBar>
    </div>

    <!--버튼-->
    <div>
      <div v-if="PassFail === 'passbutton'">
        <button
          class="game-skip-btn again-btn"
          v-if="!GameEnd"
          @click="getProb()"
        >
          다음문제
        </button>
        <button
          class="game-skip-btn again-btn"
          v-if="GameEnd"
          @click="getNextPage()"
        >
          전부통과
        </button>
      </div>
      <div v-if="PassFail === 'failbutton'">
        <button class="game-skip-btn again-btn" @click="getRecord()">
          다시하기
        </button>
      </div>
    </div>
  </div>

  <!--문제 템플릿-->
  <div v-if="GameList">
    <svg
      class="game-sentence-box"
      width="393"
      height="77"
      viewBox="0 0 393 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.5"
        y="2.5"
        width="388"
        height="72"
        rx="27.5"
        fill="#94C178"
        stroke="#FDF8E2"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="10 10"
      />
    </svg>
    <div class="game-sentence">
      <h2 class="game-sectence-content">{{ GameList[probidx].sentance }}</h2>
    </div>
    <div
      class="game"
      v-for="(exam, idx) in GameList[probidx].example"
      :key="idx"
    >
      <div v-if="idx == 0" class="game-ex ex-1">{{ exam }}</div>
      <div v-if="idx == 1" class="game-ex ex-2">{{ exam }}</div>
      <div v-if="idx == 2" class="game-ex ex-3">{{ exam }}</div>
      <div v-if="idx == 3" class="game-ex ex-4">{{ exam }}</div>
    </div>
    <div class="game">
      <div v-if="!VoiceOnOff" @click="getRecord()">
        <!--그림자 넣기!!-->
        <!--CSS 수정 부타케-->
        <img
          class="samgyetang"
          src="/assets/image/chicken_soup.png"
          width="152"
          v-if="!PassFail || PassFail == 'failbutton'"
        />
        <img
          class="sparrow"
          src="/assets/image/sparrow.png"
          width="152"
          v-if="PassFail == 'pass' && GameList[probidx].answer == '참새'"
        />
        <img
          class="pheasant"
          src="/assets/image/pheasant.png"
          width="152"
          v-if="PassFail == 'pass' && GameList[probidx].answer == '꿩'"
        />
        <img
          class="crow"
          src="/assets/image/crow.png"
          width="152"
          v-if="PassFail == 'pass' && GameList[probidx].answer == '까마귀'"
        />
        <div v-show="!Answer" class="game-howto">
          그림자를 누르고<br />
          보기 중
          <span class="game-howto" style="color: #ffb0b1; position: static"
            >정답</span
          >을 골라 말해줘!
        </div>
      </div>
      <MicRecord class="game-count" v-if="VoiceOnOff" />
    </div>
    <!--게임 그냥 넘어가는 디버깅 용도입니다~~~ 나중에 지우세요-->
    <button class="game-skip-btn" @click="getNextPage()">게임 스킵 버튼</button>
    <!---->
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
import BirdProverbGameModal from "@/views/Modal/HowTo/BirdProverbGameModal.vue";
import PassorFail from "@/components/game/PassorFail.vue";

// 페이지가 렌더링 되자마자 마운트한다 (게임 받아오기)
onMounted(() => {
  store.getBirdGame();
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
watch(VoiceFile, () => store.sendAIAPI(store.VoiceFile));
watch(Answer, () => compareAnswer());

// 정답비교하는 함수
const compareAnswer = () => {
  if (store.Answer) {
    if (
      store.GameList[probidx.value].answer === store.Answer.answer &&
      store.Answer
    ) {
      store.PassFail = "pass";
    } else if (
      store.GameList[probidx.value].answer !== store.Answer.answer &&
      store.Answer
    ) {
      store.PassFail = "fail";
    } else {
      store.PassFail = null;
    }
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
    name: "skyDialogView",
    params: { scriptNum: store.scriptNum },
  });
};
</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  /* 위 필터는 모바일 브라우저 대비 */
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}
.back-btn {
  position: absolute;
  top: 20px;
  left: 884px;
}
.bottom-score {
  position: absolute;
  top: 370px;
  left: 800px;
  /* margin: 0; */
  text-align: end;
}
.score-- {
  position: absolute;
  top: 370px;
  left: 878px;
  color: #faf4bd;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  white-space: nowrap;
}
.top-title {
  position: absolute;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  top: 8px;
  left: 452px;
  white-space: nowrap;
}
.bottom-items {
  position: absolute;
}
.bottom-icons {
  width: 95vw;
  top: 377px;
  left: 30px;
}

.game {
  /* display: flex;
  justify-content: center; */
}
.game-sentence-box {
  position: absolute;
  top: 62px;
  left: 266px;
  width: 393px;
  height: 77px;
}
.game-sectence-content {
  position: absolute;
  top: 86px;
  left: 299px;

  font-size: 20px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #594640;
}
.game-ex {
  font-size: 20px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #594640;
  text-align: center;
  padding-top: 2px;

  position: absolute;
  width: 100px;
  height: 34px;
  background-color: #f2f9ff;
  border-radius: 5px;
}
.ex-1 {
  /* 팔팔 */
  position: absolute;
  top: 202px;
  left: 156px;
}
.ex-2 {
  /* 풀풀 */
  position: absolute;
  top: 269px;
  left: 156px;
}
.ex-3 {
  /* 턱턱 */
  position: absolute;
  top: 202px;
  left: 672px;
}
.ex-4 {
  /* 송송 */
  position: absolute;
  top: 269px;
  left: 672px;
}
.samgyetang,
.dwenjangjjigae {
  position: absolute;
  top: 183px;
  left: 388px;
}
.game-howto {
  position: absolute;
  top: 323px;
  left: 335px;

  font-size: 24px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #fff;
  text-align: center;
  line-height: 29px;
}
.game-count-content {
  position: absolute;

  font-size: 20px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #594640;
}
/* 스킵버튼입니다 지워질 예정인 듯 */
.game-skip-btn {
  position: absolute;
  top: 0px;
  left: 700px;
  width: 112px;
  height: 40px;

  outline: none;
  border: none;
  border-radius: 15px;
  background-color: #94c178;
  cursor: pointer;

  font-size: 16px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 700;
  white-space: nowrap;
  color: #484e23;
}
.again-btn {
  position: absolute;
  top: 342px;
  left: 387px;
  width: 149.17px;
  height: 48px;

  border: 5px solid #94c178;
  background-color: #faf4bd;
  color: #594640;
}
</style>
