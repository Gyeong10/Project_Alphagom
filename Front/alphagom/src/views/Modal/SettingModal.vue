<template>
  <div v-if="settingopen" class="setting-modal" tabindex="-1">
    <div class="modal-content">
      <br>
      <div class="modal-body">
        <!-- 마이크 감도 -->
        <!-- 스피커 크기 -->
      </div>
      <div class="modal-footer">
        <span type="button" class="next-btn" data-bs-dismiss="modal">다음 탐험으로</span>        
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'SettingModal',
  components: {  },
  setup() {
      
  }


}
</script>

<style scoped>

</style>