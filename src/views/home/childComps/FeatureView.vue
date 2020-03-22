<template>
<!-- 本周流行就是内张图片 -->
  <div class="feature">
    <a href="https://act.mogujie.com">
      <img src="~assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:'FeatureView'
  })
</script>

<style scoped>
  .feature img{
    width:100%;
  }
</style>