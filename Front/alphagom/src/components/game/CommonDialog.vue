<template>
    <MicRecord v-if="recordcall" />
    <div v-if="!recordcall" class="common">
        <img v-if="store.imgBody" :src="store.getImgUrl(store.imgBody)" width="50">
        <img v-if="store.faceImg" :src="store.getImgUrl(store.faceImg)" width="50">
        <img :src="store.getImgUrl(store.textboxImg)" width="500">
        <div class="scriptText">
            <h1>{{ store.getImgUrl(game.textboxImg) }}</h1>
            <h1>{{ store.script.char }}</h1>
            <p>{{ store.script.line1 }}</p>
            <p>{{ store.script.line2 }}</p>
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

import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue'
import DarkcaveLine from '@/assets/dialog/DarkcaveLine.json';
import { useGameStore } from "@/stores/game";
import MicRecord from '@/components/game/MicRecord.vue'

const store = useGameStore();

const recordcall = computed(() => store.VoiceOnOff) // 녹음기능 켜고(true) 끄는(false) 값 저장
const recordfile = computed(() => store.VoiceFile) // 녹음된 파일 들고오기
const answer = computed(() => store.Answer) // Flask 에서 들고 온 플레이어의 답 저장

// true 값이면 녹음기가 켜진다 (MicRecord.Vue)
const getRecord = () => {
    store.VoiceOnOff = true
}

// watch 로 녹음 파일 들어오는지 확인 후 바로 API 함수 실행
watch(recordfile, () => store.getCheckAI(store.VoiceFile))
// watch 로 answer 들어오는지 확인 후 바로 checkyesorno (대사 넘기기) 함수 실행
watch(answer, () => store.checkyesorno())

</script>

<style>
.common {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scriptText {
    color: black;
}
</style>