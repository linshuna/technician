<template>
  <div class="guideWrap">
    <p class="hotQuestion">热点问题</p>
    <ul>
      <li class="border-bottom-1px">
        <span>微信如何开启和关闭信息提醒</span>
        <div class="selfRight">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>绑定车辆问题</span>
        <div class="selfRight">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>微信如何开启和关闭信息提醒</span>
        <div class="selfRight">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>微信如何开启和关闭信息提醒</span>
        <div class="selfRight">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>微信如何开启和关闭信息提醒</span>
        <div class="selfRight">
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
        document.title = '指南'
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
  .guideWrap
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
    .hotQuestion
      width: 100%
      padding: .2rem
      box-sizing: border-box
      color: #999999
      background: #f4f4f4
      text-align: left 
      font-size: .26rem
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