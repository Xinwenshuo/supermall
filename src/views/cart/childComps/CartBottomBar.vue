<template>
  <div class="bottom-bara">
    <div class="check-content">
      <!-- <check-button class="check-button" :itemInfobu="isSelectAll" /> -->
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去计算: ({{checkedLength}})
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

  import { mapGetters } from 'vuex'
  export default Vue.extend({
    name:'CartBottomBar.vue',
    components:{
      // CheckButton
    },
    computed:{
    ...mapGetters(["cartList", "cartListLength"]),
      // 购物车总价
      totalPrice() {
        return this.cartList
          .filter(item => {
            return item.checked === true;
          })
          .reduce((prev, item) => {
            return prev + item.price * item.count;
          }, 0);
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked === true).length;
      }
      // isSelectAll(){
      //   // console.log(this.cartList)
        
      //   // console.log(this.$store.getters.cartList.filter(item=>item.checked).length)
      //   // return true
      //   // return !(this.cartList.filter(item=>!item.checked).length)
      //   // return !this.cartlist.find(item=> !item.checked)
      // }
    }
  })
</script>

<style scoped>
  .bottom-bara{
    height: 40px;
    background:#eee;
    display: flex;
    position: relative;
    font-size: 14px;
    line-height: 40px;
    /* bottom:40px; */
  }
  .check-content{
    width:60px;
    display:flex;
    /* justify-content:center; */
    align-items: center;
    margin-left:10px;
    margin-right: 5px;
  }
  .check-button{
    
    margin-right: 5px;
    line-height: 20px;
  }
  .price{
    margin-left:30px;
    flex:1;
  }
  .calculate{
    width: 90px;
    background:var(--color-tint);
    text-align: center;
  }
</style>