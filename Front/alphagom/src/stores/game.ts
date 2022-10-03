/* eslint-disable vue/return-in-computed-property */
import api from "@/api/api";
import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

import DarkcaveLine from "@/assets/dialog/DarkcaveLine.json";
import SkyLine from "@/assets/dialog/SkyLine.json";
import SwampLine from "@/assets/dialog/SwampLine.json";
import MagicCastle from "@/assets/dialog/MagicCastle.json";
import router from "@/router";
import { stringLiteral } from "@babel/types";

// image import
// alphagom
import alphagom_stand from "/assets/image/alphagom_stand.png";
// import alphagom_hello from "/assets/image/alphagom_hello.png";
import alphagom_look_happy from "/assets/image/alphagom_look_happy.png";
import alphagom_look_normal from "/assets/image/alphagom_look_normal.png";
import alphagom_look_suprise from "/assets/image/alphagom_look_suprise.png";
import alphagom_look_flustered from "/assets/image/alphagom_look_flustered.png";
// bear
import bear_stand from "/assets/image/bear_stand.png";
import bear_look_cry from "/assets/image/bear_look_cry.png";
import bear_look_happy from "/assets/image/bear_look_happy.png";
import bear_look_normal from "/assets/image/bear_look_normal.png";
// jara
import jara_stand from "/assets/image/jara_stand.png";
import jara_look_openly from "/assets/image/jara_look_openly.png";
// rabbit
import rabbit_stand from "/assets/image/rabbit_stand.png";
// dragonKing
import dragonKing_stand from "/assets/image/dragonKing_stand.png";
// gyeonu
import gyeonu_stand from "/assets/image/gyeonu_stand.png";
import gyeonu_side from "/assets/image/gyeonu_side.png";
// jiknyeo
import Jiknyeo_side from "/assets/image/Jiknyeo_side.png";
// textbox
import dark_cave_textbox from "/assets/image/dark_cave_textbox.png";
import swamp_textbox from "/assets/image/swamp_textbox.png";
import magic_castle_textbox from "/assets/image/magic_castle_textbox.png";
import sky_textbox from "/assets/image/sky_textbox.png";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
// Composition
export const useGameStore = defineStore("game", () => {
  /* state */
  const stage = ref(""); // 해당 스테이지 이름
  const dialog = ref(); // 해당 스테이지 dialog
  const scriptNum = ref(0); // 현재 스크립트 번호
  const SwampScore = ref(5000); // 게임별 점수
  const DarkCaveScore = ref(2500);
  const SkyScore = ref(2500);
  const isActive = ref(false); // 응아니 버튼
  const dialogList = ref([
    // Dialog list
    DarkcaveLine,
    SkyLine,
    SwampLine,
    MagicCastle,
  ]);
  const stageViewDict = ref({
    // stage view dict + 대화창 구분
    MagicCastle: ["MagicCastleTutorialView"],
    darkcave: ["TongueTwisterGameView"],
    sky: ["birdProverbGameView"],
    swamp: ["kingCureGameView"],
  });

  // (주의) 공통 게임 문제들과 답은 스테이지 넘어갈 때마다 초기화 시켜줘야 한다!
  const GameList = ref(); // 게임 구성 받아오는 state
  const Answer = ref(); // 게임 플레이어의 답 담는 state

  const VoiceOnOff = ref(false); // 녹음기능 켜고 끄는 state
  const VoiceFile = ref(); // 녹음된 파일 담는 state

  const Modal = ref(true); // 게임 시작할 때, 게임 끝났을 때 모달 창 (키는 것 true)
  const PassFail = ref(null); // 정답, 오답 구분 짓는 state, 항상 초기화
  const GameEnd = ref(false); // 게임 끝났을 때 점수 창 (임시)

  // 현재 effect
  const effect = computed(() => script.value.effect);
  // 현재 type
  const type = computed(() => script.value.type);
  // 현재 char
  const char = computed(() => script.value.char);
  // 현재 스크립트
  const script = computed(() => dialog.value.script[scriptNum.value]);
  // 현재 표정 이미지
  const faceImg = computed(() => dialog.value.script[scriptNum.value].imgFace);

  // 현재 전신 이미지
  const imgBody = computed(() => {
    switch (char.value) {
      case "알파곰":
        return alphagom_stand;
      case "곰":
        return bear_stand;
      case "견우":
        return gyeonu_stand;
      case "직녀":
        return Jiknyeo_side;
      case "토끼":
        return rabbit_stand;
      case "자라":
        return jara_stand;
      case "용왕":
        return dragonKing_stand;
      default:
        return "";
    }
  });

  // 이미지 url
  const getImgUrl = (img: String) => {
    return new URL(`../../assets/image/${img}.png`, import.meta.url).href;
  };

  // 현재 stage 에서 진행할 게임 리스트
  const stageGame = computed(() => {
    switch (stage.value) {
      case "sky":
        return stageViewDict.value.sky;
      case "darkcave":
        return stageViewDict.value.darkcave;
      case "swamp":
        return stageViewDict.value.swamp;
      case "MagicCastle":
        return stageViewDict.value.MagicCastle;
    }
  });

  // 현재 stage 에서 진행할 textBox 리스트
  const textboxImg = computed(() => {
    switch (stage.value) {
      case "sky":
        return sky_textbox;
      case "darkcave":
        return dark_cave_textbox;
      case "swamp":
        return swamp_textbox;
      case "MagicCastle":
        return magic_castle_textbox;
    }
  });

  // 현재 script 에서 진행할 image 표정 리스트
  const imgFace = computed(() => {
    switch (faceImg.value) {
      case "alphagom_look_happy":
        return alphagom_look_happy;
      case "alphagom_look_normal":
        return alphagom_look_normal;
      case "alphagom_look_suprise":
        return alphagom_look_suprise;
      case "alphagom_look_flustered":
        return alphagom_look_flustered;
      case "bear_look_cry":
        return bear_look_cry;
      case "bear_look_happy":
        return bear_look_happy;
      case "bear_look_normal":
        return bear_look_normal;
      case "jara_look_openly":
        return jara_look_openly;
      default:
        return "";
    }
  });

  /* actions */

  // start page에서 stage 이름 초기화
  function setStage(stageStr: string) {
    stage.value = stageStr;

    // 해당 스테이지의 전체 대화를 가져온다.
    dialogList.value.forEach((element) => {
      if (element.stage == stage.value) {
        dialog.value = element;
        console.log(dialog.value);
      }
    });
  }
  // Flask 에서 의성어/의태어 플레이어 게임 결과값 갖고 오는 API
  async function getKingAI(payload: any) {
    await axios({
      url: api.game.aiSwampWord(),
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: payload,
    }).then((response) => {
      Answer.value = response.data;
    });
  }
  // Flask 에서 응 아니 check 값 갖고 오는 API
  async function getCheckAI(payload: any) {
    await axios({
      url: api.game.yesOrNo(),
      method: "POST",
      headers: { "Content-Type": "multipart/form-data"},
      data: payload,
    }).then((response) => {
      Answer.value = response.data;
    });
  }
  // Flask 에서 새 플레이어 게임 결과값 갖고 오는 API
  async function getBirdAI(payload: any) {
    await axios({
      url: api.game.aiSkyBird(),
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: payload,
    }).then((response) => {
      Answer.value = response.data;
    });
  }

  // BE api 요청
  async function getKingGame() {
    await axios({
      url: api.game.getSwampWord(),
      method: "GET",
    }).then((response) => {
      GameList.value = response.data;
    });
  }

  async function getBirdGame() {
    await axios({
      url: api.game.getSkyBird(),
      method: "GET",

    }).then((response) => {
      GameList.value = response.data;
    });
  }

  async function getTongueGame() {
    await axios({
      url: api.game.getCaveTongue(),
      method: "GET",

    }).then((response) => {
      GameList.value = response.data;
    });
  }

  // 대사 type 에 따라 넘어가는 인덱스 설정
  function plusNum() {
    if (type.value == "yes") {
      scriptNum.value++;
    }
    scriptNum.value++;
    isActive.value = false;
    if (type.value == "game") {
      const gameType = stageGame.value[0];
      router.push({ name: gameType });
    }
    if (type.value == "question") {
      isActive.value = true;
    }
  }

  // 응, 아니 대답 후 대화로그 인덱스 지정
  function checkyesorno() {
    if (Answer.value === "응") {
      scriptNum.value++;
      isActive.value = false;
    } else {
      scriptNum.value = scriptNum.value + 2;
      isActive.value = false;
    }
  }

  function skip() {
    dialog.value.script.forEach((element: any) => {
      scriptNum.value++;
      if (element.type == "game") {
        const gameType = stageGame.value[0];
        router.push({ name: gameType });
      }
    });
  }

  return {
    //state
    stage,
    scriptNum,
    PassFail,
    SwampScore,
    DarkCaveScore,
    SkyScore,
    dialogList,
    stageViewDict,
    isActive,
    GameList,
    Answer,
    VoiceOnOff,
    VoiceFile,
    Modal,
    GameEnd,

    //computed
    dialog,
    script,
    effect,
    type,
    stageGame,
    char,
    imgBody,
    faceImg,
    textboxImg,
    imgFace,

    //action
    setStage,
    plusNum,
    skip,
    getImgUrl,
    getKingAI,
    getCheckAI,
    getBirdAI,
    getKingGame,
    getBirdGame,
    checkyesorno,
    getTongueGame,
  };
});
