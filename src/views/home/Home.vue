<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <recommend-view :recommends="recommends"/>
    <button @click="a" >aaaaaa</button>
  </div>
</template>

<script lang="ts">
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import Vue from 'vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  
  import {getHomeMultidata} from '../../network/home'


  export default Vue.extend({
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return {
        banners: [],
        recommends:[],
      }
    },
    methods:{
      a(){
        console.log(this.banners)
        console.log(this.recommends)
      }
    },
    created(){
      // 1. 请求多个数据
      getHomeMultidata().then(res=>{
        console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
  })
</script>

<style scoped>
  .home-nav{
    background-color:var(--color-tint);
    color:#fff;
  }
</style>