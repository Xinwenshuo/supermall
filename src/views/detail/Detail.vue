<template>
<!-- 详情页 -->
  <div id="detail">
    <!-- 头部导航 -->
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <!-- 滚动插件 -->
    <scroll class="content" ref="scroll"
     @scroll="contentScroll"
      :probe-type="3">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"  />
      <!-- 尺码表 -->
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <!-- 评论信息 -->
      <detail-comment-info ref="comments" :commentInfo="commentInfo" />
      <!-- 推荐 -->
      <goods-list ref="recommends" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top v-show="isShowBackTop" @click.native="backClick" />
    <!-- <toast message="wowwowow" /> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from '../../components/common/scroll/Scroll.vue'
  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import BackTop from '../../components/content/backTop/BackTop.vue'

  import { mapActions } from 'vuex'
  // import Toast from '../../components/common/toast/Toast.vue'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail.js'
  import {debounce} from '../../common/utils.js'
  export default Vue.extend({
    name:"Detail",
    components:{
      DetailNavBar, 
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      // Toast
    },
    data(){
      return {
        iid:null,
        topImages:[],
        res:null,
        goods:{},
        shop:{},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{},
        recommend:[],
        itemImgListener:null ,
        themeTopYs:[] ,
        currentIndex:0,
        isShowBackTop:false,
        product:{}
      }
    },
    //创造这个组件时就回调的函数
    created(){
      // 1.保存传入的iid
      this.iid = this.$route.params.iid,
      // 2.根据iid请求详情数据
      getDetail(this.iid).then((res)=>{
        // 1.获取顶部的图片轮播数据
        this.res = res
        // console.log(this.res)
        this.topImages = this.res.result.itemInfo.topImages
        // console.log(this.topImages)
        // 2.获取商品信息
        this.goods = new Goods(this.res.result.itemInfo,this.res.result.columns,this.res.result.shopInfo.services)
        // console.log(this.goods)
        
        // 3.获取店铺信息
        this.shop = new Shop(this.res.result.shopInfo)
        // console.log(this.shop)
        // 4.获取商品的详情数据
        this.detailInfo = this.res.result.detailInfo;
        // console.log(this.detailInfo)
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(this.res.result.itemParams.info,this.res.result.itemParams.rule)
        // console.log(this.paramInfo)
        // 6.取出评论信息
        if(this.res.result.rate.cRate !==0){
          this.commentInfo = this.res.result.rate.list[0]
          // console.log(this.commentInfo)
        }
        // this.$nextTick(()=>{
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0),
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //   // console.log(this.themeTopYs)
        // })
      })
      // 3.请求商品推荐的数据
      getRecommend().then(res=>{
        this.recommend = res.data.list
        // console.log(this.recommend)
      })
    },
    //当div挂载到模板上
    mounted(){
      // 监听item中图片加载完成(debounce防抖)
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.itemImgListener = ()=>{
          refresh()
        }
      // 全局监听详情页推荐图片的加载
      this.$bus.$emit('itemImgLoag',this.itemImgListener)
    },
    //当详情页关闭时关掉全局监听
    destroyed(){
      this.$bus.$off('itemImgLoag',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      // 监听图片加载,无卡顿
      imageLoad(){
        // console.log('1')
        this.$refs.scroll.refresh()
        this.themeTopYs = []
          this.themeTopYs.push(0),
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          // console.log(this.themeTopYs)
      },
      // 标题的点击
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      // 滚动显示的判断
      contentScroll(position){
        // 判断返回顶部的图片是否隐藏
        this.isShowBackTop = (-position.y) >1000

        // console.log(position)
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i=0;i<length;i++){

          if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      // 点击返回顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      // 点击加入购物车的
      addToCart(){
        // 1.收取购物车需要展示的信息
        console.log('已加入到购物车')
        this.product.image = this.topImages[0]
        this.product.title = this.goods.title;
        this.product.desc = this.goods.desc;
        this.product.price = this.goods.realPrice;
        this.product.iid = this.iid
        // console.log(this.product)

        // 2.将商品添加到购物车里
        // this.$store.commit('addCart',this.product)
        this.addCart(this.product).then((res)=>{
          console.log(res)
          this.$toast.show(res,2000)
          console.log(this.$toast)
        })
        // this.$store.dispatch('addCart',this.product).then((res)=>{
        //   console.log(res)
        // })
        // console.log(this.$store.state.cartList)
      }
    }
  })
</script>

<style scoped>
  #detail{
    position:relative;
    z-index: 9;
    background:#fff;
    height:100vh;
  }
  .content{
    height:calc(100% - 93px );
    overflow: hidden;
  }
</style>