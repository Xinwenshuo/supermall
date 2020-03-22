<template>
  <div>
    <!-- <div class="check-button" :class="{check :is}" @click="checkClick"> -->
    <div class="check-button" :class="{check :isChecked}">
      <img src="../../../assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:"CheckButton",
    data(){
      return{
        is:true
      }
    },
    props:{
      isChecked:{
        type:Boolean,
        default:false
      },
      itemInfobu:{
        type:Boolean,
        default(){
          return true
        }
      }
    },
    activated(){
      // console.log(this.isChecked)
    },
    computed:{
    },
    methods:{
      
      
    }
  })
</script>

<style scoped>
  .check-button{
    /* background:; */
    border-radius: 50%;
    border:1px solid var(--color-tint);
  }
  .check{
    background:var(--color-tint);
  }
</style>