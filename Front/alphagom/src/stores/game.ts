/* eslint-disable vue/return-in-computed-property */
import api from "@/api/api";
import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

import DarkcaveLine from "@/assets/dialog/DarkcaveLine.json";
import SkyLine from "@/assets/dialog/SkyLine.json";
import SwampLine from "@/assets/dialog/SwampLine.json";
import router from "@/router";
import { stringLiteral } from "@babel/types";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
// Composition
export const useGameStore = defineStore("game", () => {
  /* state */
  const stage = ref(""); // 해당 스테이지 이름
  const dialog = ref();
  const scriptNum = ref(0); // 현재 스크립트 번호
  const SwampScore = ref(5000); // 게임별 점수
  const DarkCaveScore = ref(2500);
  const SkyScore = ref(2500);
  const dialogList = ref([
    // Dialog list
    DarkcaveLine,
    SkyLine,
    SwampLine,
  ]);
  const stageViewDict = ref({
    // stage view dict
    darkcave: ["darkCaveStartView"],
    sky: ["birdProverbGameView"],
    swamp: ["kingCureGameView", "chaseGameView"],
  });
  const stageGames = ref([""]); // game

  // (주의) 공통 게임 문제들과 답은 스테이지 넘어갈 때마다 초기화 시켜줘야 한다!
  const GameList = ref(); // 게임 구성 받아오는 state
  const Answer = ref(); // 게임 플레이어의 답 담는 state

  const VoiceOnOff = ref(false); // 녹음기능 켜고 끄는 state
  const VoiceFile = ref(); // 녹음된 파일 담는 state

  const GameEnd = ref(false); // 게임 끝났을 때 점수 창 (임시)

  /* computed */
  // 해당 stage dialog
  // const dialog = computed(() => {
  //   // 해당 스테이지의 전체 대화를 가져온다.
  //   dialogList.value.forEach((element) => {
  //     if (element.stage == stage.value) {
  //       return element;
  //     }
  //   });
  // });

  // 현재 스크립트
  const script = computed(() => dialog.value.script[scriptNum.value]);
  // 현재 effect
  const effect = computed(() => script.value.effect);
  // 현재 type
  const type = computed(() => script.value.type);

  // 현재 stage 에서 진행할 게임 리스트
  const gameList = computed(() => {
    switch (stage.value) {
      case "sky":
        return stageViewDict.value.sky;
      case "darkcave":
        return stageViewDict.value.darkcave;
      case "swamp":
        return stageViewDict.value.swamp;
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
      headers: { "Content-Type": "multipart/form-data" },
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

  // BE 배포되기 전까지 임시
  // BE 에서 의성어/의태어 게임 구성 요소 (문제, 답) 갖고오는 API
  async function getKingGame() {
    await axios({
      url: api.test.testKingAI(),
      method: "GET",
    }).then((response) => {
      GameList.value = response.data;
    });
  }

  async function getBirdGame() {
    await axios({
      url: api.test.testBirdAI(),
      method: "GET",
    }).then((response) => {
      GameList.value = response.data;
    });
  }

  return {
    //state
    stage,
    scriptNum,
    SwampScore,
    DarkCaveScore,
    SkyScore,
    dialogList,
    stageViewDict,
    stageGames,
    GameList,
    Answer,
    VoiceOnOff,
    VoiceFile,

    GameEnd,

    //computed
    dialog,
    script,
    effect,
    type,
    gameList,

    //action
    setStage,
    getKingAI,
    getCheckAI,
    getBirdAI,
    getKingGame,
    getBirdGame,
  };
});
