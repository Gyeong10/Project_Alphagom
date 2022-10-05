import api from "@/api/api";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

import { Howl } from "howler"; //자동재생

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
export const useSettingStore = defineStore("setting", () => {
  /*
   * bgm 설정 관련
   */

  const bgmTitle = {
    HOME: "/music/backgroundmusic/memories_Home.mp3",
    MAGICCASTLE: "/music/backgroundmusic/anewbeginning_Magiccastle.mp3",
    SWAMP: "/music/backgroundmusic/inspire_Seaking.mp3",
    DARKCAVE: "/music/backgroundmusic/littleidea_Cave.mp3",
    SKY: "/music/backgroundmusic/adventure_Skymain.mp3",
    END: "music/backgroundmusic/onceagain_Ending.mp3",
  };

  // state
  const playing = ref(true);
  const sound = ref(
    new Howl({
      src: [bgmTitle.HOME],
      autoplay: true,
      volume: 0.5,
      onend: () => {
        console.log("Finished!");
      },
    })
  );

  // function
  function audioStart() {
    playing.value = true;
    sound.value.play();
  }

  function audioStop() {
    playing.value = false;
    sound.value.pause();
  }

  function setBGM(stage: string) {
    audioStop();

    const bgm = ref("");
    if (stage === "HOME") bgm.value = bgmTitle.HOME;
    else if (stage === "MAGICCASTLE") bgm.value = bgmTitle.MAGICCASTLE;
    else if (stage === "SWAMP") bgm.value = bgmTitle.SWAMP;
    else if (stage === "DARKCAVE") bgm.value = bgmTitle.DARKCAVE;
    else if (stage === "SKY") bgm.value = bgmTitle.SKY;
    else if (stage === "END") bgm.value = bgmTitle.END;

    sound.value = new Howl({
      src: [bgm.value],
      autoplay: true,
      volume: 0.5,
      onend: () => {
        sound.value.play();
      },
    });
  }

  return {
    // bgm 설정 관련
    playing,
    sound,
    bgmTitle,

    //action
    audioStart,
    audioStop,
    setBGM,
  };
});
