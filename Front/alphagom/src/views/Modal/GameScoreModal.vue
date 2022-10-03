<template>
  <div>우와아아 점수다</div>
  <div v-if="stageclear" class="score-modal" tabindex="-1">
    <div class="modal-content">
      <!-- <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button @click="$emit('update:stageclear', !stageclear)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> -->
      <br>
      <div class="modal-body">
        <ul>
          <li>축하합니다! </li>
          <!-- 점수 받아와야 됨 -->
          <li>1000000점</li>
        </ul>
      </div>
      <div class="modal-footer">
        <span @click="$emit('update:stageclear', !stageclear)" type="button" class="next-btn" data-bs-dismiss="modal">다음 탐험으로</span>        
      </div>
    </div>
  </div>

</template>

<script>
// import { reactive } from '@vue/reactivity'
export default {
  name: 'GameScoreModal',
  components: {  },
  props :{
    stageclear : Boolean,
  },
  setup() {
    // const state = reactive({
    // })

    const ScoreModalClose = () => {
      console.log(this.stageclear)
      this.$emit('update:stageclear', false)
        
    }

    return {
      ScoreModalClose,
      // state

    }
  }
}
</script>

<style scoped>
.score-modal {
  width: 60vw;
  height: 70vh;
  border-radius: 18px;
  border: 18px dashed #FAF4BD;
  background-color: #94C178;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

}

.modal-body {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}


</style>