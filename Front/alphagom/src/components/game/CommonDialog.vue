<template>
  <MicRecord v-if="recordcall" />
  <div v-if="!recordcall" class="common">
    <!-- <img v-if="store.imgBody" :src="store.getImgUrl(store.imgBody)" width="50">
        <img v-if="store.faceImg" :src="store.getImgUrl(store.faceImg)" width="50"> -->
        <!-- <img class="character-body-img" v-if="store.imgBody" :src="store.imgBody" alt="캐릭터 전신"> -->
        <div class="scriptText">
            <!-- <h1>{{ store.getImgUrl(game.textboxImg) }}</h1> -->
            <img class="character-body-img" v-if="store.imgBody" :src="store.imgBody" alt="캐릭터 전신">
            <img class="text-box-img" :src="store.textboxImg" width="656" alt="대화상자">
            <h1 class="script-char-name">{{ store.script.char }}</h1>
            <p class="script-line1">{{ store.script.line1 }}</p>
            <p class="script-line2">{{ store.script.line2 }}</p>
            <img class="character-face-img" v-if="store.imgFace" :src="store.imgFace" alt="캐릭터 표정">
        </div>
        <div v-if="!store.isActive">
            <button class="script-btn" @click="store.plusNum()">다음대화</button>
            <button class="script-btn pass-btn" @click="store.skip()">건너뛰기</button>
        </div>
        <button class="script-btn answer-btn" v-if="store.isActive" @click="getRecord()">대답하기</button>
    </div>
    <div v-if="!store.isActive">
      <button @click="store.plusNum()">다음으로!</button>
      <button @click="store.skip()">건너뛰기</button>
    </div>
    <button v-if="store.isActive" @click="getRecord()">대답하기!</button>
  </div>
</template>

<script setup>
// import { defineStore } from 'pinia';
// import { skyDialog } from '@/assets/dialog/SkyLine.json';
// import { swampDialog } from '@/assets/dialog/SwampLine.json';
import { useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import DarkcaveLine from "@/assets/dialog/DarkcaveLine.json";
import { useGameStore } from "@/stores/game";
import MicRecord from "@/components/game/MicRecord.vue";

const store = useGameStore();

const recordcall = computed(() => store.VoiceOnOff); // 녹음기능 켜고(true) 끄는(false) 값 저장
const recordfile = computed(() => store.VoiceFile); // 녹음된 파일 들고오기
const answer = computed(() => store.Answer); // Flask 에서 들고 온 플레이어의 답 저장

// true 값이면 녹음기가 켜진다 (MicRecord.Vue)
const getRecord = () => {
  store.VoiceOnOff = true;
};

// watch 로 녹음 파일 들어오는지 확인 후 바로 API 함수 실행
watch(recordfile, () => store.getCheckAI(store.VoiceFile));
// watch 로 answer 들어오는지 확인 후 바로 checkyesorno (대사 넘기기) 함수 실행
watch(answer, () => store.checkyesorno());

const game = useGameStore();
</script>

<style>
.common {
    position: absolute;
    width: 100vw;
    height: 100vh;
}
.text-box-img {
    position: absolute;
    top: 231px;
    left: 135px;
}
/* .character-body-img {
    position: absolute;
    bottom: 325px;
    left: 200px;
    height: 300px;
} */
.script-char-name {
    position: absolute;
    top: 243px;
    left: 187px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
}
.script-line1 {
    position: absolute;
    top: 290px;
    left: 185px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #483737;
    white-space: nowrap;
}
.script-line2 {
    position: absolute;
    top: 310px;
    left: 185px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #483737;
    white-space: nowrap;
}
.character-body-img {
    position: absolute;
    bottom: -370px;
    left: 200px;
    height: 300px;
}
.character-face-img {
    position: absolute;
    bottom: -330px;
    left: 666px;
    /* height: 300px; */
    width: 50px;
}
.script-btn {
    position: absolute;
    top: 332px;
    left: 630px;

    border:none;
    background-color: transparent;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #345A49;
    white-space: nowrap;
    padding: 0;
}
.script-btn:focus,
.script-btn:active {
    outline: none;
    box-shadow: none;
}
.pass-btn {
    position: absolute;
    top: 332px;
    left: 697px;
    color: #F48196;
}
.answer-btn {
    position: absolute;
    top: 332px;
    left: 663px;
}
</style>