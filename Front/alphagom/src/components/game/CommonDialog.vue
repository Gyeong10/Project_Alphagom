<template>
    <div class="common">
        <img v-if="game.imgBody" :src="game.getImgUrl(game.imgBody)" width="50">
        <img v-if="game.faceImg" :src="game.getImgUrl(game.faceImg)" width="50">
        <div class="scriptText">
            <h1>{{ game.script.char }}</h1>
            <p>{{ game.script.line1 }}</p>
            <p>{{ game.script.line2 }}</p>
        </div>
        <button @click="game.plusNum()">다음으로오오오오오</button>
        <button @click="game.skip()">스으으으으으킵</button>
        <button v-if="game.isActive" @click="game.plusNum()">버튼트튼</button>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    // import { defineStore } from 'pinia';
    import { computed, ref } from 'vue';
    import DarkcaveLine from '@/assets/dialog/DarkcaveLine.json';
    import { useGameStore } from "@/stores/game";
    // import { skyDialog } from '@/assets/dialog/SkyLine.json';
    // import { swampDialog } from '@/assets/dialog/SwampLine.json';
    
    const game = useGameStore();

</script>

<style>
.common {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scriptText {
    color: black;
}
</style>