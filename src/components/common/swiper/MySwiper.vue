<template>
  <div class="swiper-list">
    <van-swipe :autoplay="4000">
      <van-swipe-item :key="index" v-for="(item, index) in swiperList">
        <!-- <img :src="item.image" @load="swiperLoad" alt="" /> -->
      <a :href="item.link">
        <img :src="item.image"  @load="swiperLoad">
      </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "MySwiper",
  props: {
    swiperList: {
      type: Array,
      // default默认值需要一个函数return一个默认值
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: true
    };
  },
  methods: {
    swiperLoad() {
      if (this.isLoad) {
        this.$emit("swiperLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style scoped>
.swiper-list /deep/ .van-swipe__indicator {
  width: 10px;
  height: 10px;
  opacity: 0.8;
  background-color: white;
}

.swiper-list /deep/ .van-swipe__indicator--active {
  background-color: red;
}

.swiper-list {
  width: 100%;
}

.swiper-list img {
  width: 100%;
}
</style>
