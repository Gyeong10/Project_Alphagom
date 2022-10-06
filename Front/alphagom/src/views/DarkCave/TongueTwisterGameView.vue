<template>
  <div>
    <div class="container-bg"></div>
    <!-- <div class="top-title">{{ stage.name }}</div> -->
    <div class="top-title">어둠의 동굴</div>
    <TongueTwisterGameModal v-if="Modal" />
    <PassorFail v-if="PassFail !='otherpicture' && PassFail" />
    <BackButton class="back-btn" />
    <Score class="bottom-score"></Score>
    <div class="score--">점</div>
    <div class="bottom-items">
      <PlayBar class="bottom-icons"></PlayBar>
    </div>

    <!--버튼-->
    <div>
      <div v-if="PassFail === 'passbutton' || PassFail == 'otherpicture'">
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
          계속하기
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
      <svg class="game-sentence-box" width="393" height="77" viewBox="0 0 393 77" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="2.5" width="388" height="72" rx="27.5" fill="#94C178" stroke="#FDF8E2" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"/>
      </svg>

      <div class="game-sentence-box">
        <h2 class="game-sectence-content">{{ GameList[probidx].sentance }}</h2>
      </div>
      <div class="game">
        <div v-if="!VoiceOnOff" @click="getRecord()">
          <img
            class="manul"
            src="/assets/image/manul_live.png"
            width="113"
            v-if="!PassFail || PassFail == 'failbutton'"
          />
          <img
            class="manul"
            src="/assets/image/manul_tan.png"
            width="113"
            v-if="PassFail == 'otherpicture'"
          />
          <div v-show="!Answer" class="game-howto">
            마늘을 누르고<br />
            보기 중
            <span class="game-howto" style="color: #ffb0b1; position: static"
              >정답</span
            >을 골라 말해줘!
          </div>
        </div>
        <!--TTS 버튼-->
        <button class="tts-btn" @click="startSpeechToTxt">
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5199 0.11474C19.9828 0.310115 20.3069 0.726933 20.39 1.21126L20.411 1.45833V33.5416C20.411 34.129 20.0586 34.6593 19.517 34.8865C19.0528 35.0813 18.5272 35.0208 18.1227 34.7404L17.9314 34.582L9.39829 26.1966H4.37381C2.10033 26.1966 0.231964 24.4614 0.0200224 22.243L0 21.8217V13.1038C0 10.8297 1.73464 8.96081 3.95258 8.74881L4.37381 8.72879H9.40191L17.9358 0.413728C18.3557 0.00457799 18.9798 -0.113197 19.5199 0.11474V0.11474ZM28.394 3.08927L28.6463 3.26077L28.9315 3.50743C29.1149 3.67231 29.368 3.91116 29.6677 4.22245C30.2664 4.84426 31.0554 5.7605 31.8427 6.95995C33.4184 9.36068 35 12.9189 35 17.5118C35 22.1049 33.4181 25.6579 31.8415 28.0533C31.0539 29.2501 30.2646 30.1636 29.6657 30.7833L29.2538 31.1944L28.7093 31.6872L28.6131 31.7663C27.9818 32.2665 27.0627 32.1618 26.5626 31.5306C26.1192 30.9706 26.1528 30.1854 26.6067 29.6662L26.9834 29.3235C27.1193 29.2019 27.3219 29.012 27.5692 28.7563C28.0646 28.2435 28.7344 27.4703 29.4062 26.4498C30.7478 24.4107 32.0841 21.4069 32.0841 17.5118C32.0841 13.6164 30.7478 10.6062 29.405 8.56067C28.8452 7.70759 28.2865 7.02626 27.8289 6.52478L27.3355 6.01065L26.7979 5.51652C26.169 5.01468 26.0637 4.09648 26.565 3.46669C27.0108 2.90661 27.7849 2.76213 28.394 3.08927V3.08927ZM25.4803 8.92231L25.7707 9.12571L26.1604 9.49244L26.318 9.65763C26.6489 10.0147 27.0758 10.5378 27.4986 11.2333C28.3486 12.632 29.1712 14.7128 29.1712 17.4957C29.1712 20.2786 28.3486 22.3617 27.4992 23.7623C27.077 24.4588 26.6501 24.9833 26.3194 25.3411L26.0233 25.6452L25.8184 25.8349L25.7024 25.9332L25.5173 26.0173C25.1313 26.1719 24.2286 26.424 23.6535 25.7043C23.2089 25.1479 23.2376 24.3659 23.6853 23.8446L24.0773 23.4677L24.1777 23.3619C24.395 23.1269 24.6985 22.7572 25.0061 22.2497C25.6173 21.2421 26.2553 19.6761 26.2553 17.4957C26.2553 15.3156 25.6173 13.7527 25.007 12.7484C24.7763 12.369 24.548 12.067 24.3569 11.8411L24.0792 11.5353L23.8794 11.3457C23.2534 10.8463 23.1504 9.93042 23.6514 9.30048C24.097 8.74022 24.8711 8.59542 25.4803 8.92231V8.92231Z" fill="#8BC34A"/>
          </svg>
        </button>
        <MicRecord class="game-count" v-if="VoiceOnOff" />
      </div>
    </div>
    <!--게임 그냥 넘어가는 디버깅 용도입니다~~~ 나중에 지우세요-->
    <button class="game-skip-btn real-skip-btn" @click="getNextPage()">건너뛰기</button>
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
import TongueTwisterGameModal from "@/views/Modal/HowTo/TongueTwisterGameModal.vue";
import PassorFail from "@/components/game/PassorFail.vue";

