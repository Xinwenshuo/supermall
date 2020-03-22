<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button ref="check" :isChecked="isChecked" @click.native="checkClick()" />
      <!-- <van-checkbox @change="itemChange" v-model="itemInfo.checked" /> -->
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">$ {{itemInfo.price}}</div>
        <div class="item-count right">{{itemInfo.count}}</div>
      </div>
    </div>
    <!-- <button @click="aaa">1111</button> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  
import { mapMutations } from "vuex";
  import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
  export default Vue.extend({
    name:'CartListItem',
    components:{
      CheckButton
    },
    data(){
      return{
        isChecked:true  
      }
    },
    props:{
      itemInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      
    ...mapMutations(["clearCartList", "setCartList"]),
      aaa(){
        console.log(this.itemInfo)
        return this.itemInfo
      },
    },
    methods:{
// 反选
    itemChange() {
      let result = this.cartList.filter(item => item.checked === true);
      this.checkedAll = result.length > 0 && result.length === this.cartList.length;
    },


      checkClick(){
        // console.log(this.itemInfo.checked)
        this.itemInfo.checked = !this.itemInfo.checked
        this.isChecked =this.itemInfo.checked
        console.log(this.$store.getters.cartList)
        return this.isChecked
      },
    },
    activated(){
      // this.$refs.scroll.scroll.refresh
      // this.cartList=this.$store.state.cartList
        // console.log(this.itemInfo.checked)
        // console.log(this.$store.state.cartList)
    }
  })
</script>

<style scoped>
  #shop-item{
    width:100%;
    display:flex;
    font-size: 0;
    padding:5px;
    border-bottom:1px solid #ccc
  }
  .item-selector{
    width:20px;
    display:flex;
    justify-content:center;
    align-items: center;
  }
  .item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}
  .item-title,.item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img{
    padding:5px;
  }
  .item-img img{
    width:80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info{
    font-size: 17px;
    color:#333;
    padding:5px 10px;
    position:relative;
    overflow: hidden;
  }
  .item-info .item-desc{
    font-size: 14px;
    color:#666;
    margin-top:15px;
  }
  .info-bottom{
    margin-top:10px;
    position:absolute;
    bottom:10px;
    left:10px;
    right:10px;
  }
  .info-bottom .item-price{
    color:orangered;
  }
</style>