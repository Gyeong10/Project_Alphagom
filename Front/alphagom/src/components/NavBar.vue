<template>
  <div class="navBar">
    <BackGroundMusic />
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
      <!-- sidebar -->
      <!-- <div class="logo">
        <img src="@/assets/image/알파곰_표정_기본.png" alt="말해봐요 알파곰" /> 
      </div> -->

      <div class="menu-toggle-wrap">
        <div class="user-info">
          <img
            class="user-img"
            :src="userInfo.profile"
            alt="프로필 사진"
            height="20"
          />
          <text class="user-name">{{ userInfo.userNickname }} 님</text>
        </div>
        <button
          class="menu-toggle"
          style="background-color: transparent; border: 0; outline: 0"
          @click="ToggleMenu"
        >
          <Bars3Icon class="material-icons toggle" style="height: 20px" />
        </button>
      </div>

      <!-- <h3>메뉴</h3> -->
      <div class="menu">
        <router-link to="/" class="button">
          <HomeIcon class="material-icons" />
          <span class="text">처음으로</span>
        </router-link>
        <router-link to="/map" class="button">
          <MapIcon class="material-icons" />
          <span class="text">탐험하기</span>
        </router-link>
        <router-link to="/myPage" class="button">
          <UserIcon class="material-icons" />
          <span class="text">내 정보</span>
        </router-link>
        <!-- <router-link to="/setting" class="button">
          <Cog6ToothIcon class="material-icons" />
          <span class="text">설정하기</span>
        </router-link> -->
        <div class="button" @click="modalStore.updateModal()"
          style="cursor: pointer">
          <Cog6ToothIcon class="material-icons" />
          <span class="text">설정하기</span>
        </div>

        <!-- 유저 정보 들어오면 수정하세용 -->

        <!-- <router-link to="/logout" class="button">
          <ArrowLeftOnRectangleIcon class="material-icons" />
          <span class="text">로그아웃</span>
        </router-link> -->
      </div>
    </aside>
    <SettingModal v-if="modalStore.Modal" />
  </div>
</template>

<script setup>
import {
  HomeIcon,
  MapIcon,
  UserIcon,
  Cog6ToothIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import BackGroundMusic from "@/components/BackGroundMusic.vue";
import { storeToRefs } from "pinia";
import SettingModal from "@/views/Modal/SettingModal.vue";

// store 가져오기
const modalStore = useModalStore();

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  console.log("ToggleMenu func start");
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
  console.log(is_expanded.value);
  console.log("ToggleMenu func end");
};

const store = useAuthStore();
const { userInfo } = storeToRefs(store);
console.log(userInfo.userNickname);
</script>

<style lang="scss">
:root {
  --dark-red: #483737;
  --light-yellow: #fdf8e2;
  --primary: #94c178;
  --grey: #5e5e5e;
  --violet-alt: #7d4d87;
  --sidebar-width: 170px;
}
aside {
  position: absolute;
  z-index: 99;
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  margin: 0px;

  background-color: transparent;
  color: var(--dark-red);

  transition: 0.2s ease-out;

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  // 바 접힘
  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light-yellow);
        transform: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          // transform: translatex(0.5rem);
        }
      }
    }
  }

  h3,
  .button,
  .text,
  .user-info {
    opacity: 0;
    transition: 0.3s ease-out;
  }
  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .user-info {
    top: -100px;
  }
  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0, 5rem 1rem;
      transition: 0.2s ease-out;
      pointer-events: none;

      .material-icons {
        font-size: 2rem;
        height: 1.5rem;
        color: var(--dark-red);
        transition: 0.2s ease-out;
        margin: 0.25rem;
        margin-left: 1rem;
      }
      .text {
        color: var(--dark-red);
        transition: 0.2s ease-out;
        font-size: 0.85rem;
      }

      &:hover,
      ~ &.router-link-exact-active {
        background-color: var(--violet-alt);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  // 바 열림
  &.is-expanded {
    width: var(--sidebar-width);
    background-color: var(--light-yellow);

    .menu-toggle-wrap {
      // top: -3rem;
      display: flex;
      justify-content: space-between;

      .user-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        top: 0px;

        .user-img {
          margin-top: 6px;
          margin-right: 6px;
          border-radius: 50%;
          overflow: cover;
        }
        .user-name {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: -1px;
          margin-top: 5.5px;
        }
      }
      .menu-toggle {
        transform: rotate(-180deg);
        .toggle {
          color: var(--primary);
        }
      }
    }
    h3,
    .button,
    .text,
    .user-info {
      opacity: 1;
    }
    .button {
      pointer-events: auto;
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 926px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
