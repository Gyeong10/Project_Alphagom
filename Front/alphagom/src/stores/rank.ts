import api from "@/api/api";
import axios from "axios";
import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
export const useRankStore = defineStore("rank", () => {
  //state

  // 스테이지 이름
  const rankStage = ref({
    // Rank stage
    ALL: "all",
    SWAMP: "swamp",
    CAVE: "cave",
    SKY: "sky",
  });
  Object.freeze(rankStage)

  // 기본 탭의 스테이지 이름
  const tabStage = ref("all")

  // const AllRankList = ref([]); // 모든 유저 랭크 받아오는 state
  // const AllMyRank = ref({}); // 나의 랭크 받아오는 state
  
  // 모든 유저 랭크 받아오는 state (API 연결 전까지 임시 데이터)
  const AllRankList = ref([
    {
      gameTag: "cave",
      nickName: "깡총이",
      score: 800,
      picture:
      "https://item.kakaocdn.net/do/862539f7f2171437385154b3b749990f7154249a3890514a43687a85e6b6cc82",
      rank: 1,
    },
    {
      gameTag: "cave",
      nickName: "거북이",
      score: 700,
      picture:
      "https://item.kakaocdn.net/do/862539f7f2171437385154b3b749990f7154249a3890514a43687a85e6b6cc82",
      rank: 2,
    },
    {
      gameTag: "cave",
      nickName: "자라",
      score: 570,
      picture:
      "https://item.kakaocdn.net/do/862539f7f2171437385154b3b749990f7154249a3890514a43687a85e6b6cc82",
      rank: 3,
    }
  ]);
  // 나의 랭크 받아오는 state 
  const AllMyRank = ref({
    gameTag: "cave",
    nickName: "깡총이",
    score: 800,
    picture:
      "https://item.kakaocdn.net/do/862539f7f2171437385154b3b749990f7154249a3890514a43687a85e6b6cc82",
    rank: 1
  }); 

  // function setRank(rank: number) {
  //   console.log(rank);
  // }


  // BE api 요청
  // 스테이지별 1,2,3순위 정보 받아오기
  async function getAllRank(payload: string) {
    console.log("들어왔나?", AllRankList.value)
    await axios({
      url: api.rank.getAllUserRank(payload),
      method: "GET",
    }).then((response) => {
      AllRankList.value = response.data;
      console.log('response.data: ' + response.data)
    });
    console.log("들어왔다!", AllRankList.value)
  }

  // 스테이지별 내 정보 받아오기
  async function getMyRank(payload1: number, payload2: string) {
    console.log('rank-----',api.rank.getUserRank(payload1, payload2));
    await axios({
      url: api.rank.getUserRank(payload1, payload2),
      method: "GET",
    }).then((response) => {
      AllMyRank.value = response.data;
      console.log('response.data: ' + response.data)

    });
  }

  return {
    // state
    AllRankList,
    AllMyRank,
    tabStage,

    // actions
    getAllRank,
    getMyRank,

  }




});
