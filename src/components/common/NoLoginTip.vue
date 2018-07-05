<template>
  <div class="noLoginTipWrap">
      <div class="loginMsg">
        <a :href="'login.html?returnUrl='+url">
          <img :src="defaultIcon" alt="">
          <span>登录/注册</span>   
        </a>
      </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        defaultIcon: require("modules/images/isLoginIcon.png"),
        url: window.location.href
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .orangeColor
    color: #fa9e15
    font-size: .22rem!important
  .grayColor
    color: #999  
    font-size: .22rem!important
  .noLoginTipWrap
    width: 100%
    min-height: 100%
    position: absolute
    left: 0
    top: 0
    background: #f4f4f4
    .loginMsg
      text-align: center
      margin-top: 30%
      a
        display: inline-block
        width: 100%
        line-height: .5rem
        font-size: .28rem
        img
          display: inline-block
          width: 1.5rem
        span
          display:block
          text-align: center
    
</style>
