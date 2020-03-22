<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <!-- 商品数据标题 -->
    <tab-control  ref="tabControl1" @tabClick='tabClick' v-show="isTabFixed" class="tab-control" :titles="['流行','新款','精选']" />
    <scroll 
      class="content" 
      ref="scroll" 
      :probeType="3"
      @scroll="contentScroll"
      :pullingUp="true"
      @pullingUp='loadMore'>
      <!-- 轮播图 -->
      <home-swiper :banners='banners' @swiperImageLoaad='swiperImageLoaad'></home-swiper>
      <!-- 四个小圆圈 -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行 -->
      <feature-view />
      <!-- 商品数据标题 -->
      <tab-control class="tab-control1" ref="tabControl2" @tabClick='tabClick' :titles="['流行','新款','精选']" />
      <!-- 商品数据 -->
      <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    <!-- 点击回到顶部 -->
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
  import {debounce} from '../../common/utils.js'

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
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        itemImgListener:null
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
      //点击分类返回home首页屏幕停留当前位置
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
      // console.log(this.saveY)
    },
    //当页面不活跃时调用函数
    deactivated(){
      //保存Y值
      this.saveY = this.$refs.scroll.scroll.y ? this.$refs.scroll.scroll.y:0 ;
    // console.log(this.saveY)
    // 取消home全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
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
        //让两个商品数据标题的index一致
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index
      },
      // 点击返回顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      // 屏幕的滚动
      contentScroll(position){
        // 判断返回顶部的图片是否隐藏
        this.isShowBackTop = (-position.y) >1000
        // 决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多商品
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
        // this.itemImgListener()
        // this.$refs.scroll.scroll.refresh()
      },
      // 
      swiperImageLoaad(){
        console.log('等待图片加载')
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
    mounted(){
      // 手动点击一次商品数据标题
      this.tabClick(0)
      // 监听item中图片加载完成(debounce防抖)
      const refresh = debounce(this.$refs.scroll.refresh,100)
      // 对监听的时间进行保存
      this.itemImgListener = ()=>{
        // this.$refs.scroll.refresh()
        refresh(20,30,'abc')
        // console.log('2')
      }
      this.$bus.$on('itemImage',this.itemImgListener)
      
      // this.$bus.$on('itemImage',()=>{
      //   this.$refs.scroll.refresh()
      // })
    },
    created(){
      // console.log('hhh')
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品的数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
    position: relative;
    /* top:44px; */
    z-index: 9;
  }
  .tab-control1{
    position:sticky;
    top:44px;
    /* z-index: 9; */
  }
  .content{
    position:absolute;
    top:44px;
    bottom:49px;
    left:0px;
    right: 0px;
    overflow: hidden;
  }
  /* .content{
    height:calc(100% - 93px);
    overflow: hidden;
    margin-top:44px;
  } */
</style>