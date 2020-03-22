<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartLista" :key="index" :itemInfo="item" />
    </scroll>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Scroll from '../../../components/common/scroll/Scroll.vue'

  import CartListItem from './CartListItem.vue'

  // import { mapGetters } from 'vuex'
  export default Vue.extend({
    name:'CartList',
    components:{
      Scroll,
      CartListItem
    },
    data(){
      return{
        cartList:{}
      }
    },

    computed:{
      cartLista(){
        console.log(this.$store.getters.cartList)
        // this.$store.state.cartList
        return this.$store.state.cartList
      }
      
      // ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
      // this.cartList=this.$store.state.cartList
        // console.log(this.$store.state.cartList)
    }
  })
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 133px);
  }
  .content{
    height:100%;
    overflow: hidden;
  }
</style>