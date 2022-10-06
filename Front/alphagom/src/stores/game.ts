/* eslint-disable vue/return-in-computed-property */
import api from "@/api/api";
import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

import DarkcaveLine from "@/assets/dialog/DarkcaveLine.json";
import SkyLine from "@/assets/dialog/SkyLine.json";
import SwampLine from "@/assets/dialog/SwampLine.json";
import MagicCastle from "@/assets/dialog/MagicCastle.json";
import Epilogue from '@/assets/dialog/Epilogue.json'
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
import jara_look_sad from "/assets/image/jara_look_sad.png";
// rabbit
import rabbit_stand from "/assets/image/rabbit_stand.png";
// dragonKing
import dragonKing_stand from "/assets/image/dragonKing_stand.png";
import dragonKing_look_happy from "/assets/image/dragonKing_look_happy.png";
// gyeonu
import gyeonu_stand from "/assets/image/gyeonu_stand.png";
import gyeonu_side from "/assets/image/gyeonu_side.png";
import gyeonu_look_sad from "/assets/image/gyeonu_look_sad.png";
// jiknyeo
import Jiknyeo_side from "/assets/image/Jiknyeo_side.png";
//hwan_woong
import hwan_woong from "/assets/image/hwan_woong.png";
// woong_girl
import woong_girl from "/assets/image/woong_girl.png";

