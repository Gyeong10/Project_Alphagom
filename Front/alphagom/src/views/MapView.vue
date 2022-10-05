<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="title">탐험하기</div>
    <BackButton class="back-btn" />
    <div class="map-road-cont">
      <img class="img-map-road" src="/assets/image/map-road.svg" alt="지도 도로" />
    </div>
    <div class="map-cont">
      <div class="magic-castle">
        <button
          class="btn-style-remove" type="button"
          @click="clickMapItem('magicCastleStartView')"
        >
          <img class="img-magic-castle" src="/assets/image/magic_castle.png" alt="마법의 성"/>
          <text style="marginTop: -30px; marginLeft: -30px;">마법의 성</text>
        </button>
      </div>
      <div class="dark-cave">
        <button
          class="btn-style-remove" type="button"
          @click="clickMapItem('darkCaveStartView')"
        >
          <img class="img-dark-cave" src="/assets/image/dark_cave.png" alt="어둠의 동굴"/>
          <text style="marginTop: -15px;">어둠의 동굴</text>
        </button>
      </div>
      <div class="swamp">
        <button
          class="btn-style-remove" type="button"
          @click="clickMapItem('swampStartView')"
        >
          <img class="img-swamp" src="/assets/image/swamp.png" alt="늪"/>
          <text style="marginTop: -15px;">늪</text>
        </button>
      </div>
      <div class="sky">
        <button 
          class="btn-style-remove" type="button"
          @click="clickMapItem('skyStartView')"
        >
          <img class="img-sky" src="/assets/image/sky.png" alt="하늘"/>
          <text style="marginTop: -40px;">하늘</text>
        </button>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import BackButton from "@/components/BackButton.vue";
import { useRouter, useRoute } from 'vue-router';
import { useBgStore } from "@/stores/bg"
import { computed, onMounted } from 'vue'

// 배경 경로 수정
onMounted (() => {
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/map_bg_picture_filter_low.png")'
  console.log(bgStore.bgUrlState.value)
})
const bgStore = useBgStore()
// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState)

const router = useRouter();
const route = useRoute();
const clickMapItem = name => {
  switch (name) {
    case 'magicCastleStartView':
    case 'swampStartView':
    case 'darkCaveStartView':
    case 'skyStartView':
      router.push({ name });
      break;
    default:
      break;
  }
}

</script>

<style scoped>
.container-bg {
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}
.title {
  position: absolute;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #483737;
  top: 8px;
  left: 418px;
  white-space: nowrap;
}
.back-btn {
  position: absolute;
  top: 20px;
  left: 884px;
}
.map-road-cont {
  position: absolute;
  top: 154px;
  left: 242px;
}
.img-map-road {
  width: 455.5px;
}
.btn-style-remove {
  background-color: transparent;
  border: 0;
  outline: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.map-cont {
  position: absolute;
  left: 0;
}
/* 이미지 크기 */
.img-magic-castle {
  width: 225px;
  height: 180px;
}
.img-dark-cave {
  width: 213px;
  height: 171px;
}
.img-swamp {
  width: 283px;
  height: 128px;
}
.img-sky {
  width: 285px;
  height: 128px;
}
/* 컨테이너 위치 */
.magic-castle {
  position: absolute;
  top: 79px;
  left: 116px;
}
.dark-cave {
  position: absolute;
  top: 211px;
  left: 274px;
}
.swamp {
  position: absolute;
  top: 105px;
  left: 419px;
}
.sky {
  position: absolute;
  top: 233px;
  left: 561px;
}
text {
  position: relative;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #483737;
}
</style>