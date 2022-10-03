import api from "@/api/api";
import axios from "axios";
import { defineStore } from "pinia";

// vuex 를 사용할 대는 store/index.js 파일이 필요했지만,
// pinia는 index.js 없이 모듈화 된 파일만 있으면 된다.

// 이름을 가지는 내보내기를 할 때 보통 이름 앞에 use를 붙여 사용한다.
export const useRankStore = defineStore("rank", {
  state: () => ({
    //state
  }),
  actions: {
    setRank(rank: number) {
      console.log(rank);
    },
  },
});
