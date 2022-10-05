<template>
  <div>
    <CommonDialog></CommonDialog>
    
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useGameStore } from "@/stores/game";
import CommonDialog from "@/components/game/CommonDialog.vue";
// import StagePrologue from '@/assets/SkyLine.json'

export default {
  name: 'DarkCaveDialogView',
  components: { CommonDialog },
  setup () {
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
    })

    const sentence1 = "간장공장공장장"

    // TTS 기능
    // const pl = '';
    const startSpeechToTxt = () => {
      // start speech to txt
      let utterance = new SpeechSynthesisUtterance(sentence1)
      window.speechSynthesis.speak(utterance)
    }

    // 
    // const setWord = (e) => {
    //   this.word = e.target.value
    // }

    return { 
      startSpeechToTxt,
      // setWord,
      state,
      // pl
    }
  }
}
</script>

<style scoped>

</style>