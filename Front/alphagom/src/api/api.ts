// 배포 전까지 임시 로컬 호스트
const HOST = "http://localhost:8080/api/";
const HOSTAI = "http://127.0.0.1:5678/api/"

const BE = "be/";
const AI = "ai/";

const AUTH = "auth/";
const GAME = "game/";
const RANK = "rank/";
const USER = "user/";

export default {
  auth: {
    // 로그인
    login: () => HOST + BE + AUTH + "login",
  },
  user: {
    // 유저 정보 조회
    getUser: (userId: number) => HOST + BE + USER + `${userId}`,
    // 유저 정보 변경
    postUserInfo: (userId: number) =>
      HOST + BE + USER + `${userId}` + `profile`,
    // 유저 회원 탈퇴
    deleteUser: (userId: number) => HOST + BE + USER + `${userId}` + `profile`,
    // 유저 게임 로그 조회
    getUserLog: (userId: number) => HOST + BE + `log/` + USER + `${userId}`,
    // 유저 닉네임 저장
    postUserNickname: (userId: number, nickname: string) =>
      HOST + BE + USER + `${userId}` + nickname + `${nickname}`,
    // 유저 튜토리얼 완료
    putUserCastle: (userId: number) =>
      HOST + BE + USER + `${userId}` + `castle`,
    // 유저 점수 저장
    postUserScore: (userId: number) =>
      HOST + BE + `point/` + USER + `${userId}`,
    // 유저 게임 클리어 여부 조회
    getClearGame: (userId: number) => HOST + BE + `game/` + USER + `${userId}`,
  },
  game: {
    // 늪 의성어/의태어 문제 제공
    getSwampWord: () => HOST + BE + GAME + `swamp/` + `word`,
    // 동굴 젠말놀이 문제 제공
    getCaveTongue: () => HOST + BE + GAME + `cave/` + `tonguetwister`,
    // 하늘 새 속담 문제 제공
    getSkyBird: () => HOST + BE + GAME + `sky/` + `bird`,

    // 응, 아니 인식
    yesOrNo: () => HOSTAI + AI + `check`,
    // 의성어 / 의태어 인식
    aiSwampWord: () => HOSTAI + AI + `swamp/` + `word`,
    // 새 이름 인식
    aiSkyBird: () => HOSTAI + AI + `sky/` + `bird`,
  },
  rank: {
    // 전체 유저 랭크 조회
    getAllUserRank: (tag: string) => HOST + BE + RANK + `${tag}`,
    // 해당 유저 랭크 조회
    getUserRank: (userId: number, tag: string) =>
      HOST + BE + RANK + `user/` + `${userId}` + `${tag}`,
  },
  test: {
    testApi: () => `http://localhost:8080/api/v1/` + `test`,
    testKingAI: () => HOSTAI + AI + `king`,
    testBirdAI: () => HOSTAI + AI + `bird`,
  },
};
