<template>
  <div>
    <CommonDialog></CommonDialog>
  </div>
</template>

<script>
import { useGameStore } from "@/stores/game";
import CommonDialog from "@/components/game/CommonDialog.vue";

export default {
  name: "MagicCastleDialogView",
  components: {
    CommonDialog,
  },
  setup() {
    const game = useGameStore();
    game.setStage("MagicCastle");

    return {};
  },
};
</script>

<style scoped></style>
