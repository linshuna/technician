<template>
  <div class="home-wrapper">
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="/index">
        <router-link to="/index">
          <!-- <div class="iconfont">&#xe605;</div> -->
          <img class="index-img" src="../modules/images/icon_gongzuotai.png" v-if="selected=='/index'" alt="">
          <img class="index-img" src="../modules/images/icon_gongzuotai_dis.png" v-else alt="">
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
          <div class="iconfont">&#xe634;</div>
          <p class="footer-bar-label">订单</p>
        </router-link>   
      </mt-tab-item>
      <mt-tab-item id="/user">
        <router-link to="/user">
          <div class="iconfont">&#xe61d;</div>
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
        box-shadow: 0 1px 4px 0 rgba(30,30,30,0.10);
        img
          width: 100%
          height: 100%
      .iconfont
        font-size: .5rem
        color: #e3e3e3
      .footer-bar-label
        color: #e3e3e3;
        //margin-bottom: .08rem
      .is-selected
        .iconfont
          color: #FA9E15
        .footer-bar-label
          color: #FA9E15
</style>