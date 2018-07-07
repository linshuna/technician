<template>
  <div class="home-wrapper">
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="/index">
        <router-link to="/index">
          <div class="iconfont">&#xe615;</div>
          <!--<img class="index-img" src="../modules/images/icon_gongzuotai.png" v-if="selected=='/index'" alt="">
          <img class="index-img" src="../modules/images/icon_gongzuotai_dis.png" v-else alt=""> -->
          <p class="footer-bar-label">工作台</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="/customer">
        <router-link to="/customer">
          <div class="iconfont">&#xe623;</div>
          <p class="footer-bar-label">客户</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="/pickupCar" class="mt-tab-item-up">
        <router-link to="/pickupCar">
          <!-- <div class="iconfont">&#xe618;</div>
          <p class="footer-bar-label">接车</p> -->
          <img src="../modules/images/icon_jieche.png" alt="">
        </router-link>  
      </mt-tab-item>
      <mt-tab-item id="/order">
        <router-link to="/order">
          <div class="iconfont">&#xe635;</div>
          <p class="footer-bar-label">订单</p>
        </router-link>   
      </mt-tab-item>
      <mt-tab-item id="/user">
        <router-link to="/user">
          <div class="iconfont">&#xe60d;</div>
          <p class="footer-bar-label">我的</p>
        </router-link>   
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default{
  	data() {
  		return {
  			selected: '/index'
      }
    },
    created(){
      this.selected=this.$route.path;
    },
  }
</script>
<style lang="stylus" scoped>
  .home-wrapper
    font-size: .24rem
    .mint-tabbar
      position: fixed
      height: 1rem
      .index-img 
        width: 24px;
        height: 24px;
      .mt-tab-item-up
        position: relative
        width: 1.2rem
        height: 1.2rem
        top: -.7rem
        border-radius: 50%
        img
          width: 100%
          height: 100%
      .iconfont
        font-size: .48rem
        color: #999
      .footer-bar-label
        color: #999
        padding-top: 0.06rem
      .is-selected
        .iconfont
          color: #FA9E15
        .footer-bar-label
          color: #FA9E15
          padding-top: 0.06rem
</style>