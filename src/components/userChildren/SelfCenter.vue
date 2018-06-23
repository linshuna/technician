<template>
  <div class="selfCenter">
    <ul>
      <li class="border-bottom-1px userLogo">
        <span>头像</span>
        <div class="selfRight">
          <img :src="defaultIcon" alt="" class="defaultLogo">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>用户名</span>
        <div class="selfRight">
          <span class="grayColor">Man</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>昵称</span>
        <div class="selfRight">
          <span class="grayColor">Man</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>性别</span>
        <div class="selfRight">
          <span class="grayColor">保密</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li>
        <span>出生日期</span>
        <div class="selfRight">
          <span class="grayColor">xxxx年xx月xx日</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
    </ul>
  </div>
  
</template>
<script>
  export default {
    name: 'App',
    data(){
      return {
        defaultIcon: require("modules/images/isLoginIcon.png"),
        rightArrowIcon: require("modules/images/rightArrow.png"),
      }
    },
    created: function(){
      this.$emit('getIsLink',true)
    },
    mounted: function(){

      this.$nextTick(function(){
        document.title = '个人中心'
      })
    },
    methods:{

      
    }
  }
</script>
<style lang="stylus">
  .fl
    float: left
  .fr 
    float: right 
  .clearFloat
    overflow: hidden 
  .orangeColor
    color: #FA9E15  
  .selfCenter
    width: 100%
    height: 100%
    font-size: .28rem
    background: #f4f4f4!important
    overflow: hidden
    z-index: 100
    padding: 0!important
    border-radius: 0!important
    position: fixed
    top: 0
    left: 0
    ul
      width: 100%
      background: #ffffff
      padding-left: .2rem
      box-sizing: border-box
      .userLogo
        padding: .6rem 0!important
      li
        width: 100%
        position: relative
        padding: .3rem 0
        text-align: left
        color: #333
        font-size: .28rem
        .selfRight
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

</style>