<template>
  <div>
    <div v-if="!record.state">
      <div class="explain">답을 생각하고 말해줘!</div>
      <div class="count" v-if="timer > 0">{{ timercount }}</div>
    </div>
    <div class="explain now" v-if="record.state">지금 정답을 말해줘!</div>
    <audio ref="audioPlayer"></audio>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game";
import { ref, reactive, computed } from "vue";

const store = useGameStore();
const VoiceFile = computed(() => store.VoiceFile);
const VoiceOnOff = computed(() => store.VoiceOnOff); // 녹음기능 켜기 (true)와 끄기 (false)
const RecordTime = computed(() => store.RecordTime); // 녹음기능 시간 주기
const record = reactive({ state: false });
const audioPlayer = ref();

let timer = ref(3); // 3초 뒤 녹음 시작하기 위한 timer
const timercount = computed(() => timer); // timer 변화를 담을 state (3 -> 2 -> 1)

// 녹음기능 관련 변수 선언
let recorder = null;
let mimeType = "audio/x-pn-wav";
let chunks = []; // chunks 는 음성 데이터 조각 모음이라는데 이해는 안되나 작동이 되므로 괜히 고치지 않고 냅뒀음
let data = new FormData(); // 녹음된 음성을 담을 데이터

// 녹음기능 끄기 (false), 다시 게임 View 로 돌아감
const changecall = () => {
  store.VoiceOnOff = false;
};

// 녹음기능 시작하며 setTimeout으로 지정 시간만 녹음 하도록 해뒀다
// 여기에 지정시간을 나타낼 상태바 필요할 듯

// nickname, yesorno 같은 경우 이미 store 에서 녹음 시간을 지정해뒀다
// 하지만 게임 view 에서는 미리 녹음 시간 state 줘야 한다

const startRecording = () => {
  record.state = true;
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, store.RecordTime );
};
// 녹음 시작 전 3 초간 타이머
const interval = setInterval(() => {
  if (timer.value === 0) {
    startRecording();
    clearInterval(interval);
    timer.value = 3;
  } else {
    timer.value--;
  }
}, 1000);

// 여기서부터 녹음기능 시작 (권한 요청 후 녹음 후 데이터 저장까지)
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })

    .then(function (stream) {
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      recorder.onstop = function () {
        // 녹음 과정 (알 필요 없음)
        const blob = new Blob(chunks, { type: mimeType });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        audioPlayer.value.src = audioURL;

        // 여기에서 녹음 데이터가 담긴다
        data.append("audio_data", blob);
        // 지정해 둔 state 에 저장
        store.VoiceFile = data;
        // data 다시 리셋
        data = new FormData();
        // 녹음기능 끄기 (false)
        changecall();
      };
    })

    // 에러 로그 표시
    .catch(function (err) {
      console.log("The following getUserMedia error occured: " + err);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}
</script>
<style scoped>
.explain {
  position: absolute;
  top: 351px;
  left: 355px;

  font-size: 24px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #fff;
  text-align: center;
  line-height: 29px;
}
.count {
  position: absolute;
  top: 240px;
  left: 420px;

  font-size: 128px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-weight: 800;
  white-space: nowrap;
  color: #F48196;
  text-align: center;
  line-height: 29px;
}
.now {
  left: 370px;
}
</style>
