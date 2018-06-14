<template>
  <div class="wrapper">
    <div class="carInfo-wrapper border-bottom-1px">
      <img class="carImg" :src="carImg"/>
      <div class="carInfo">
        <div class="carno">粤A68688</div>
        <div class="brand">丰田</div>
      </div>
    </div>
    <div class="name-wrapper">
      <div class="title">客户名称</div>
      <input class="name" type="text" placeholder="请输入名称"/>
      <mt-radio v-model="cusNameValue" :options="cusNameOptions"></mt-radio>
    </div>
    <div class="link-phone">
      <div class="title">手机号</div>
      <input class="phone" type="number" placeholder="请输入手机号码"/>
    </div>
    <div class="chooseCus">
      选择客户<span class="iconfont">&#xe66b;</span>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue';


  export default {
    data() {
      return {
        carImg: require('modules/images/carImg.png'),
        cusName:'',
        cusNameValue: '',
        cusNameOptions:[
          {
            label:'先生',
            value:'1'
          },
          {
            label:'女士',
            value:'0'
          },
        ]
      }
    },
    components: {
      
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
    height: .8rem
    line-height: .8rem
  .wrapper >>> .mint-cell
    float: left
    min-height: auto
  .wrapper >>> .mint-cell:last-child
    background: none

  .carInfo-wrapper
    overflow: hidden
    .carImg
      width: 1rem
      height: 1rem
      float: left
      margin-right: .2rem
    .carInfo
      float: left
      margin-top: .2rem
  .name-wrapper
      overflow: hidden
      margin: .2rem 0
      line-height: .8rem
      .title
        float: left
        width: 1.4rem
      .name
        float: left
        width: 2rem
        font-size: .28rem
        line-height: .8rem
        border: 1px solid #d9d9d9
        border-radius: 4px
        padding: 0 .1rem
        box-sizing: border-box
    .link-phone
      overflow: hidden
      margin-bottom: .2rem
      .title
        float: left
        width: 1.4rem
        height: .8rem
        line-height: .8rem
      .phone
        float: left
        width: 4rem
        font-size: .28rem
        border: 1px solid #d9d9d9
        padding: .1rem .2rem
        margin-top: .2rem
        border-radius: 4px
    .chooseCus
      text-align: right
      color: $color-main
</style>
