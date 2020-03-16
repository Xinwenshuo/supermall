<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <scroll 
      class="content" 
      ref="scroll" 
      :probeType="3"
      @scroll="contentScroll"
      :pullingUp="true"
      @pullingUp='loadMore'>
      <!-- 轮播图 -->
      <home-swiper :banners='banners'></home-swiper>
      <!-- 四个小圆圈 -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行 -->
      <feature-view />
      <!-- 商品数据标题 -->
      <tab-control @tabClick='tabClick' class="tab-control" :titles="['流行','新款','精选']" />
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'


  import NavBar from '../../components/common/navbar/NavBar.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  import BackTop from '../../components/content/backTop/BackTop.vue'


  import {getHomeMultidata,getHomeGoods} from '../../network/home'


  export default Vue.extend({
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners: [],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},

        },
        currentType:'pop',
        isShowBackTop:false,
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      a(){
        // console.log(this.banners)
        // console.log(this.recommends)
      },
      /**
       * 事件监听相关的方法
       */
      // 判断是商品信息类型的(流行,新款,精选)
      tabClick(index){
        // console.log(index)
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      // 点击返回顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      // 判断返回顶部的图片是否隐藏
      contentScroll(position){
        this.isShowBackTop = (-position.y) >1000
      },

      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
        // this.$refs.scroll.scroll.refresh()
      },

      /**
       * 网络请求相关的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          // console.log(this.goods);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+1;
        })
      }
    },
    created(){
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      // 监听item中图片加载完成
      this.$bus.$on('itemImage',()=>{
        this.$refs.scroll.refresh()
      })
    },
  })
</script>

<style scoped>
  #home{
    height:100vh;
    padding-top: 44px;
    position:relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color:#fff;
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
  .tab-control{
    position:sticky;
    top:44px;
    z-index: 9;
  }
  .content{
    position:absolute;
    top:44px;
    bottom:49px;
    left:0px;
    right: 0px;
  }
  /* .content{
    height:calc(100% - 93px);
    overflow: hidden;
    margin-top:44px;
  } */
</style>