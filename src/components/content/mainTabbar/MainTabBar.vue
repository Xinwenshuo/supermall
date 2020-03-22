<template>
<!-- 底部导航 -->
    <tab-bar>
      <tab-bar-item path="/home" activeColor="#ff6700">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text" >首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#ff6700">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text" >分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#ff6700">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text" >购物车</div>
      </tab-bar-item>
      <tab-bar-item  path="/profile" activeColor="#ff6700">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text" >我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import Vue from 'vue'
  import TabBar from '../../common/tabbar/TabBar.vue';
  import TabBarItem from '../../common/tabbar/TabBarItem.vue';
    export default Vue.extend({
    name:'MainTabBar',
    components:{
      TabBar,
      TabBarItem
    }
  })
</script>

<style scoped>

</style>