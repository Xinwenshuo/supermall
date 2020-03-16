<template>
  <div class="goods">
    <!-- {{goods}} -->
    <goods-list-item v-for="(item,index) in goods"
     :key="index"
     :goodsItem="item"
      />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GoodsListItem from './GoodsListItem.vue'
  export default Vue.extend({
    name:'GoodsList',
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      aaaaa(){
        console.log('a')
        console.log(this.goods)
      }
    }
  })
</script>

<style scoped>
  .goods{
    display:flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding:4px;
  }
</style>