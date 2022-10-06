<template>
  <div>
    <div class="container-bg"></div>
    <text class="top-title">내 정보</text>
    <div class="box">
      <div class="box-header">
        <button class="tab-btn tab-all" @click="setTabstage('all')">전체 순위</button>
        <button class="tab-btn tab-swamp" @click="setTabstage('swamp')">늪 순위</button>
        <button class="tab-btn tab-cave" @click="setTabstage('cave')">동굴 순위</button>
        <button class="tab-btn tab-sky" @click="setTabstage('sky')">하늘 순위</button>
          <div class="box-body-left">
            <!-- 유저 사진 -->
            <div class="my-avatar">
              <img :src="user.userInfo.profile" alt="" class="myphoto" />
              <!-- <img src="@/assets/image/alphagom_look_normal.png" alt="프사" class="myimg"> -->
            </div>
            <!-- 유저 랭크 -->
            <div class="my-rank">
              <div class="my-rank-text"><span class="my-rank-text-bold">{{ user.userInfo.userNickname }}</span>
              님의 순위는</div>
              <div class="my-rank-text"><span class="my-rank-text-bold">{{ AllMyRank.rank }}</span>위입니다.</div>
            </div>
          </div>
          <div class="box-body-right">
            <!-- 1,2,3순위 보여주기 -->
            <table>
              <tbody>
                <tr class="rank-data-table" v-for="rankData in AllRankList" :key="rankData.nickName">
                  <th class="rank-data-text rank-data-rank">{{ rankData.rank }}위</th>
                  <tb class="rank-data-profile-img">
                    <div class="rank-data-avatar">
                      <!-- <img :src="user.userInfo.profile" alt="" class="rank-data-photo" /> -->
                      <!-- 백에서 프사까지 넘겨주면 소스 수정 -->
                      <img :src="rankData.picture" alt="해당 랭크 프사" class="rank-data-photo" />
                    </div>
                  </tb>
                  <td class="rank-data-text rank-data-nickname">{{ rankData.nickName }}</td>
                  <td class="rank-data-text rank-data-score">{{ rankData.score }}</td>
                </tr>
              </tbody>
            </table>
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
console.log('AllRankList' + AllRankList.value)
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
  /* 위 필터는 모바일 브라우저 대비 */
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  top: 0px;
  left: 0px;
  width: 926px;
  height: 428px;
}
.top-title {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #483737;
  white-space: nowrap;
  position: absolute;
  top: 8px;
  left: 427px;
}
.box {
  position: absolute;
  top: 81px;
  left: 138px;
  width: 651px;
  height: 281px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.4);
}
.tab-btn {
  width: 112px;
  height: 36px;
  /* margin-left: 19px; */

  outline: none;
  border: none;
  border-radius: 30px;
  outline: 0;
  cursor: pointer;

  font-size: 16px;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-weight: 700;
  white-space: nowrap;
}
.tab-btn:hover, .tab-btn:active, .tab-btn:focus {
  border: 3px solid #FAF4BD;
}
.tab-all {
  position: absolute;
  top: 9px;
  left: 87px;
  background-color: #94C178;
  color: #484E23;
}
.tab-swamp {
  position: absolute;
  top: 9px;
  left: 208px;
  background-color: #78C1AB;
  color: #34435A;
}
.tab-cave {
  position: absolute;
  top: 9px;
  left: 329px;
  background-color: #7888C1;
  color: #34385A;
}
.tab-sky {
  position: absolute;
  top: 9px;
  left: 450px;
  background-color: #BC78C1;
  color: #55345A;
}
/* 이 친구들을 묶으니 중앙정렬이 가능했다. 이 아이들 제외 다 absolute해서 위치를 지정했기 때문에 가능한 듯 */
.box-body-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 79px;
  left: 59px;
  width: 200px;
}
.my-avatar {
  /* position: absolute;
  top: 79px;
  left: 109px; */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 5px;
}

.myphoto {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.my-rank-text {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 140%;
  white-space: nowrap;
  text-align: center;
}
.my-rank-text-bold {
  font-size: 24px;
  font-weight: 800
}
.box-body-right {
  position: absolute;
  top: 60px;
  left: 299px;
  width: 298px;
  height: 201px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.4);
}
.rank-data-table {
  top: 13px;
  left: 21px;
}
.rank-data-text {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
  "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;}
.rank-data-rank {
  width: 40px;
  height: 53px;
}
.rank-data-profile-img {
  width: 47px;
  height: 53px;
}
.rank-data-avatar {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0;
  margin-top: 5px;
}
.rank-data-photo {
  width: 39px;
  height: 39px;
  object-fit: cover;
  /* margin-left: 10px; */
}
.rank-data-nickname {
  width: 119px;
  height: 53px;
  padding-left: 10px;
}
.rank-data-score {
  height: 53px;
}
</style>