<template>
  <div class="wrapper">
    <div class="carno-wrapper">
      <div class="title">车牌号</div>
      <div class="carno">粤A686868</div>
    </div>
    <div class="vin-wrapper">
      <div class="title">车架号</div>
      <input class="vin" placeholder="请输入17位数车架号"/>
    </div>
    <div class="brand-wrapper">
      <div class="title">车型</div>
      <div class="brand">奔驰</div>
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
      选择系统客户<span class="iconfont">&#xe66b;</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Radio} from 'mint-ui';
  Vue.component(Radio.name, Radio);

  export default {
    data() {
      return {
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
        ],
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
    margin-bottom: 1rem
    .carno-wrapper
      height: .8rem
      line-height: .8rem
      .title
        float: left
        width: 1.4rem
      .carno
        float: left
    .vin-wrapper
      overflow: hidden
      margin-bottom: .2rem
      .title
        float: left
        width: 1.4rem
        height: .8rem
        line-height: .8rem
      .vin
        float: left
        width: 4rem
        font-size: .28rem
        border: 1px solid #d9d9d9
        padding: .1rem .2rem
        margin-top: .2rem
    .brand-wrapper
      overflow: hidden
      margin-bottom: .2rem
      .title
        float: left
        width: 1.4rem
        height: .8rem
        line-height: .8rem
      .brand
        float: left
        width: 4rem
        font-size: .28rem
        border: 1px solid #d9d9d9
        padding: .1rem .2rem
        margin-top: .2rem
    .name-wrapper
      overflow: hidden
      margin-bottom: .2rem
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
        padding: 0 .2rem;
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
    .chooseCus
      color: $color-main
      float: right
</style>
