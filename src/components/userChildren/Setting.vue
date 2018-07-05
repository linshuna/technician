<template>
  <div class="setting">
    <ul>
      <li class="border-bottom-1px" @click="registerFn">
        <span class="lockLeft">
          <img :src="lockIcon" alt="">
          <span>修改密码</span>  
        </span>
        <div class="LockRight">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
    </ul>
    <div class="btnWrap" @click="logout">
      <button>退出登录</button>
    </div>
    
  </div>
  
</template>
<script>
  export default {
    name: 'App',
    data(){
      return {
        lockIcon: require("modules/images/lockIcon.png"),
        rightArrowIcon: require("modules/images/rightArrow.png"),

      }
    },
    created: function(){
      this.$emit('getIsLink',true)
    },
    mounted: function(){
    },
    methods:{
      registerFn(){
        window.location.href = "register.html?returnUrl="+window.location.href
      },
      logout(){
        this.$store.dispatch('logout')
      }
      
    }
  }
</script>
<style lang="stylus" scoped>
  .fl
    float: left
  .fr 
    float: right 
  .clearFloat
    overflow: hidden 
  .orangeColor
    color: #FA9E15  
  .setting
    width: 100%
    height: 100%
    font-size: .28rem
    position: fixed
    left: 0
    top: 0
    background: #f4f4f4!important
    overflow: hidden
    z-index: 100
    padding: 0!important
    border-radius: 0!important
    ul
      width: 100%
      background: #ffffff
      padding-left: .2rem
      box-sizing: border-box
      li
        width: 100%
        position: relative
        padding: .3rem 0
        text-align: left
        color: #333
        font-size: .28rem
        .lockLeft
          img
            display: inline-block
            width: 0.35rem
            vertical-align: middle
          span 
            vertical-align: middle
        .LockRight
          position: absolute
          right: .2rem
          top: 50%
          transform: translate(0,-50%)  
          .grayColor
            color: #bfbfbf
            font-size: .24rem
          img
            display: inline-block
          .defaultLogo
            width: 1rem
            height: 1rem  
            vertical-align: middle
          .rightArrow  
            width: .15rem
            padding-left: .15rem  
            vertical-align: middle
    .btnWrap
      width: 100%
      padding: 0 .3rem
      box-sizing: border-box
      margin-top: 1.5rem
      button 
        width: 100%
        height: .7rem
        border: none
        width: 100%
        background: #FA9E15
        color: #ffffff
        border-radius : 2px
        font-size: .28rem


</style>