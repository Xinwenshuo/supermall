<template>
<!-- 轮播图 -->
  <div >
    <swiper>
      <swiper-item class="detail-swiper" v-for='(item,index) in topImages' :key="index" >
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Swiper from '../../../components/common/swiper/Swiper.vue'
  import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'

  export default Vue.extend({
    name:'DetailSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return[]
        }
      }
    },
    data(){
      return {
      }
    }
  })
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>