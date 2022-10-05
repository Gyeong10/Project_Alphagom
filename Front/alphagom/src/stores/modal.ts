// NavBar 모달용
import api from "@/api/api";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  // state
  const Modal = ref(false); // 게임 시작할 때, 게임 끝났을 때 모달 창 (키는 것 true) (NavBar/Modal의 모달용)

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

  return {
    // state
    Modal,

    // actions
    // popupModal
    updateModal
  }

})