<template>
  <div class="userWrap">
    <div v-if="!isLink">
      <div class="userHeader" :style="setHeaderBg">
        <div class="loginMsg" v-if="!techerData">
          <img :src="defaultIcon" alt="">
          <a :href="'login.html?returnUrl='+returnUrl">登录/注册</a>
        </div>
        <div class="loginMsg" v-else>
          <img :src="techerData.headimg" alt="">
          <div class="showUserName">
            <p>{{techerData.nickname}}</p>
            <p>{{techerData.phone}}</p>
          </div>
          
        </div>
      </div>
      <div class="userDetailMsgWrap">
          <div class="userOrderDetail">
              <div class="clearFloat deposit">
                <p class="fl">
                  <span>可提现</span>
                  <span class="orangeColor">0.00</span>
                </p>
                <router-link to="/user/wallet">
                  <button class="fr">
                    我的钱包
                  </button>
                </router-link>
              </div>
              <div class="orderMsg">
                <span>
                  <p class="orangeColor bigFont">10</p>
                  <p class="orderMsgTitle">今日交车</p>
                </span>
                <span>
                  <p class="orangeColor bigFont">23</p>
                  <p class="orderMsgTitle">今日交车</p>
                </span>
                <span class="noneBorder">
                  <p class="orangeColor bigFont">10</p>
                  <p class="orderMsgTitle">今日交车</p>
                </span>
              </div>
          </div>

          <div class="userType">
            <router-link v-for="(linkItem,index) in userTypeData" :key="index" :to="linkItem.linkUrl" tag="span">
              <p>
                <img :src="linkItem.icon" alt="">
              </p>
              <p class="userTypeTitle">{{linkItem.linkName}}</p>
            </router-link>
          </div>          
          <div class="userSettingType">
            <ul>
              <router-link v-for="(linkItem,index) in userSettingTypeData" 
                :key="index" 
                :to="linkItem.linkUrl" tag="li" 
                :class="{'border-bottom-1px':index!=(userSettingTypeData.length-1)}"
                @click.native="isWaitingTip(linkItem.linkUrl)">
                <span class="settingLeft">
                  <img :src="linkItem.icon" alt="" class="selfIcon">
                  <span>{{linkItem.linkName}}</span>
                </span>
                <span class="settingRight">
                  <img :src="rightArrowIcon" alt="" rightArrowIcon>
                </span> 
              </router-link>
              
            </ul>
            
          </div>
          
      </div>  
    </div>
    <transition name="slide-fade">
      <keep-alive>
        <router-view v-on:getIsLink='getIsLink'></router-view>
      </keep-alive>
    </transition>
    
  </div>
