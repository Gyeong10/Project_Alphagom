<template>
  <div>
    <div class="container-bg"></div>
    <PassorFail v-if="passorfail" />
    <BackButton class="back-btn" />

    <!--버튼-->
    <div>
      <div v-if="passorfail === 'passbutton'">
        <button v-if="!nextpage" @click="getProb()">
          다음 문제로 가보자구!
        </button>
        <!-- <button v-else @click="getNextPage()">전부 통과! 축하해!</button> -->
      </div>
      <!-- <div v-if="passorfail === 'failbutton'">
        <button @click="getRecord()">다시 해보자!</button>
      </div> -->
    </div>

    <!--문제 템플릿-->
    <div v-if="problems">
      <div class="game-sentence">
        <h2>{{ problems[probidx].sentance }}</h2>
        <!-- <h2>{{ problems.sentance }}</h2> -->
        <!-- TTS 기능 -->
        <button class="tts" @click="startSpeechToTxt">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        </button>
      </div>
    </div>
  </div>

      <!-- <div class="bottom-items">
        <PlayBar></PlayBar>
        <Score style="margin-top: 3px"></Score>
      </div> -->
  
</template>

<script setup>
import MicRecord from "@/components/game/MicRecord.vue";
import { computed, ref, reactive, onMounted, watch } from "vue";
import { useGameStore } from "@/stores/game";
import { useRouter, useRoute } from "vue-router";
import { useBgStore } from "@/stores/bg";
import Score from "@/components/game/Score.vue";
import PlayBar from "@/components/game/PlayBar.vue";
import BackButton from "@/components/BackButton.vue";
import TongueTwisterGameModal from "@/views/Modal/HowTo/TongueTwisterGameModal.vue"
import PassorFail from "@/components/game/PassorFail.vue";

// 페이지가 렌더링 되자마자 마운트한다 (게임 받아오기)
onMounted(() => {
  // console.log(problems)
  // console.log(problems[probidx].sentance)
  store.getTongueGame();
  // 배경 경로 수정
  // store의 bgUrlState 값을 직접 변경
  // bgStore.bgUrlState = 'url("/assets/image/chase_bg_picture_filter_low.png")';
  // console.log(bgStore.bgUrlState.value);
});

// 스토어 가져오기
const store = useGameStore();
// const bgStore = useBgStore();

// 내부 요소들 선언
const problems = computed(() => store.GameList); // 잰말놀이 구성 요소 (문제) 저장
const probidx = ref(0); // BE 에서 받아온 문제들의 인덱스값

// tts 조건 설정
const state = reactive({
  lang: "ko-KR", // 언어 설정
  speaking: "",
})

// 마지막 문제인지 확인하고, 정답 맞춘 후 다음 페이지로 라우트 시키기 위한 함수
// 계속 초기화 해주기!
const getProb = () => {
  probidx.value++;
  if (probidx.value + 1 === problems.value.length) {
    store.Answer = null;
    store.GameEnd = true;
    store.PassFail = null;
  } else {
    store.Answer = null;
    store.PassFail = null;
  }
};

// TTS 기능
function startSpeechToTxt() {
  // start speech to txt
  let utterance = new SpeechSynthesisUtterance(problems.value.sentance)
  // let utterance = new SpeechSynthesisUtterance(problems[probidx].sentance)
  // utterance.rate = 1 // 말하는 속도
  window.speechSynthesis.speak(utterance)
}


</script>

<style scoped>
svg {
  width: 40px;
  height: 40px;
}
</style>