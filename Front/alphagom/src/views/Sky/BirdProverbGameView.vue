<template>

  <div>
    <MicRecord v-if="recordcall" />
    <div v-if="!recordcall && problems">
      점수 : {{ score }}
      <div>
      <h2>{{problems[probidx].sentance}}</h2>
      <div v-for="(exam, idx) in problems[probidx].example" :key="idx">
      <h2>{{exam}}</h2>
    </div>
    </div>
    <!-- 참새 이미지 때문에 정답이 안보여서 div 태그 정리 후 사용 예정-->
    <!-- <img class="chansae" src="@/assets/image/참새_2.png" width="200" @click="getRecord()"/> -->
    <!--그때까지 임시 버튼-->
    <button @click="getRecord()">녹음 버튼을 옆으로 밀기 귀찮으니까 일단 길게!</button>
    <div v-if="answer === problems[probidx].answer && answer">
      정답이야!
      <button v-if="!nextpage" @click="getProb()">다음 문제로 가보자구!</button>
      <button v-if="nextpage" @click="getNextPage()">전부 통과! 축하해!</button>
      </div>
      <div v-if="answer !== problems[probidx].answer && answer">
      아쉽지만 오답이야! <button @click="getRecord()">다시 해보자!</button>
      </div>
      </div>
    </div>

</template>

<script setup>

import MicRecord from '@/components/game/MicRecord.vue'
import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import { useRouter, useRoute } from 'vue-router'

// 페이지가 렌더링 되자마자 마운트한다 (게임 받아오기)
onMounted (() => {
  store.getBirdGame()
})
// 스토어 가져오기
const store = useGameStore()
// 라우터 사용
const router = useRouter()
const route = useRoute()
// 내부 요소들 선언 
const problems = computed(() => store.GameList) // 의성어/의태어 구성 요소 (문제, 답) 저장
const recordcall = computed(() => store.VoiceOnOff) // 녹음기능 켜고(true) 끄는(false) 값 저장
const recordfile = computed(() => store.VoiceFile) // 녹음된 파일 들고오기
const answer = computed(() => store.Answer) // Flask 에서 들고 온 플레이어의 답 저장
const score = computed(() => store.SkyScore) // 늪에서의 게임 점수 저장
const probidx = ref(0) // BE 에서 받아온 문제들의 인덱스값

// (임시) 끝났을 때 라우트 주기 위한 state
const nextpage = computed(() => store.GameEnd)

// true 값이면 녹음기가 켜진다 (MicRecord.Vue)
const getRecord = () => {
    store.VoiceOnOff = true
}
// watch 로 녹음 파일 들어오는지 확인 후 바로 API 함수 실행
watch(recordfile, () => store.getBirdAI(store.VoiceFile))

// 마지막 문제인지 확인하고, 정답 맞춘 후 다음 페이지로 라우트 시키기 위한 함수
// 임시 데이터에선 문제가 1개라 length === 1 조건 추가
const getProb = () => {
  probidx.value++
  if ( probidx.value + 1 === problems.value.length )
  { store.Answer = null
  store.GameEnd = true }
  else 
  store.Answer = null
}

// 점수 1초당 10점씩 깎기
const interval = setInterval(() => {
  if ( store.SkyScore === 0 )
  clearInterval(interval)
  else store.SkyScore = store.SkyScore - 10
}, 1000);

// 다시 에필로그 페이지로 렌더링 (라우터 재설정 필요! 에필로그 페이지로 렌더링 되도록)
const getNextPage = () => {
  router.push('BirdProverbGame')
}
</script>