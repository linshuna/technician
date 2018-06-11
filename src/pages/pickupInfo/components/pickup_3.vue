<template>
  <div class="wrapper">
    <div class="carInfo-wrapper border-bottom-1px">
      <img class="carImg" :src="carImg"/>
      <div class="carInfo">
        <div class="carno">粤A68688</div>
        <div class="brand">丰田</div>
      </div>
    </div>
    <div class="user-wrapper">
      <div class="name">周柏豪</div>
      <img class="sexImg" :src="sexImg"/>
      <div class="phone">132333333</div>
      <div class="vip-type">会员</div>
    </div>
    <div class="num">已到店1次,消费¥40</div>
  </div>
</template>
<script>
  import Vue from 'vue';
  
  export default {
    data() {
      return {
        carImg: require('modules/images/carImg.png'),
        sexImg: require('modules/images/boyIcon.png')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .wrapper >>> .mint-cell-wrapper
    background: none
    padding: 0
  .wrapper >>> .mint-radiolist
    float: left  
  .wrapper >>> .mint-cell
    float: left
    min-height: auto
  .wrapper >>> .mint-cell:last-child
    background: none 

.wrapper
  position: relative
  padding-bottom: 1rem
  .carInfo-wrapper
    overflow: hidden
    .carImg
      width: 1rem
      height: 1rem
      float: left
    .carInfo
      float: left
      margin-top: .2rem
  .user-wrapper
    height: 1rem 
    line-height: 1rem
    .sexImg
      float: left
      width: .3rem
      margin: .3rem 2rem 0 .6rem 
    .name
      float: left
    .vip-type
      float: right
      margin-right: .2rem
    .phone
      float: right      
  .num
    color: #18b3f9
    border: 1px solid #18b3f9
    display: inline-block
    padding: .1rem
    border-radius: 4px
    position: absolute
    left: 50%
    transform: translate(-50%)
</style>