<template>
  <div id="app">
    <div class="customDetailWrap">
      <div class="setMsg">
        <div class="logoWrap border-bottom-1px">
          <img :src="customerLogo" class="customLogo"/>
          <div class="logoRight">
            <p class="customerName">
              <span>李小姐</span>
              <img :src="sexTypeIcon" class="sexIcon">
            </p>
            <p class="remark grayColor">暂无备注</p>
            <a href="tel:1521714519" class="customerTel">1521714519</a>
          </div>
        </div>  
        <div class="wechatWrap">
          <button class="bindWechat">绑定微信</button>
        </div>
      </div>
      <div class="setMsg">
        <ul class="carMsgList">
          <li>
            <p>车辆清单</p>
            <p>绑定车辆</p>
          </li>
        </ul>
      </div>
      <button class="editorBtn">编辑</button>
    </div>
     

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Toast,Radio,Popup ,Picker,DatetimePicker   } from 'mint-ui';
  import Vuerify from 'vuerify'
  Vue.use(Vuerify)
  Vue.component(Radio.name, Radio);
  Vue.component(Popup.name, Popup);
  Vue.component(Picker.name, Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
  import {format} from 'modules/js/date.js'
export default {
  name: 'App',
  data(){
    return {
      customerLogo:require("modules/images/defaultLogo.png"),
      sexTypeIcon:require("modules/images/girlIcon.png")
    }
  },
  methods:{

    
  }
}
</script>

<style lang="stylus">
  #app
    width: 100%
    height: 100%
    font-size: .28rem
    position: fixed
    left: 0
    top: 0
    background: #f4f4f4
    .customDetailWrap
      width: 100%
      .setMsg
        margin-top: .2rem;
        background: #ffffff
        .logoWrap
          width: 100%
          padding: .2rem 0 .2rem .6rem
          box-sizing: border-box
          font-size:0
          .customLogo
            display: inline-block
            width: 1rem
            height: 1rem
            vertical-align: top
          .logoRight
            display: inline-block
            width: 85%
            padding-left: .2rem
            box-sizing: border-box
            text-align:left
            vertical-align: top
            font-size: .28rem
            position: relative
            .customerName
              width: 100%
              span 
                vertical-align: middle
              img   
                display: inline-block
                width: .35rem
                height: .35rem
                vertical-align: middle
                padding-left:.1rem
            .remark
              padding-top: .2rem
              font-size: .24rem
            .grayColor
              color: gray
            .orangeColor
              color: #FA9E15
            .customerTel
              position: absolute
              top: 0
              right: .4rem  
              color: #FA9E15
        .wechatWrap
          width: 100%
          padding: .2rem 0
          box-sizing: border-box
          text-align: center
          .bindWechat
            display: inline-block
            border: 1px solid #FA9E15
            color: #FA9E15  
            width: 80%
            background: transparent
            height: .7rem
            font-size: .28rem
            border-radius: 8px
      .carMsgList
        width: 100%
    .editorBtn
      width: 100%
      height: .7rem
      border: none
      position: fixed
      bottom:0
      left: 0
      width: 100%
      background: #FA9E15
      color: #ffffff
     
</style>



