<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <!-- <button @click="a">11111</button> -->
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper';
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
        methods:{
                a(){
        console.log(this.banners)
        console.log(this.recommends)
      }
        },
        components:{
            Swiper,SwiperItem
        }
    }
</script>

<style scoped>


</style>
