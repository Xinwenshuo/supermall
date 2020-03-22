<template>
 <!-- 四个小圆圈 -->
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index" >
      <a href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:"RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  })
</script>

<style scoped>
  .recommend{
    display: flex;
    width:100%;
    text-align:center;
    font-size: 12px;
    padding-top:10px;
    padding-bottom:20px;
    border-bottom:10px solid #eee;
  }
  .recommend-item{
    flex:1; 
  }
  .recommend-item img{
    width:80% ;
    margin-bottom:10px;
  }
</style>