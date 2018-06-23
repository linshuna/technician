<template>
  <div id="app">
      <!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-button type="default">default</mt-button>
      <mt-field label="新密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="code"></mt-field> -->
      <ul class="loginWrap">
        <li class="border-bottom-1px">
          <span>手机号</span>
          <input type="tel" v-model.trim="phone" placeholder="请输入手机号">
          <button id="gainCodeBtn" v-if="!isCode" @click="gainCode">获取验证码</button>
          <button id="code" v-else>{{countDown}}秒后重新发送</button>
        </li>
        <li class="border-bottom-1px">
          <span>验证码</span>
          <input type="text" v-model.trim="code" placeholder="请输入短信验证码">
        </li>
        <li class="border-bottom-1px">
          <span>新密码</span>
          <input type="password" v-model.trim="password" placeholder="请输入新密码">
        </li>
        
      </ul>
      <div class="btnWrap">
        <button id="registerBtn" @click="register" :class="{'isRegister': !invalid}">重置密码</button>
      </div>
      <p class="derictLogin">
        <a href="login.html">通过账号密码登录 ></a>
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
      password:'',
      code:'',
      bolArr:[],
      countDown: 60,
      isCode: false
    }
  },
  vuerify:{
    phone: {
      test: /^1[3|5|8]\d{9}$/,
      message: '请输入正确的手机号码'
    },
    password: {
      test: /^[\w!@#$%^&*.]{6,16}$/,
      message: '密码至少6位'
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
    gainCode(){
      if(!this.phone){
        this.toast('请输入手机号码')
        return false;
      }else{
        if(this.errors.phone){
            this.toast(this.errors.phone);
            return false;
        }else{
          this.$http.get('/api.php/Tech/sendcode/?phone='+this.phone+"&types=1")//忘记密码要传
            .then((res)=>{
              //倒计时
              if(res.data.errorCode == 200){
                this.isCode = !this.isCode;
                let _this = this;
                let countTimer =  setInterval(function(){
                                    if(_this.countDown<=1){
                                      clearInterval(countTimer)
                                      _this.isCode = !_this.isCode
                                    }
                                    _this.countDown--
                                    console.log(_this.countDown)
                                  },1000)
              }else{
                this.toast(res.data.message)
                return false;
              }
            })

        }
      } 
    },
    register:function(){
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
          this.toast('请输入新密码')
          return false;
        }else{
          if(this.errors.password){
              this.toast(this.errors.password);
              return false;
          }
        }
        if(!this.code){
          this.toast('请输入验证码')
          return false;
        }

        if (this.$vuerify.check()) {
          this.$http.post('/api.php/Tech/forget',
              {
                username: this.phone,
                code: this.code,
                password: this.password
              })
            .then((res)=>{
              if(res.data.errorCode == 200){
                  this.toast('重置密码成功');
                  //直接登录
                  this.$store.dispatch('login',{self:this,username:this.phone,password:this.password})
              }else{
                this.toast(res.data.message)
              }
            }) 
            
        }
    },
    toast:function(msg,posi,time){
        Toast({
            message: msg,
            duration: time || '2000'
            // position: posi||'bottom',
            
        })  
    },
    
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
        position: relative
        span 
          display: inline-block
          width: 13%
        input[type="tel"]
          width:50%
        input
          width: 80%
          height: 100%
          margin-left: .2rem
        button 
          position: absolute
          top: 50%
          transform: translate(0,-50%)
          right: 0
        #gainCodeBtn
          display: inline-block
          width: 25%
          height: .6rem
          background: transparent
          border: 1px solid #FA9E15
          color: #FA9E15
          border-radius: 5px
        #code
          display: inline-block
          padding: 0 .15rem
          height: .6rem
          background: transparent
          border: 1px solid #d0d0d0
          color: #d0d0d0
          border-radius: 5px
          font-size: .24rem  
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
    .derictLogin
      text-align: center
      font-size: .24rem
      margin-top: .3rem
      a
        color: #FA9E15            
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
      
</style>
