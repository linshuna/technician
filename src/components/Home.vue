<template>
  <div class="home-wrapper">
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="/index">
        <router-link to="/index">
          <div class="iconfont">&#xe605;</div>
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
          <div class="iconfont">&#xe618;</div>
          <p class="footer-bar-label">接车</p>
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
      .mt-tab-item-up
        position: relative
        top: -.4rem
        background: #fff
        border-radius: .6rem
        border: 1px solid #eee
        box-shadow: 0 1px 4px 0 rgba(30,30,30,0.10);
      .iconfont
        font-size: .5rem
        //margin-bottom: .08rem
      .is-selected
        .iconfont
          color: #FA9E15
        .footer-bar-label
          color: #FA9E15
</style>