<template>
<!-- 底部导航 -->
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:'TabBar'
  })
</script>

<style scoped>
  #tab-bar{
    display:flex;
    background:#f6f6f6;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    box-shadow: 0 -3px 1px rgba(100,100,100,.1)
  };
</style>