// 페이지가 렌더링 되자마자 마운트한다 (게임 받아오기)

onMounted(() => {
  store.getTongueGame();
  store.Modal = true
  store.Answer = null;
  // 배경 경로 수정
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/assets/image/cave_bg_picture_filter_low.png")';
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

// TTS
function startSpeechToTxt() {
  let utterance = new SpeechSynthesisUtterance(store.GameList[probidx.value].sentance);
  window.speechSynthesis.speak(utterance);
}

// true 값이면 녹음기가 켜진다 (MicRecord.Vue)
// 녹음 시간 주기
// Answer 다시 초기화
const getRecord = () => {
  store.RecordTime = 5000;
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
    
    const input = store.Answer.answer.replace(/[.*+?^${}()|[\]\\, ]/g, "")
    const ans = store.GameList[probidx.value].sentance.replace(/[.*+?^${}()|[\]\\, ]/g, "")

    if (ans === input && store.Answer) {
      store.PassFail = "pass";
      console.log('pass: ' + PassFail)
      console.log("입력 :", input)
      console.log("정답 :", ans)
    } else if (ans !== input && store.Answer) {
      store.PassFail = "fail";
      console.log('fail: ' + PassFail)
      console.log("입력 :", input)
      console.log("정답 :", ans)
    } else {
      store.PassFail = null;
      console.log('passfail else (null): ' + PassFail)
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
  store.scriptNum++
  router.push({
    name: "darkCaveDialogView",
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
  left: 410px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 62px;
  left: 266px;
  width: 393px;
  height: 77px;
}
.game-sectence-content {
  /* position: absolute;
  top: 86px;
  left: 299px; */
  width: 280px;
  margin-top: 2px;

  font-size: 18px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-weight: 800;
  white-space: normal;
  color: #594640;
  word-break: keep-all;
  text-align: center;
  line-height: 120%;
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
.manul {
  position: absolute;
  top: 185px;
  left: 405px;
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
.tts-btn {
  background-color: transparent;
  outline: none;
  border: none;

  position: absolute;
  top: 83px;
  left: 208px;
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
  border-radius: 30px;
  background-color: #faf4bd;
  color: #594640;
  font-size: 20px;
}
.real-skip-btn {
  position: absolute;
  top: 340px;
  left: 815px;
  width: 86px;
  height: 29px;

  background-color: #FAF4BD;
  font-size: 14px;
  font-weight: 700;
  color: #594640;
  text-align: center;
}
</style>