</template>
<script>
import {Toast} from "mint-ui"
  export default {
    name: 'App',
    data(){
      return {
        setHeaderBg:{//设置背景颜色
          backgroundImage:"url(" + require("modules/images/selfHeaderBg.png") + ")",
          backgroundRepeat:  "no-repeat",
          backgroundSize: '100% 100%'
        },
        defaultIcon: require("modules/images/isLoginIcon.png"),
        firendIcon: require("modules/images/firendIcon.png"),
        myOrderIcon: require("modules/images/myOrderIcon.png"),
        cordIcon: require("modules/images/cordIcon.png"),
        rightArrowIcon: require("modules/images/rightArrow.png"),
        transitionName:'',
        userTypeData:[{
          'linkUrl':'/user/coupon',
          'icon': require("modules/images/firendIcon.png"),
          'linkName': '推荐好友'
        },{
          'linkUrl':'/user/coupon',
          'icon': require("modules/images/myOrderIcon.png"),
          'linkName': '我的账单'
        },{
          'linkUrl':'/user/coupon',
          'icon': require("modules/images/cordIcon.png"),
          'linkName': '优惠券'
        }],
        userSettingTypeData:[{
          'linkUrl':'/user/selfCenter',
          'icon': require("modules/images/selfCenterIcon.png"),
          'linkName': '个人中心'
        },{
          'linkUrl':'',
          'icon': require("modules/images/rewardIcon.png"),
          'linkName': '我的打赏'
        },{
          'linkUrl':'',
          'icon': require("modules/images/recommendIcon.png"),
          'linkName': '我的评价'
        },{
          'linkUrl':'/user/guide',
          'icon': require("modules/images/helpIcon.png"),
          'linkName': '帮助中心'
        },{
          'linkUrl':'',
          'icon': require("modules/images/customerIcon.png"),
          'linkName': '客户'
        },{
          'linkUrl':'/user/setting',
          'icon': require("modules/images/settingIcon.png"),
          'linkName': '设置'
        }],
        isLogin: false,
        techerData: null,
        returnUrl: window.location.href,
        isLink: false
      }
    },
    created: function(){

    },
    mounted: function(){
      let _this = this;
      window.addEventListener("popstate", function(e) {// 添加返回事件监听
          _this.isLink = false;
      },false)
      this.$nextTick(function(){
        document.title = '我的';
        if(this.getStorage){
          let gainTecherData = JSON.parse(this.getStorage);
          if(gainTecherData){
            this.isLogin = true;
            this.techerData = gainTecherData;//获取登录的数据
          }  
        }

      })
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      },
      
    },
    methods:{
      getIsLink(bol){
        this.isLink = bol
      },
      gainTag(){

      },
      isWaitingTip(url){//路由提示
        let bodyObj = document.getElementsByTagName("body")[0];
        let toastObj = document.getElementsByClassName("mint-toast");
        let toastLen = toastObj.length;
        if(!url){
          if(toastLen>0){
            //len=toastObj.length-1，不然会出现一闪一闪的问题（要留下最后一个mint-toast）
            for(var i=0,len=toastObj.length-1;i < len;i++){
              if(toastObj[i]){
                bodyObj.removeChild(toastObj[i])
              }
            }
          }else{
            Toast("正在开发中，敬请期待。。。")
          }
          
        }else{
            for(var i=0,len=toastObj.length;i < len;i++){
              if(toastObj[i]){
                bodyObj.removeChild(toastObj[i])
              }
            }
        }
      },
      jumpCom: function(){
        this.$router.push({path:"/user/coupon"})
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
  .orangeColor
    color: #FA9E15  
  // .slide-right-enter-active,
  // .slide-right-leave-active,
  // .slide-left-enter-active,
  // .slide-left-leave-active{
  //   will-change: transform;
  //   transition: all 250ms;
  //   height: 100%;
  //   backface-visibility: hidden;
  //   perspective: 1000;
  //   position: absolute;
  //   top:0;
  // }
  // .slide-right-enter {
  //   opacity: 0;
  //   transform: translate3d(-100%, 0, 0);
  // }
  // .slide-right-leave-active {
  //   opacity: 0;
  //   transform: translate(100%, 0, 0);
  // }
  // .slide-left-enter {
  //   opacity: 0;
  //   transform: translate3d(100%, 0, 0);
  // }
  // .slide-left-leave-active {
  //   opacity: 0;
  //   transform: translate(-100%, 0, 0);
  // }

  .slide-fade{
    position: absolute;
    width:100%;
    top: 0;
    left:0;
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100%);
    opacity: 1;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .userWrap
    width: 100%
    height:100%
    background: #f4f4f4
    position: absolute
    padding-bottom: 2.3rem
    .userHeader
      width: 100%
      height: 3rem
      padding-left: .4rem
      box-sizing: border-box
      line-height: 3rem
      text-align: left 
      .loginMsg
        width: 100%
        img
          vertical-align: middle
          display: inline-block
          width: 1.5rem
          height: 1.5rem
        a 
          vertical-align: middle
          display: inline-block
          color: #ffffff
          padding-left: .2rem
          font-size: .36rem    
        .showUserName
          display: inline-block  
          vertical-align: middle
          p
            line-height: .45rem
            color: #fff
    .userDetailMsgWrap
      width: 100%
      padding: 0 .2rem
      box-sizing: border-box
      margin-top: -.6rem
      >div 
        width: 100%
        padding: .2rem
        box-sizing: border-box
        border-radius: 5px
        background: #ffffff  
        margin-bottom: .2rem
      .userOrderDetail
        .deposit
          line-height: 0.5rem
          border-bottom: 1px dotted #bfbfbf
          padding-bottom: .2rem
          p
            font-size: .26rem
            span
              padding-right: .2rem
          button
            background: transparent 
            border: 1px solid #FA9E15  
            color: #FA9E15  
            border-radius: 100px
            font-size: .26rem
            line-height: .45rem
            padding:0 .2rem
        .orderMsg
          width: 100%
          font-size: 0
          padding-top: .2rem
          .noneBorder
            border:none  
          span 
            display: inline-block
            width: 33.3%    
            text-align: center
            border-right: 1px dotted #bfbfbf
            box-sizing:border-box
            font-size: .28rem
            p
              line-height: .45rem
            .bigFont
              font-size: .3rem
            .orderMsgTitle
              font-size: .26rem
              color: gray
      .userType
        width: 100%
        font-size: 0
        span 
          display: inline-block
          width: 33.3%    
          text-align: center
          box-sizing:border-box
          font-size: .28rem     
          p
            line-height: .45rem
          img
            display: inline-block
            width: .5rem
          .userTypeTitle
            font-size: .26rem
            color: gray
    .userSettingType
      width: 100%    
      padding: 0!important  
      ul
        width: 100%
        padding: 0 .2rem
        box-sizing: border-box
        li 
          width: 100%
          color: gray 
          font-size: .26rem
          padding: .2rem 0
          box-sizing: border-box
          position: relative
          text-align: left
        .settingLeft
          .selfIcon
            padding-right: .1rem
            display: inline-block
            width: .45rem
            vertical-align: middle
          span  
            vertical-align: middle
        .settingRight    
          img
            display: inline-block
            width: .15rem  
            position: absolute
            right: 0
            top: 50%
            transform: translate(0,-50%)

</style>