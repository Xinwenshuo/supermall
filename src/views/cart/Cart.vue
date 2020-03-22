<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center" >购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import { mapGetters } from 'vuex'

  import CartList from './childComps/CartList.vue'

  export default Vue.extend({
    name:'Cart',
    components:{
      NavBar,
      CartList,
    }, 
    computed:{
      ...mapGetters({
        length:'cartLength',
      })
    }
  })
</script>

<style scoped>
  .nav-bar{
    background:var(--color-tint);
    color:#fff;
    position: relative;
    z-index: 9;
  }
  .cart{
    height:100vh
  }
</style>