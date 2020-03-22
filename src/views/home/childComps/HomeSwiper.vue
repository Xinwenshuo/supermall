<template>
<!-- 调用轮播图的显示 -->
  <!-- <swiper class="home-swiper">
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper> -->
  <div class="home-swiper">
    <my-swiper :swiperList="banners" @swiperLoad="imageLoad" />
  </div>
</template>

<script>
    // import {Swiper, SwiperItem} from 'components/common/swiper';
  import  MySwiper from '../../../components/common/swiper/MySwiper.vue'
  export default {
        name: "HomeSwiper",
        props: {
            banners:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        data(){
          return {
            isLoad:false
          }
        },
        methods:{
          // 发送图片是否加载完成
          imageLoad(){
            if(!this.isLoad){
              this.$emit('swiperImageLoaad')
              this.isLoad=true
            }
          }
      
        },
        components:{
            // Swiper,SwiperItem
            MySwiper
        }
    }
</script>

<style scoped>


</style>