// textbox
import dark_cave_textbox from "/assets/image/dark_cave_textbox.png";
import swamp_textbox from "/assets/image/swamp_textbox.png";
import magic_castle_textbox from "/assets/image/magic_castle_textbox.png";
import epilogue_textbox from "/assets/image/magic_castle_textbox.png";
import sky_textbox from "/assets/image/sky_textbox.png";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
// Composition
export const useGameStore = defineStore("game", () => {
  /* state */
  const stage = ref(""); // 해당 스테이지 이름
  const dialog = ref(); // 해당 스테이지 dialog
  const bgm = ref(""); // 스테이지에 bgm 넣기
  const scriptNum = ref(0); // 현재 스크립트 번호
  const score = ref(3000); // 게임별 점수
  const isActive = ref(false); //  Dialog 에서 '대답하기!' 버튼 활성화 (true)
  const Nickname = ref(); // user 가 magiccastle 에서 설정한 닉네임 (초기화 시켜야하나?)
  const userId = ref();
  const dialogList = ref([
    // Dialog list
    DarkcaveLine,
    SkyLine,
    SwampLine,
    MagicCastle,
    Epilogue,
  ]);

  const stageViewDict = ref({
    // stage view dict + 대화창 구분
    MagicCastle: ["MagicCastleTutorialView"],
    darkcave: ["TongueTwisterGameView"],
    sky: ["birdProverbGameView"],
    swamp: ["kingCureGameView"],
    epilogue:["EpilogueEndView"]
  });

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
      case "환웅":
        return hwan_woong;
      case "웅녀":
        return woong_girl;
      default:
        return "";
    }
  });

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
      case 'epilogue':
        return stageViewDict.value.epilogue;
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
      case "epilogue":
        return epilogue_textbox
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
      case "jara_look_sad":
        return jara_look_sad;
      case "dragonKing_look_happy":
        return dragonKing_look_happy;
      case "gyeonu_look_sad":
        return gyeonu_look_sad;
      default:
        return "";
    }
  });

  // == stage 별 게임 관련 state ===============================================
  // (주의) 공통 게임 문제들과 답은 스테이지 넘어갈 때마다 초기화 시켜줘야 한다!
  const GameList = ref(); // 게임 구성 받아오는 state
  const Answer = ref(null); // 게임 플레이어의 답 담는 state

  const VoiceOnOff = ref(false); // 녹음기능 켜고 끄는 state
  const VoiceFile = ref(); // 녹음된 파일 담는 state

  const Modal = ref(true); // 게임 시작할 때, 게임 끝났을 때 모달 창 (키는 것 true) (views/Modal의 모달들 모두 사용 가능)
  const PassFail = ref(null); // 정답, 오답 구분 짓는 state, 항상 초기화
  const GameEnd = ref(false); // 게임 끝났을 때 라우트 (임시)

  // 녹음하는 스테이지 마다 시간 조절하는 state
  const RecordTime = ref();

  // == actions ===============================================================
  /*
   *start page에서 stage 이름 초기화
   */
  function setStage(stageStr: string) {
    stage.value = stageStr;
    // 해당 스테이지의 전체 대화를 가져온다.
    dialogList.value.forEach((element) => {
      if (element.stage == stage.value) {
        dialog.value = element;

        // isActive, scriptNum, VoiceOnOff 초기화
        isActive.value = false;
        scriptNum.value = 0;
        VoiceOnOff.value = false;
        score.value = 3000;
      }
    });
  }

  /*
   * 스테이지에 따라 녹음 시간 조절해서 Flask API 요청 함수 조정
   */
  function sendAIAPI(payload: any) {
    if (
      stage.value === "MagicCastle" &&
      (type.value == scriptType.QUESTION || type.value == scriptType.CHECK)
    ) {
      getCheckAI(payload);
    } else if (
      stage.value === "MagicCastle" &&
      (type.value == scriptType.NICKNAME ||
        type.value == scriptType.SENTANCE ||
        type.value == scriptType.NICKNAMEAGAIN ||
        type.value == scriptType.FAIL)
    ) {
      getSTTAI(payload);
    } else if (stage.value === 'epilogue') {
      getSTTAI(payload);
    }
    else if (stage.value === "sky") {
      getBirdAI(payload);
    } else if (stage.value === "swamp") {
      getKingAI(payload);
    } else if (stage.value === "darkcave") {
      getSTTAI(payload);
    }
  }

  // json 파일의 type 종류 : 다음 script가 어떤 동작을 할건지
  const scriptType = {
    STORY: "story",
    YES: "yes",
    GAME: "game",
    QUESTION: "question",
    NICKNAME: "nickname",
    SENTANCE: "sentance",
    CHECK: "check",
    FAIL: "fail",
    NICKNAMEAGAIN: "nicknameAgain",
    END: "end"
  };
  Object.freeze(scriptType); // 한번 선언된 객체의 값 변경 못하도록 고정 => enum 처럼 사용

  // 대사 type 에 따라 넘어가는 인덱스 설정
  // 그리고 AI 서버에 보낼 녹음 파일 녹음 시간 설정

  function plusNum() {
    if (type.value == scriptType.YES) {
      scriptNum.value++;
    }
    scriptNum.value++;
    isActive.value = false;
    if (type.value == scriptType.GAME) {
      isActive.value = true;
    }
    if (type.value == scriptType.QUESTION) {
      isActive.value = true;
      RecordTime.value = 1000;
    }
    if (type.value == scriptType.NICKNAME) {
      isActive.value = true;
      RecordTime.value = 3000;
    }
    if (type.value == scriptType.SENTANCE) {
      isActive.value = true;
      RecordTime.value = 5000;
    }
    if (type.value == scriptType.END) {
      isActive.value = true;
    }
  }

  // Dialog 에서 API 요청 후 대화로그 인덱스 지정
  function checkindex() {
    if (type.value == scriptType.GAME) {
      const gameType = stageGame.value[0];
      router.push({ name: gameType });
    } else if (type.value == scriptType.QUESTION) {
      if (Answer.value.answer === "응") {
        scriptNum.value++;
        isActive.value = false;
      } else {
        scriptNum.value = scriptNum.value + 2;
        isActive.value = false;
      }
    } else if (type.value == scriptType.NICKNAME) {
      Nickname.value = Answer.value.answer;
      if (Nickname.value == "failed") {
        scriptNum.value++;
      } else {
        scriptNum.value = scriptNum.value + 2;
        RecordTime.value = 1000;
      }
    }
    // nickname 응아니 체크
    else if (type.value == scriptType.CHECK) {
      if (Answer.value.answer === "응") {
        scriptNum.value = scriptNum.value + 2;
        isActive.value = false;
      } else {
        scriptNum.value++;
        isActive.value = true;
        RecordTime.value = 3000;
      }
    } else if (type.value == scriptType.FAIL) {
      Nickname.value = Answer.value.answer;
      if (Nickname.value != "failed") {
        scriptNum.value++;
      }
    } else if (type.value == scriptType.NICKNAMEAGAIN) {
      Nickname.value = Answer.value.answer;
      if (Nickname.value == "failed") {
        scriptNum.value = scriptNum.value - 2;
      } else {
        scriptNum.value--;
      }
    } else if (type.value == scriptType.SENTANCE) {
      console.log(Answer.value)
      if (
        Answer.value.answer == "이제 나의 손을 잡아 보아요" ||
        Answer.value.answer == "안녕은 영원한 헤어짐은 아니겠지요"
      ) {
        PassFail.value = "pass";
        // const gameType = stageGame.value[0];
        // router.push({ name: gameType });
      } else {
        PassFail.value = "fail";
      }
    }
  }

  // Dialog 끝나고 게임으로 넘어갈 때와 점수 창으로 넘어갈 때 route 함수
  // forEach 기능은 break가 따로 없어서 throw error 로 해결
  function skip() {
    const length = dialog.value.script.length;
    try {
      dialog.value.script
        .slice(scriptNum.value, length + 1)
        .forEach((element: any) => {
          scriptNum.value++;
          if (element.type === "game") {
            const gameType = stageGame.value[0];
            router.push({ name: gameType });
            throw new Error("End Loop!");
          } else if (element.type === "end") {
            router.push({ name: "stageChangeView" });
            throw new Error("End Loop!");
          }
        });
    } catch (e) {}
  }

