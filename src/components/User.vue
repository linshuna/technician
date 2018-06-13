<template>
  <div class="userWrap">
    <div class="userHeader" :style="setHeaderBg">
      <img :src="defaultIcon" alt="">
      <a href="login.html">登录/注册</a>
    </div>
    <div class="userDetailMsgWrap">
        <div class="userOrderDetail">
            <div class="clearFloat deposit">
              <p class="fl">
                <span>可提现</span>
                <span class="orangeColor">0.00</span>
              </p>
              <button class="fr">我的钱包</button>
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
          <span>
            <p>
              <img :src="firendIcon" alt="">
            </p>
            <p class="userTypeTitle">推荐好友</p>
          </span>
          <span>
            <p>
              <img :src="myOrderIcon" alt="">
            </p>
            <p class="userTypeTitle">我的账单</p>
          </span>
          <span>
            <p>
              <img :src="cordIcon" alt="">
            </p>
            <p class="userTypeTitle">优惠券</p>
          </span>
        </div>
        <div class="userSettingType">
          <ul>
            <!-- <li class="border-bottom-1px" @click="userCenterClick"> </li>-->
            <router-link to="/user/selfCenter" tag="li" class="border-bottom-1px">
              <span class="settingLeft">
                <img :src="selfCenterIcon" alt="" class="selfIcon">
                <span>个人中心</span>
              </span>
              <span class="settingRight">
                <img :src="rightArrowIcon" alt="" rightArrowIcon>
              </span>   
            </router-link>
          
            <router-link to="/user/selfCenter" tag="li" class="border-bottom-1px">
              <span class="settingLeft">
                <img :src="rewardIcon" alt="" class="selfIcon">
                <span>我的打赏</span>
              </span>
              <span class="settingRight">
                <img :src="rightArrowIcon" alt="" rightArrowIcon>
              </span>
            </router-link>
            <router-link to="/user/selfCenter" tag="li" class="border-bottom-1px">
              <span class="settingLeft">
                <img :src="recommendIcon" alt="" class="selfIcon">
                <span>我的评价</span>
              </span>
              <span class="settingRight">
                <img :src="rightArrowIcon" alt="" rightArrowIcon>
              </span>
            </router-link>
            <router-link to="/user/selfCenter" tag="li" class="border-bottom-1px">
              <span class="settingLeft">
                <img :src="helpIcon" alt="" class="selfIcon">
                <span>帮助中心</span>
              </span>
              <span class="settingRight">
                <img :src="rightArrowIcon" alt="" rightArrowIcon>
              </span>
            </router-link>
            <router-link to="/user/selfCenter" tag="li" class="border-bottom-1px">
              <span class="settingLeft">
                <img :src="customerIcon" alt="" class="selfIcon">
                <span>客户</span>
              </span>
              <span class="settingRight">
                <img :src="rightArrowIcon" alt="" rightArrowIcon>
              </span>
            </router-link>
            <router-link to="/user/setting" tag="li" class="border-bottom-1px">
              <span class="settingLeft">
                <img :src="settingIcon" alt="" class="selfIcon">
                <span>设置</span>
              </span>
              <span class="settingRight">
                <img :src="rightArrowIcon" alt="" rightArrowIcon>
              </span>
            </router-link>
            <router-view></router-view>
          </ul>
          
        </div>
        
    </div>
  </div>
</template>
<script>
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
        selfCenterIcon: require("modules/images/selfCenterIcon.png"),
        rewardIcon: require("modules/images/rewardIcon.png"),
        recommendIcon: require("modules/images/recommendIcon.png"),
        helpIcon: require("modules/images/helpIcon.png"),
        customerIcon: require("modules/images/customerIcon.png"),
        settingIcon: require("modules/images/settingIcon.png"),
      }
    },
    methods:{
      userCenterClick: function(){
        this.$router.push({path:"/user/selfCenter"})
      }
      
    }
  }
</script>
<style lang="stylus" scoped>
  .fl
    float: left
  .fr 
    float: right 
  .clearFloat
    overflow: hidden 
  .orangeColor
    color: #FA9E15  
  .userWrap
    width: 100%
    height:100%
    background: #f4f4f4
    .userHeader
      width: 100%
      height: 3rem
      padding-left: .4rem
      box-sizing: border-box
      line-height: 3rem
      text-align: left 
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