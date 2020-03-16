<template>
  <div class="back-top">
    <img src="../../../assets/img/common/top.png" alt="">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:"BackTop"
  })
</script>

<style scoped>
  .back-top{
    position: fixed;
    right:10px;
    bottom:55px;
  }
  .back-top img{
    width:48px
  }
</style>