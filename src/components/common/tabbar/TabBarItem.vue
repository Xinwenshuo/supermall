
<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- 传过来的默认图片 -->
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <!-- 传过来的改变颜色的图片 -->
      <div  v-else><slot name="item-icon-active"></slot></div>
      <!-- 穿过里的字 -->
      <div :style="activeStyle" ><slot name="item-text" ></slot></div>
      <!-- <img src="../../assets/img/shouye.png" alt="">
      <div>首页</div> -->
  </div>
</template>

<script lang="ts">

  // api:必须要传过来两个参数
  // 第一个就是路由 path="/home"
  // 第一个就需要字体要改变得颜色 activeColor="color"

  import Vue from 'vue'
  export default Vue.extend({
    name:'TabBarItem',
    props:{
      // 通过props把所有的路由传过来了
      path:String,
      // 通过props穿过来一个颜色的字符串来改变颜色,如果没传就是默认值default
      activeColor:{
        type:String,
        default:'#ff6700'
      }
    },
    data(){
      return{
        // isActive:false
      }
    },
    computed:{
      isActive(){
        // console.log(this.path)
        // console.log(this.$route.path)
        // 判断当前的活跃路由和props穿过来的路由是否一致,通过indexOf判断如果不一致就是-1然后返回true或false
        return this.$route.path.indexOf(this.path) !==-1
      },
      // isActive()给点true或false判断字体的颜色;改变style的属性值
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      // 点击因进行路由跳转
      itemClick(){
        // this.$router.push(this.path)
        // 将props穿过来的路由名字给vueRouter实例的replace的方法里进行路由的跳转
        this.$router.replace(this.path)
      }
    }
  })
</script>

<style scoped>
.tab-bar-item {
      flex: 1;
      height: 49px;
      text-align: center;
      font-size:14px;
  }
  .tab-bar-item img{
    margin-top:3px;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom:2px;  
  }
</style>