<template>
  <transition name="modal" appear>
    <section class="modal" tabindex="-1" appear>
    <!-- <div v-if="settingopen" class="setting-modal" tabindex="-1"> -->
      <!-- 모달 박스 -->
      <svg class="modal-box" width="400" height="237" viewBox="0 0 400 237" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="2.5" width="395" height="231.8" rx="27.5" fill="#FDF8E2" stroke="#94C178" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"/>
      </svg>
      <!-- 모달 내용 -->
      <div class="modal-content">
        <div class="modal-body">
          <!-- 부트스트랩 슬라이더 -->
          <div class="body-component">
            설정
          </div>
          <!-- 마이크 감도 -->
          <div class="body-component">
            <label for="customRange1" class="form-label">마이크 감도</label>
            <input type="range" class="form-range" min="0" max="5" id="customRange1">
          </div>
          <!-- 스피커 크기 -->
          <div class="body-component">
            <label for="customRange2" class="form-label">스피커 크기</label>
            <input type="range" class="form-range" min="0" max="1" step="0.1" id="customRange2" v-model="speakerValue">
          </div>
        <!-- 창닫기 버튼 -->
        <div class="modal__modal-header">
          <button
            @click="modalStore.updateModal()" 
            class="modal__btn-close" data-bs-dismiss="modal"
            aria-label="Close">
            닫기
            <!-- <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.8636 9L17.4069 3.45662C18.1977 2.66586 18.1977 1.38382 17.4069 0.593066C16.6161 -0.197689 15.3342 -0.197689 14.5434 0.593066L9 6.13645L3.45662 0.593066C2.66586 -0.197689 1.38382 -0.197689 0.593066 0.593066C-0.197689 1.38382 -0.197689 2.66586 0.593066 3.45662L6.13645 9L0.593066 14.5434C-0.197689 15.3341 -0.197689 16.6162 0.593066 17.4069C0.988443 17.8023 1.50663 18 2.02482 18C2.54301 18 3.06124 17.8023 3.45658 17.4069L9 11.8636L14.5434 17.4069C14.9388 17.8023 15.4569 18 15.9751 18C16.4933 18 17.0115 17.8023 17.4069 17.4069C18.1976 16.6162 18.1976 15.3341 17.4069 14.5434L11.8636 9Z" fill="#484E23"/>
            </svg> -->
          </button>
        </div>
        </div>
        <!-- <div class="modal-footer">
          <span type="button" class="next-btn" data-bs-dismiss="modal">다음 탐험으로</span>
        </div> -->
      </div>
      <div class="modal__overlay" @click.self="$emit('close')"></div>
    <!-- </div> -->
    </section>
  </transition>

</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useModalStore } from "@/stores/modal";
import { useSettingStore } from "@/stores/setting";

const modalStore = useModalStore();

const store = useSettingStore();
// const playing = computed(() => store.playing);
// const audioStart = store.audioStart;
// const audioStop = store.audioStop;
const speakerValue = ref(0.5)

watch(speakerValue, () => {
  store.setVolume(speakerValue.value)
})

</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  text-align: center;
}
.modal__overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;

    background-color: black;
    opacity: 0.5;
    z-index: 1;
  }
.modal__btn-close {
    --button-color: #212529;
    --button-bg-color: #ffb0b1;
    --button-hover-bg-color: #faf4bd;
    border: 3px solid #faf4bd;
    width: 112px;
    height: 36px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
      "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--button-bg-color);
    color: var(--button-color);
    margin: 0;
    padding: 0.5rem 2rem;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 30px;
    display: inline-block;
    width: auto;
    cursor: pointer;
    transition: 0.5s;
  }
.modal__btn-close:hover, .modal__btn-close:active, .modal__btn-close:focus {
  border: 0 solid transparent;
  outline: 0;
}
.modal-box {
  position: absolute;
  top: 120px;
  left: 264px;
  z-index: 2;
}
.modal-content {
    /* background: #fff;
    border-radius: 20px; */
    width: 400px;
    padding: 50px;
    /* margin: 110px; */

    position: absolute;
    top: 120px;
    left: 264px;


    z-index: 50;
    display: flex;
    justify-content: center;   
}

.form-label {
  margin-right: 15px;
}
.body-component {
  margin-bottom: 0.5rem;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
      "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 700;
}
.form-range, progress {
  accent-color: #FFEB3B;
}
</style>