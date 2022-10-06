<template>
  <!--마이크 컴포넌트-->
  <MicRecord v-if="VoiceOnOff" />
  <!--문장 못맞췄을 때 오답이야 뜨도록!-->
  <PassorFail v-if="PassFail" />
  <!--문장 디자인 수정~~~-->
  <svg class="game-sentence-box" v-if=" store.stage == 'MagicCastle' && store.script.type == 'sentance'"
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
  <svg class="game-sentence-box" v-if="store.stage == 'epilogue' && store.script.type == 'sentance'"
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
  <div class="game-sentence-box">
    <div class="game-sectence-content" v-if=" store.stage == 'MagicCastle' && store.script.type == 'sentance'">
      "이제 나의 손을 잡아 보아요."
    </div>
    <div class="game-sectence-content" v-if="store.stage == 'epilogue' && store.script.type == 'sentance'">
      "안녕은 영원한 헤어짐은 아니겠지요."
    </div>
  </div>

  <div v-if="!VoiceOnOff" class="common">
    <!-- <img v-if="store.imgBody" :src="store.getImgUrl(store.imgBody)" width="50">
        <img v-if="store.faceImg" :src="store.getImgUrl(store.faceImg)" width="50"> -->
    <!-- <img class="character-body-img" v-if="store.imgBody" :src="store.imgBody" alt="캐릭터 전신"> -->
    <div class="scriptText">
      <!-- <h1>{{ store.getImgUrl(game.textboxImg) }}</h1> -->
      <img
        class="character-body-img"
        v-if="store.imgBody"
        :src="store.imgBody"
        alt="캐릭터 전신"
      />
      <img
        class="text-box-img"
        :src="store.textboxImg"
        width="656"
        alt="대화상자"
      />
      <!--응, 아니 대답 선택지 띄우기-->
      <svg class="game-sentence-box" v-if="store.script.type == 'question' || store.script.type == 'check' "
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
      <div class="game-sentence-box" v-if="store.script.type == 'question' || store.script.type == 'check'">
        <div class="game-sectence-content">"응", "아니" 중 하나로 대답해 줘!</div>
      </div>

      <div class="script-char-name-box">
        <h1 class="script-char-name">{{ store.script.char }}</h1>
      </div>
      <!--조건 줘서 필요할 때만 이름 호출-->
      <p class="script-line1" v-if="store.script.type == 'check'">
        {{ Nickname }}!!
      </p>
      <p class="script-line1" v-if="store.script.type != 'check'">
        {{ store.script.line1 }}
      </p>
      <p class="script-line2">{{ store.script.line2 }}</p>
      <img
        class="character-face-img"
        v-if="store.imgFace"
        :src="store.imgFace"
        alt="캐릭터 표정"
      />
    </div>
    <div v-if="!store.isActive">
      <button class="script-btn" @click="store.plusNum()">다음대화</button>
      <button class="script-btn pass-btn" @click="store.skip()">
        건너뛰기
      </button>
    </div>
    <!--게임, 끝날 때 새로 버튼 만들어야 하나!-->
    <button
      class="script-btn answer-btn"
      v-if="store.isActive && store.script.type != 'game' && store.script.type != 'end'"
      @click="getRecord()"
    >
      대답하기 
    </button>
      
    <!--게임, 끝날 때 새로 버튼 만들었다!-->
      <button
      class="script-btn answer-btn"
      v-if="store.isActive && store.script.type == 'game'"
      @click="gotoNext()"
    >
      게임하기
    </button>
    <button
      class="script-btn answer-btn"
      v-if="store.isActive && store.script.type == 'end'"
      @click="gotoNext()"
    >
      점수보기
    </button>

  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import DarkcaveLine from "@/assets/dialog/DarkcaveLine.json";
import { useGameStore } from "@/stores/game";
import MicRecord from "@/components/game/MicRecord.vue";
import PassorFail from "@/components/game/PassorFail.vue";
import { useRouter, useRoute } from "vue-router";

const store = useGameStore();

const VoiceOnOff = computed(() => store.VoiceOnOff); // 녹음기능 켜고(true) 끄는(false) 값 저장
const VoiceFile = computed(() => store.VoiceFile); // 녹음된 파일 들고오기
const Answer = computed(() => store.Answer); // Flask 에서 들고 온 플레이어의 답 저장
const Nickname = computed(() => store.Nickname); // 별명 store 에 저장
const PassFail = computed(() => store.PassFail); // 정답인지 아닌지 판별 (MagicCastle 마지막 문장)

// true 값이면 녹음기가 켜진다 (MicRecord.Vue)
const getRecord = () => {
  store.VoiceOnOff = true;
};

// watch 로 녹음 파일 들어오는지 확인 후 바로 API 함수 실행
watch(VoiceFile, () => store.sendAIAPI(store.VoiceFile));
// watch 로 answer 들어오는지 확인 후 바로 대사 넘기기 함수 실행
watch(Answer, () => store.checkindex());

// 라우터 사용
const route = useRoute();
const router = useRouter();

// 페이지 넘어가기
function gotoNext() {
  if (store.script.type == 'game') {
    store.isActive = false;
    router.push({ name: store.stageGame[0] });
  } else if (store.script.type == 'end') {
    store.isActive = false;
    router.push({ name: "stageChangeView" })
  }
}

</script>

<style scoped>
.game-sentence-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 68px;
  left: 272px;
  width: 381px;
  height: 65px;
}
.game-sectence-content {
  /* position: absolute;
  top: 86px;
  left: 299px; */

  font-size: 20px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #594640;
}
.common {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.text-box-img {
  position: absolute;
  top: 231px;
  left: 135px;
}
.game-skip-btn {
  position: absolute;
  top: 0px;
  left: 700px;
  width: 112px;
  height: 40px;

  outline: none;
  border: none;
  border-radius: 15px;
  background-color: #94C178;
  cursor: pointer;

  font-size: 16px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-weight: 700;
  white-space: nowrap;
  color: #484E23;
}
/* .character-body-img {
    position: absolute;
    bottom: 325px;
    left: 200px;
    height: 300px;
} */
.script-char-name-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 242px;
  left: 169px;
  width: 124px;
}
.script-char-name {
  /* position: absolute;
  top: 243px;
  left: 187px; */
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}
.script-line1 {
  position: absolute;
  top: 290px;
  left: 185px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #483737;
  white-space: nowrap;
}
.script-line2 {
  position: absolute;
  top: 310px;
  left: 185px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #483737;
  white-space: nowrap;
}
.character-body-img {
  position: absolute;
  bottom: -348px;
  left: 200px;
  height: 300px;
}
.character-face-img {
  position: absolute;
  bottom: -298px;
  left: 666px;
  /* height: 300px; */
  width: 50px;
}
.script-btn {
  position: absolute;
  top: 302px;
  left: 630px;

  border: none;
  background-color: transparent;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #345a49;
  white-space: nowrap;
  padding: 0;
}
.script-btn:focus,
.script-btn:active {
  outline: none;
  box-shadow: none;
}
.pass-btn {
  position: absolute;
  top: 302px;
  left: 697px;
  color: #f48196;
}
.answer-btn {
  position: absolute;
  top: 332px;
  left: 663px;
}
</style>
