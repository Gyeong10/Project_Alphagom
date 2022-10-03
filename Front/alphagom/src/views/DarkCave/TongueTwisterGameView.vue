<template>
  <div>
    <ul class="problem">
      <li v-for="sentence in sentencelist" :key="sentence">
        {{ sentence.sentance }}
        <!-- TTS 기능 -->
        <button  class="tts" @click="startSpeechToTxt">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        </button>
      </li>
    </ul>

    <!-- <div class="problemText">
      <h1>{{ game.script.}}</h1>
    </div> -->
    
    <!-- <div> -->
      
      <!-- <div v-for="pl in StagePrologue.prologue"
        v-model="pl"> -->
        <!-- 대사를 순서대로 어떻게 나타낼 것인가 -->
        <!-- {{pl.line1}}
        {{pl.line2}}
      </div> -->
      <!-- <div>
        <input 
          type="text"
          v-model="word"
          placeholder="여기에 입력하세요"
          @keyup="setWord">
        <button id="tts" @click="startSpeechToTxt">음성출력</button>
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useGameStore } from "@/stores/game";

// import StagePrologue from '@/assets/SkyLine.json'

const game = useGameStore();
game.setStage("darkcave");

const state = reactive({
  lang: "ko-KR",
  speaking: "",
})

const sentencelist = game.tonguetwister.value
// const sentence = sentencelist.

// onMounted() {
//   console.log(sentence)
//     axios
//       .get('https://api/be/game/cave/tonguetwister')      
//       .then(response => (sentence = response))
//       console.log(sentence)
//   }

// const sentence = game.script
// TTS 기능
// const pl = '';
function startSpeechToTxt() {
  // start speech to txt
  let utterance = new SpeechSynthesisUtterance(sentence.sentance)
  // utterance.rate = 1 // 말하는 속도
  window.speechSynthesis.speak(utterance)
}

// function getProblem()

// 
// const setWord = (e) => {
//   this.word = e.target.value
// }

// export default {
//   name: "DarkCaveDialogView",
//   components: { CommonDialog },
//   setup () {
//     const game = useGameStore();
//     game.setStage("darkcave");

//     const state = reactive({
//       lang: "ko-KR",
//       speaking: "",

//       // tts 인식 안됨
//       // sentence2: "반가워",
      
//       // word: "",
//       // StagePrologue: StagePrologue
//       // voiceList: []
//     })

//     const sentence1 = "간장공장공장장"

//     // TTS 기능
//     // const pl = '';
//     const startSpeechToTxt = () => {
//       // start speech to txt
//       let utterance = new SpeechSynthesisUtterance(sentence1)
//       window.speechSynthesis.speak(utterance)
//     }

//     // 
//     // const setWord = (e) => {
//     //   this.word = e.target.value
//     // }

//     return { 
//       startSpeechToTxt,
//       // setWord,
//       state,
//       // pl
//     }
//   }
// }
</script>

<style scoped>

</style>