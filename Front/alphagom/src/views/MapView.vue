<template>
  <div class="container">
    <div class="container-bg"></div>
    <div class="map-road-cont">
      <img class="img-map-road" src="@/assets/image/map-road.svg" alt="지도 도로" />
    </div>
    <div class="map-cont">
      <div class="magic-castle">
        <button
          class="btn-style-remove" type="button"
          @click="clickMapItem('magicCastleStartView')"
        >
          <img class="img-magic-castle" src="@/assets/image/magic_castle.png" alt="마법의 성"/>
          <text style="marginTop: -30px; marginLeft: -30px;">마법의 성</text>
        </button>
      </div>
      <div class="dark-cave">
        <button
          class="btn-style-remove" type="button"
          @click="clickMapItem('darkCaveStartView')"
        >
          <img class="img-dark-cave" src="@/assets/image/dark_cave.png" alt="어둠의 동굴"/>
          <text style="marginTop: -15px;">어둠의 동굴</text>
        </button>
      </div>
      <div class="swamp">
        <button
          class="btn-style-remove" type="button"
          @click="clickMapItem('swampStartView')"
        >
          <img class="img-swamp" src="@/assets/image/swamp.png" alt="늪"/>
          <text style="marginTop: -15px;">늪</text>
        </button>
      </div>
      <div class="sky">
        <button 
          class="btn-style-remove" type="button"
          @click="clickMapItem('skyStartView')"
        >
          <img class="img-sky" src="@/assets/image/sky.png" alt="하늘"/>
          <text style="marginTop: -40px;">하늘</text>
        </button>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';

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
  background-image: url("@/assets/image/map_bg_picture_filter_low.png");
  background-repeat: no-repeat;
  background-size: inherit;
  /* Add the blur effect */
  filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}
.map-road-cont {
  position: absolute;
  top: 170px;
  left: 231px;
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
  position: relative;
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
/* 컨테이너 크기 */
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
  font-size: 24px;
  font-weight: bolder;
}
</style>