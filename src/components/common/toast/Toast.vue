<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name:'Toast',
    props:{
      // message:{
      //   type:String,
      //   default:''
      // },
      // show:{
      //   type:Boolean,
      //   default:false
      // }
    },
    data(){
      return{
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message="默认文字",duration=2000){
        this.isShow = true;
        this.message = message
        setTimeout(()=>{
          this.isShow = false;
          this.message = ''
        },duration)
      }
    }
  })
</script>

<style scoped>
  .toast{
    position: fixed;
    left:50%;
    top:50%;
    color:#fff;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    background:rgba(0,0,0,.75);
    z-index: 999;
  }
</style>