<template>
  <transition name="modal" appear>
    <section class="modal" tabindex="-1" appear>
    <!-- <div v-if="settingopen" class="setting-modal" tabindex="-1"> -->
      <div class="modal-content">
        <!-- 창닫기 버튼 -->
        <div class="modal__modal-header">
          <button
            @click="modalStore.updateModal()" 
            class="modal__btn-close" data-bs-dismiss="modal"
            aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8636 9L17.4069 3.45662C18.1977 2.66586 18.1977 1.38382 17.4069 0.593066C16.6161 -0.197689 15.3342 -0.197689 14.5434 0.593066L9 6.13645L3.45662 0.593066C2.66586 -0.197689 1.38382 -0.197689 0.593066 0.593066C-0.197689 1.38382 -0.197689 2.66586 0.593066 3.45662L6.13645 9L0.593066 14.5434C-0.197689 15.3341 -0.197689 16.6162 0.593066 17.4069C0.988443 17.8023 1.50663 18 2.02482 18C2.54301 18 3.06124 17.8023 3.45658 17.4069L9 11.8636L14.5434 17.4069C14.9388 17.8023 15.4569 18 15.9751 18C16.4933 18 17.0115 17.8023 17.4069 17.4069C18.1976 16.6162 18.1976 15.3341 17.4069 14.5434L11.8636 9Z" fill="#484E23"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <!-- 부트스트랩 슬라이더 -->
          <!-- 마이크 감도 -->
          <label for="customRange1" class="form-label">마이크 감도</label>
          <input type="range" class="form-range" min="0" max="5" id="customRange1">
          <!-- 스피커 크기 -->
          <label for="customRange2" class="form-label">스피커 크기</label>
          <input type="range" class="form-range" min="0" max="5" id="customRange2">
        </div>
        <!-- <div class="modal-footer">
          <span type="button" class="next-btn" data-bs-dismiss="modal">다음 탐험으로</span>
        </div> -->
      </div>
    <!-- </div> -->
    </section>
  </transition>

</template>

<script setup>
import { ref, computed } from "vue";
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
// const closeModal = () => {
//   modalStore.Modal = false
// }



</script>

<style scoped>
.modal__btn-close {
    background-color: transparent;
    border: 0;
    outline: 0;
    padding: 0;
    cursor: pointer;

    position: absolute;
    top: 0px;
    left: 505px;
    z-index: 50;
  }
.modal__btn-close:hover, &__btn-close:active, &__btn-close:focus {
    border: 0 solid transparent;
    outline: 0;
  }

</style>