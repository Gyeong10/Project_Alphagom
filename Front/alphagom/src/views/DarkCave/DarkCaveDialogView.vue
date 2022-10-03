<template>
  <div>
    <CommonDialog></CommonDialog>
    <div>
      <h1>Text to Speech</h1>
      <!-- <div v-for="pl in StagePrologue.prologue"
        v-model="pl"> -->
      <!-- 대사를 순서대로 어떻게 나타낼 것인가 -->
      <!-- {{pl.line1}}
        {{pl.line2}}
      </div> -->
      <div>
        <!-- <input 
          type="text"
          v-model="word"
          placeholder="여기에 입력하세요"
          @keyup="setWord"> -->
        <button id="tts" @click="startSpeechToTxt">음성출력</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useGameStore } from "@/stores/game";
import CommonDialog from "@/components/game/CommonDialog.vue";
// import StagePrologue from '@/assets/SkyLine.json'

const game = useGameStore();
game.setStage("darkcave");

const state = reactive({
  lang: "ko-KR",
  speaking: "",

  // tts 인식 안됨
  // sentence2: "반가워",

  // word: "",
  // StagePrologue: StagePrologue
  // voiceList: []
});

const sentence1 = "간장공장공장장";

// TTS 기능
// const pl = '';
const startSpeechToTxt = () => {
  // start speech to txt
  let utterance = new SpeechSynthesisUtterance(sentence1);
  window.speechSynthesis.speak(utterance);
};

//
// const setWord = (e) => {
//   this.word = e.target.value
// }
</script>

<style scoped></style>
