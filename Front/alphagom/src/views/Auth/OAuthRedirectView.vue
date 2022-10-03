<template>
  <div></div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();
const token = route.query.token;

if (token) {
  store.dispatch("auth/saveToken", token);
  store.dispatch("auth/fetchUser");
}
router.replace("/board");
</script>
