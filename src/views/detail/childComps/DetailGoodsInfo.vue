<template>
  <!-- 详细图片信息就是最多的图片 -->
  <div v-if="Object.keys(detailInfo).length!==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
        <div></div>
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end">
        <div></div>
      </div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img @load="imgLoad" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="">
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:'DetailGoodsInfo',
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        counter:0,
        imagesLength:0
      }
    },
    methods:{
      imgLoad(){
        // 判断,所有的图片都加载完了,那么进行一次回调就可以了
        if (++this.counter ===this.imagesLength){
          this.$emit('imageLoad')
          // console.log('1')
        }
      }
    },
    watch:{
      detailInfo(){
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  })
</script>

<style scoped>
  .goods-info{
    padding:20px 0;
    border-bottom:5px solid #f2f5f8;
  }
  .info-desc{
    font-size:13px;
    /* background:red; */
    padding:0px 8px;
    position:relative;
  }
  .info-desc .desc{
    margin-bottom:10px;
    margin-left:10px;
    margin-right:8px;
  }
  .info-desc .start{
    width:100px;
    background:black;
    border-bottom:1px solid #333;
    height:1px;
    margin-bottom:10px;
  }
  .start div{
    width:4px;
    height:4px;
    background:#333;
  }
  .end div{
    width:4px;
    height:4px;
    background:#333;
    position:absolute;
    right: 0;
    top:-3px;
  }
  .info-desc .end{
    width:100px;
    border-bottom:.5px solid #333;
    height:1px;
    position:absolute;
    right:8px;
  }
  .info-list img{
    width:100%;
    margin-top:0px;
  }
  .info-key{
    font-size: 14px;
    margin:10px 8px;
    margin-top:20px;
  }
</style>