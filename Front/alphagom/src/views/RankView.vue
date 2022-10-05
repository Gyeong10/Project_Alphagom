<template>
  <div>
    <div class="container-bg"></div>
    <text class="top-title">내 정보</text>
    <div class="box">
      <div class="box-header">
        <button @click="setTabstage('all')">전체 순위---------</button>
        <button @click="setTabstage('swamp')">늪 순위</button>
        <button @click="setTabstage('cave')">동굴 순위</button>
        <button @click="setTabstage('sky')">하늘 순위</button>
        <div class="box-body">
          <div class="box-body-left">
            <!-- 유저 사진 -->
            <div class="my-avatar">
              <!-- <img :src="user.userInfo.profile" alt="" class="myphoto" /> -->
              <!-- <img src="@/assets/image/alphagom_look_normal.png" alt="프사" class="myimg"> -->
            </div>
            <!-- 유저 랭크 -->
            <div class="my-rank">
              <span>{{ user.userInfo.userNickname }}</span>
              <span>님의 순위는</span>
              <p>{{ AllMyRank.rank }}위입니다.</p>
            </div>
          </div>
          <div class="box-body-right">
            <!-- 1,2,3순위 보여주기 -->
            <table>
              <tbody>
                <tr v-for="rankData in AllRankList" :key="rankData.nickName">
                  <th>{{ rankData.rank }}위</th>
                  <td>{{ rankData.nickName }}</td>
                  <td>{{ rankData.score }}</td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
import { useBgStore } from "@/stores/bg";
import { computed, onMounted, ref } from 'vue';
import { useRankStore } from "@/stores/rank";
import { useAuthStore } from "@/stores/auth";

// 배경 경로 수정
onMounted (() => {
  // mount 되자마자 all 순위 api 요청 해야한다
  rank.getAllRank("all");
  rank.getMyRank(user.userInfo.userId, "all");
  // store의 bgUrlState 값을 직접 변경
  bgStore.bgUrlState = 'url("/map_bg_picture_filter_low.png")'
  // console.log(bgStore.bgUrlState.value)
})

// state 감시자
const bgwatching = computed(() => bgStore.bgUrlState)

const rank = useRankStore();
const user = useAuthStore();
const bgStore = useBgStore();

// 전체 랭크
// const AllRankList = ref([])
// 나의 랭크
// const AllMyRank = ref(null)

// 전체 랭크 저장
const AllRankList = computed(() => rank.AllRankList);
// 나의 랭크
const AllMyRank = computed(() => rank.AllMyRank);

// 스테이지 버튼 누르면 해당 순위 정보 받아오기
function setTabstage(data) {
  // rank.tabStage.value = "all"
  if (data == "all") {
    // AllRankList 에 들어있는 키 gameTag 도 all
    // AllRankList.value = rank.AllRankList.value
    // AllMyRank.value = rank.AllMyRank.value
    rank.getAllRank("all")
    console.log(rank.AllRankList)
  } else if (
    data == "swamp"
  ) {
    // AllRankList.value = rank.AllRankList.value
    // AllMyRank.value = rank.AllMyRank.value
    rank.getAllRank("swamp")
    console.log(rank.AllRankList)
  }
  else if (
    data == "cave"
  ) {
    // AllRankList.value = rank.AllRankList.value
    // AllMyRank.value = rank.AllMyRank.value
    rank.getAllRank("cave")
    console.log(rank.AllRankList)
  }
  else if (
    data == "sky"
  ) {
    // AllRankList.value = rank.AllRankList.value
    // AllMyRank.value = rank.AllMyRank.value
    rank.getAllRank("sky")
    console.log(rank.AllRankList)
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
</style>