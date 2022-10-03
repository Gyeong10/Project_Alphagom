<template>
  <div v-if="updateModalOpen" class="mypage-update-modal" tabindex="-1">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h5 class="modal-title"></h5> -->
        <button @click="$emit('update:updateModalOpen', !updateModalOpen)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <br>
      <div class="modal-body">
        <div class="title">별명 수정</div>
        <div>
          <input 
            type="email"
            v-model="nick"
            placeholder="10자 이하로 입력해주세요."
            @keyup="setNick">
          <button class="update-btn" @click="updateNick">수정하기</button>
        </div>
      </div>
      <!-- <div class="modal-footer">            
      </div> -->
    </div>
  </div>

</template>

<script>
import { reactive } from '@vue/reactivity'
// import { ref, computed } from 'vue';

export default {
  name: 'MyPageUpdateModal',
  components: {  },
  props:{
    updateModalOpen: Boolean,
  },
  setup() {
    const state = reactive({
      nick: "",
    })

    const UpdateMyPageClose = () => {
      console.log(this.updateModalOpen)
      this.$emit('update:updateModalOpen', false)
        
    }

    const setNick = (e) => {
        this.nick = e.target.value
    }

    // const updateNick = () => {

    // }


  return {
    UpdateMyPageClose,
    setNick,
    state

  }
  }
}
</script>

<style scoped>
.mypage-update-modal {
  width: 400px;
  height: 300px;
  border-radius: 18px;
  border: 18px dashed #94C178;
  background-color: #FAF4BD;
  z-index: 90;

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