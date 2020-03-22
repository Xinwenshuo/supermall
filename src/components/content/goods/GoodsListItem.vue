<template>
<!-- 首页的商品信息 -->
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="itemImageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:"GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    //事件总线更新图片
    methods:{
      itemImageLoad(){
        this.$bus.$emit('itemImage')
        // console.log('1')
      },
      itemClick(){
        // console.log('详情页点击')
        //用动态路由跳转传参id
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
  })
</script>

<style scoped>
  .goods-item{
    padding-bottom:40px;
    position: relative;
    width:48%;
  }
  .goods-item img{
    width:100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left:0;
    right:0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-info .price{
    color:var(--color-high-text)
  }
  .goods-info .collect{
    position:relative;
    left:30px;
  }
  .goods-info .collect::before{
    content:'';
    position: absolute;
    left:-15px;
    top:1px;
    width:14px;
    height:14px;
    background:url("~assets/img/common/collect.svg")0 0/14px 14px;
  }
</style>