// 점수 1초당 10점씩 깎기
// 게임 진행 시에만 깎도록 조정해야 한다
function minusScore() {
  if (score.value === 0) {
    return;
  } 
  if (window.location.pathname === "/stage/swamp/game/kingCureGame"
 || window.location.pathname === "/stage/darkCave/game/tongueTwisterGame" 
 || window.location.pathname === "/stage/sky/game/birdProverbGame") {
    score.value -= 10;
    setTimeout(minusScore, 1000);
  }
}

  /*
   * AI api 요청
   */
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

  // Flask 에서 STT 결과값 갖고 오는 API
  async function getSTTAI(payload: any) {
    await axios({
      url: api.game.aiStt(),
      // url: api.game.aiStt(),
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: payload,
    }).then((response) => {
      Answer.value = response.data;
    });
  }

  /*
   * BE api 요청
   */
  // 의성어 / 의태어 게임 목록 요청하는 함수
  async function getKingGame() {
    await axios({
      url: api.game.getSwampWord(),
      method: "GET",
    }).then((response) => {
      GameList.value = response.data;
    });
  }
  // 새 속담 게임 목록 요청하는 함수
  async function getBirdGame() {
    await axios({
      url: api.game.getSkyBird(),
      method: "GET",
    }).then((response) => {
      console.log(GameList);
      GameList.value = response.data;
    });
  }
  // 잰말놀이 게임 목록 요청하는 함수
  async function getTongueGame() {
    await axios({
      url: api.game.getCaveTongue(),
      method: "GET",
    }).then((response) => {
      GameList.value = response.data;
    });
  }

  // modal 상태 변경 함수
  function updateModal() {
    if (Modal.value) {
      Modal.value = false;
      console.log("modal false로 바꿈: " + Modal.value);
    } else if (!Modal.value) {
      Modal.value = true;
      console.log("modal true로 바꿈: " + Modal.value);
    }
  }
  
  // 닉네임 저장 시키는 함수 axios 요청 보내기
  async function saveNickname(userId: number, nickname: string) {
    await axios({
      url: api.user.postUserNickname(userId, nickname),
      method: "POST",
      data: nickname,
    }).then((response) => {
      console.log(response.data);
    });
  }

  //점수 저장하는 함수 axios 요청 보내기
  async function saveScore(userId: number, score: number, gameTag: string) {
    await axios({
      url: api.user.postUserScore(userId),
      method: "POST",
      data: { score: score, gameTag: gameTag },
    }).then((response) => {
      console.log(response.data);
    });
  }

  return {
    //state
    stage,
    scriptNum,
    Nickname,
    PassFail,
    score,
    dialogList,
    stageViewDict,
    isActive,
    GameList,
    Answer,
    VoiceOnOff,
    VoiceFile,
    Modal,
    GameEnd,
    RecordTime,

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
    // setBGM,
    getKingAI,
    getCheckAI,
    getBirdAI,
    getKingGame,
    getBirdGame,
    checkindex,
    getTongueGame,
    getSTTAI,
    sendAIAPI,
    updateModal,
    saveNickname,
    saveScore,
    minusScore,
  };
});
