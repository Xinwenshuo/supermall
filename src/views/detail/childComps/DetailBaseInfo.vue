<template>
<!-- 轮播图下边的商品详情 -->
  <div class="base-info" v-if="Object.keys(goods).length !==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount" >{{goods.discount}}</span>
    </div>
    <div class="info-other" >
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for='(index) in goods.services.length-1' :key='index'>
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
    <!-- <button @click="aaa" >1111</button> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:'DetailBaseInfo',
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      },
    },
    methods:{
        aaa(){
          // console.log(this.goods)
        }
      }
  })
</script>

<style scoped>
  .base-info{
    padding:18px 8px 8px 10px;
  }
  .info-title{
    font-size: 17px;
    color:#222;
  }
  .info-price{
    margin-top:10px;
    position:relative;
  }
  .info-price .n-price{
    color:var(--color-high-text);
    font-size:22px;
  }
  .info-price .o-price{
    font-size:14px;
    text-decoration:line-through;
    margin:0px 7px;
  }
  .info-price .discount{
    background:var(--color-high-text);
    color:#fff;
    font-size: 11px;
    padding:3px;
    border-radius:50px;
    position:absolute;
  }
  .info-other{
    display:flex;
    margin-top:15px;
    margin-bottom: 10px;
    border-bottom:1px solid #f2f5f8;
    color:#999;
    line-height: 40px;
  }
  .info-other span{
    font-size: 13px;
  }
  .info-service{
    display:flex;
    justify-content:space-between;
    border-bottom:5px solid #f2f5f8;
    height:40px;
  }
  .info-service-item{
    
    margin-top:5px;
    font-size: 12px;
    color:#777;
  }
  .info-service-item img{
    width:13px;
    margin-bottom:-3px;
    margin-right: 3px;
  }
</style>