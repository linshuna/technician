<template>
  <div id="app">
      <!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-button type="default">default</mt-button>
      <mt-field label="新密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="code"></mt-field> -->
      <ul class="loginWrap">
        <li class="border-bottom-1px">
          <span>账号</span>
          <input type="tel" v-model.trim="phone" placeholder="请输入手机号">
        </li>
        <li class="border-bottom-1px">
          <span>密码</span>
          <input type="password" v-model.trim="password" placeholder="请输入登录密码">
        </li>
      </ul>
      
      <div class="btnWrap">
        <button id="registerBtn" @click="login" :class="{'isRegister': !invalid}">登录</button>
      </div>
      <p class="textRight clearFloat">
        <a href="register.html" class="fl">注册</a>
        <a href="forgetpwd.html" class="fr">忘记密码？</a>
      </p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Field,Button,Toast  } from 'mint-ui';
  import Vuerify from 'vuerify'
  Vue.use(Vuerify)
  
  Vue.component(Field.name, Field);
  Vue.component(Button.name, Button);
export default {
  name: 'App',
  data(){
    return {
      phone:'',
      password:''
    }
  },
  vuerify:{
    phone: {
      test: /^1[3|5|8]\d{9}$/,
      message: '请输入正确的手机号码'
    },
    password: {
      test: /^[\w!@#$%^&*.]{6,16}$/,
      message: '请输入正确的登录密码'
    },
  },
  computed: {
    errors () {
      return this.$vuerify.$errors
    },
    invalid () {
      return this.$vuerify.invalid
    }
  },
  methods:{
    login:function(){
        if(!this.phone){
          this.toast('请输入手机号码')
          return false;
        }else{
          if(this.errors.phone){
              this.toast(this.errors.phone);
              return false;
          }
        } 
        if(!this.password){
          this.toast('请输入登录密码')
          return false;
        }else{
          if(this.errors.password){
              this.toast(this.errors.password);
              return false;
          }
        }

        if (this.$vuerify.check()) {
            this.toast('登录成功')
        }
    },
    toast:function(msg,posi,time){
        Toast({
            message: msg,
            duration: time || '2000'
            // position: posi||'bottom',
            
        })  
    }
  }
}
</script>

<style lang="stylus">
  #app
    width: 100%
    font-size: .28rem
    padding:0 .32rem
    box-sizing: border-box
    .loginWrap
      margin-top: .8rem
      list-style: none
      width: 100%
      li
        line-height: .9rem
        height: .9rem
        input
          width: 80%
          height: 100%
          margin-left: .2rem
          vertical-align: middle
        #gainCodeBtn
          display: inline-block
          width: 25%
          height: .6rem
          background: transparent
          border: 1px solid #FA9E15
          color: #FA9E15
          border-radius: 5px
    .btnWrap
      text-align: center
      margin-top: .7rem    
      #registerBtn
        display: inline-block
        width: 95%
        height: .65rem
        border-radius: 100px
        background: #a1a1a1
        border:none
        color: #ffffff      
        font-size: .28rem
      .isRegister
        background: #FA9E15!important       
    .tip
      font-size:.18rem
      text-align: center
      width: 100%
      position: fixed
      bottom: .5rem
      span
        color: #ababab
      a 
        color: #3c3c3c  
    .textRight
      text-align: right   
      font-size: .24rem
      margin-top:.3rem
      a
        color: #FA9E15   
</style>
