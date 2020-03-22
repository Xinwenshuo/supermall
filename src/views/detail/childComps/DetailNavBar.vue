<template>
<!-- 详情页最上边的导航 -->
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles"
         :key="index"
          class="titles-item"
          :class="{active:index===currentIndex}"
          @click="titleClick(index)"
           >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NavBar from '../../../components/common/navbar/NavBar.vue'
  export default Vue.extend({
    name:'DetailNavBar',
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    components:{
      NavBar
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  })
</script>

<style scoped>
  .titles{
    display:flex;
  }
  .titles-item{
    flex:1;
    font-size: 13px;
  }
  .active{
    color:var(--color-high-text)
  }
  .back img{
    margin-top:15px;
    width:15px;
  }
</style>