<template>
  <!-- 手动滚动,记得调用必须给个高度 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  export default Vue.extend({
    name:'Srcroll',
    data(){
      return{
        scroll:null,
        pullUpLoad:{
          type:Boolean,
          default:false
        }
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      }
    },
    mounted(){
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
      // 2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3 ){
        this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
      }
      // 3.监听scroll到底部事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
      }
    },
    methods:{
      // 点击返回顶部
      scrollTo(x,y,time=300){
        // console.log(x,y)
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      // 可以多次监听上拉事件
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      // 监听上拉事件
      refresh(){
        this.scorll && this.scroll.refresh()
      }
    }
  })
</script>

<style scoped>

</style>