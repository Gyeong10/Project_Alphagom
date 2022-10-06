<template>
  <div>
    <div v-if="!record.state">
      <div class="explain">답을 생각하고 말해줘!</div>
      <div class="count" v-if="timer > 0">{{ timercount }}</div>
    </div>
    <div v-if="record.state">
      <svg class="mic-icon" width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="55.5" cy="55.5" r="55.5" fill="#FEA7A5"/>
        <path d="M56.306 63.8826C58.9852 63.8826 61.5547 62.8183 63.4492 60.9238C65.3437 59.0293 66.408 56.4598 66.408 53.7806V41.1532C66.408 38.474 65.3437 35.9045 63.4492 34.0101C61.5547 32.1156 58.9852 31.0513 56.306 31.0513C53.6268 31.0513 51.0574 32.1156 49.1629 34.0101C47.2684 35.9045 46.2041 38.474 46.2041 41.1532V53.7806C46.2041 56.4598 47.2684 59.0293 49.1629 60.9238C51.0574 62.8183 53.6268 63.8826 56.306 63.8826Z" fill="white"/>
        <path d="M73.9847 53.7809C73.9847 53.1111 73.7187 52.4687 73.245 51.9951C72.7714 51.5214 72.129 51.2554 71.4592 51.2554C70.7894 51.2554 70.1471 51.5214 69.6735 51.9951C69.1998 52.4687 68.9338 53.1111 68.9338 53.7809C68.9338 57.1299 67.6034 60.3417 65.2353 62.7098C62.8672 65.0779 59.6553 66.4083 56.3063 66.4083C52.9573 66.4083 49.7455 65.0779 47.3774 62.7098C45.0093 60.3417 43.6789 57.1299 43.6789 53.7809C43.6789 53.1111 43.4128 52.4687 42.9392 51.9951C42.4656 51.5214 41.8232 51.2554 41.1534 51.2554C40.4836 51.2554 39.8412 51.5214 39.3676 51.9951C38.894 52.4687 38.6279 53.1111 38.6279 53.7809C38.6329 58.0283 40.167 62.132 42.9495 65.3412C45.732 68.5504 49.5769 70.6504 53.7808 71.2572V76.5102H48.4521C47.8559 76.5102 47.2842 76.747 46.8627 77.1686C46.4412 77.5901 46.2044 78.1618 46.2044 78.7579V79.3135C46.2044 79.9096 46.4412 80.4813 46.8627 80.9029C47.2842 81.3244 47.8559 81.5612 48.4521 81.5612H64.1606C64.7567 81.5612 65.3284 81.3244 65.7499 80.9029C66.1715 80.4813 66.4083 79.9096 66.4083 79.3135V78.7579C66.4083 78.1618 66.1715 77.5901 65.7499 77.1686C65.3284 76.747 64.7567 76.5102 64.1606 76.5102H58.8318V71.2572C63.0357 70.6504 66.8807 68.5504 69.6632 65.3412C72.4457 62.132 73.9798 58.0283 73.9847 53.7809Z" fill="white"/>
      </svg>
      <div class="explain now">지금 정답을 말해줘!</div>
    </div>
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
  left: 360px;

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
  left: 423px;

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
.mic-icon {
  position: absolute;
  top: 197px;
  left: 407px;
}
.now {
  left: 370px;
}
</style>
