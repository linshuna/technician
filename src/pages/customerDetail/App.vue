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
          <li class="carMsgTitle clearFloat border-bottom-1px">
            <p class="fl">车辆清单</p>
            <p class="fr bindCar" @click="bindNewCar">绑定车辆</p>
          </li>
          <li class="border-bottom-1px" @click="carDetailMsg(1)">
            <p>
              <span>车牌号</span>
              <span class="grayColor">车牌类型</span>
            </p>
            <p class="smallFont">历史进店次数</p>
            <span class="rightArrow">
              <img :src="rightArrowIcon" alt="">
            </span>
          </li>
        </ul>
      </div>
      <div class="setMsg">
        <p class="setPadding">其他联系人</p>
      </div>
      <div class="setMsg">
        <p class="setPadding border-bottom-1px">生日：日期</p>
        <p class="setPadding">地址：联系人地址</p>
      </div>
      <button class="editorBtn">编辑</button>
    </div>
    <router-view></router-view>  

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
      sexTypeIcon:require("modules/images/girlIcon.png"),
      rightArrowIcon: require("modules/images/rightArrow.png")
    }
  },
  methods:{
    carDetailMsg:function(e){
      this.$router.push({path:"/customerDetail/carDetailMsg/"+e})
      // this.$router.push({name:"carDetailMsg",params: { userId: e }})
    },
    bindNewCar: function(){
      this.$router.push({path:"/customerDetail/bindNewCar"})
    }
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
        .setPadding
          width: 100%
          padding: .4rem 0
          padding-left: .32rem
          box-sizing: border-box
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
            width: 84%
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
        background: #ffffff
        padding-left: .32rem
        box-sizing: border-box
        li.carMsgTitle
          padding: .4rem .4rem .4rem 0;
          box-sizing: border-box
          .bindCar
            color: #fa9e15
        li
          width: 100%
          padding: .2rem 0
          box-sizing: border-box       
          position: relative
          p
            line-height: .45rem
          .grayColor
            color: gray 
          .smallFont
            font-size: .2rem  
            color: gray
          .rightArrow
            display: inline-block
            width: .15rem
            position: absolute
            right: .32rem
            top: 50%
            transform: translate(0,-50%)  
            img 
              display: inline-block
              width: 100%
              height: 100%     
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



