<template>
  <div class="userWrap">
    <div v-if="!isLink">
      <div class="header">
        <div class="header-top clearFloat" v-if="!techerData">
          <div class="img-box fl">
            <img :src="defaultIcon" alt="头像">
          </div>
          <div class="user-login fl">
            <a :href="'login.html?returnUrl='+returnUrl">登录/注册</a>
          </div>
        </div>
        <div class="header-top clearFloat" v-else>
          <div class="img-box fl">
            <img :src="avatar" @click="setAvatar" alt="头像">
            <input type="file" name="avatar" accept="image/*" style="display:none"  @change="changeImage($event)" ref="avatarInput">
          </div>
          <div class="user-info fl">
            <p class="user-name">{{techerData.nickname}}</p>
            <p class="user-city">{{techerData.phone}}</p>
          </div>
        </div>
        <div class="header-bottom">
          <router-link to="/user/wallet">
            <div class="user-asset">
              <img src="../modules/images/mywallet.png" alt="qb">
              <p class="wallet">我的钱包</p>
              <p>可提现<span class="number">0.00</span></p>
              <img class="arrow" :src="rightArrowIcon">
            </div>
          </router-link>
      </div>
      </div>
      <ul class="middle">
        <li>
          <p class="number">{{userInfo.order||0}}</p>
          <p>今日预约</p>
        </li>
        <li>
          <p class="number">{{userInfo.recive||0}}</p>
          <p>今日接车</p>
        </li>
        <li>
          <p class="number">{{userInfo.quit||0}}</p>
          <p>今日交车</p>
        </li>
        <router-link v-for="(linkItem,index) in userTypeData" :key="index" :to="linkItem.linkUrl" tag="li">
          <img :src="linkItem.icon" alt="">
          <p>{{linkItem.linkName}}</p>
        </router-link>
      </ul>
      <ul class="card footer">
        <router-link v-for="(linkItem,index) in userSettingTypeData" 
                :key="index" 
                :to="linkItem.linkUrl" tag="li"
                @click.native="isWaitingTip(linkItem.linkUrl)">
          <img class="fl cell-logo" :src="linkItem.icon" alt="">
          <p class="fl">{{linkItem.linkName}}</p>
          <img class="fr arrow" :src="rightArrowIcon">
        </router-link>
      </ul>
    </div>
      <transition name="slide-fade">
        <keep-alive>
          <router-view v-on:getIsLink='getIsLink'></router-view>
        </keep-alive>
      </transition>
  </div>
</template>
<script>
  import {
    Toast
  } from "mint-ui"
  export default {
    name: 'App',
    data() {
      return {
        defaultIcon: require("modules/images/isLoginIcon.png"),
        firendIcon: require("modules/images/firendIcon.png"),
        myOrderIcon: require("modules/images/myOrderIcon.png"),
        cordIcon: require("modules/images/cordIcon.png"),
        rightArrowIcon: require("modules/images/rightArrow.png"),
        transitionName: '',
        userTypeData: [{
          'linkUrl': '/user/coupon',
          'icon': require("modules/images/firendIcon.png"),
          'linkName': '推荐好友'
        }, {
          'linkUrl': '/user/mybill',
          'icon': require("modules/images/myOrderIcon.png"),
          'linkName': '我的账单'
        }, {
          'linkUrl': '/user/coupon',
          'icon': require("modules/images/cordIcon.png"),
          'linkName': '优惠券'
        }],
        userSettingTypeData: [{
          'linkUrl': `/user/selfCenter`,
          'icon': require("modules/images/selfCenterIcon.png"),
          'linkName': '个人中心'
        }, {
          'linkUrl': '',
          'icon': require("modules/images/rewardIcon.png"),
          'linkName': '我的打赏'
        }, {
          'linkUrl': '',
          'icon': require("modules/images/recommendIcon.png"),
          'linkName': '我的评价'
        }, {
          'linkUrl': '/user/guide',
          'icon': require("modules/images/helpIcon.png"),
          'linkName': '帮助中心'
        }, 
        // {
        //   'linkUrl': '',
        //   'icon': require("modules/images/customerIcon.png"),
        //   'linkName': '客户'
        // }, 
        {
          'linkUrl': '/user/setting',
          'icon': require("modules/images/settingIcon.png"),
          'linkName': '设置'
        }],
        isLogin: false,
        techerData: null,
        userInfo: {},
        returnUrl: window.location.href,
        isLink: false,
        avatar: null //用户的头像
      }
    },
    created: function () {

    },
    mounted: function () {
      let _this = this;
      window.addEventListener("popstate", function (e) { // 添加返回事件监听
        _this.isLink = false;
      }, false)

      this.$nextTick(function () {
        document.title = '我的';
        if (this.getStorage) {
          let gainTecherData = this.getStorage;
          if (gainTecherData) {
            this.isLogin = true;
            this.techerData = gainTecherData; //获取登录的数据
            this.avatar = gainTecherData.headimg; //获取登录的头像
            this.getUserInfo()
          }
        }
      })
    },
    computed: {
      getStorage() {
        return this.$store.getters.getStorage;
      },

    },
    methods: {
      getIsLink(bol) {
        this.isLink = bol
      },
      getUserInfo() {
        this.$http.post('/api.php/Tech/user',{
          techvid: this.techerData.vid
        }).then(res=>{
          if(res.data.errorCode == 200){
            console.log(res.data.data);
            this.userInfo = res.data.data
          }else{
            Toast(res.data.message)
          }
        }).catch(err => {
          Toast(err)
        })
      },
      setAvatar() {
        this.$refs.avatarInput.click()
      },
      changeImage(e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        var that = this;
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          that.avatar = this.result; //改变头像
        }
        if (this.$refs.avatarInput.files.length != 0) {
          var changeAvatarForm = this.$refs.changeAvatarForm; //获取form对象
          var image = new FormData(changeAvatarForm);
          image.append('avatar', this.$refs.avatarInput.files[0])
          //对接修改头像接口
        }

      },
      isWaitingTip(url) { //路由提示
        let bodyObj = document.getElementsByTagName("body")[0];
        let toastObj = document.getElementsByClassName("mint-toast");
        let toastLen = toastObj.length;
        if (!url) {
          this.$store.dispatch("delToast")
          Toast("正在开发中，敬请期待。。。")
        } else {
          this.$store.dispatch("delToast")
        }
      },
      jumpCom: function () {
        this.$router.push({
          path: "/user/coupon"
        })
      }

    }
  }

</script>
<style lang="stylus">
  .slide-fade {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,.slide-fade-leave-to {
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

  .fl {
  float: left
}

.fr {
  float: right
}

.clearFloat:after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  overflow: hidden;
  content: '.';
}
html,body {
  height: 100%;
}
#app {
  height 100%
}
.home-wrapper {
  height 100%
}
.userWrap {
  height: 100%;
  background-color: #f5f5f5;
  font-size: .28rem;
  text-align: left;
  padding-bottom: 2rem;
  .card {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: .3rem;
    box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.08);
  }
  .header-top {
    height: 1.74rem;
    background-image: linear-gradient(90deg,#fa7554 0%, #fa9820 100%);
    .img-box {
      width: 1.16rem;
	    height: 1.16rem;
      padding: .3rem 0.26rem 0 .36rem;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-login {
      padding-top: .64rem
    }
    .user-login a {
      font-size: .32rem;
      color: #fff;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      .user-name {
        padding-top: .44rem;
        font-size: .32rem;
        color: #fff;
      }
      .user-city {
        font-size: 0.24rem;
        color: #f5f5f5;
        line-height: 0.44rem;
      }
    }
  }
  .header-bottom {
    .user-asset {
      height: 0.84rem;
      display: flex;
      align-items: center;
      background-color: #fff;
      img{
        padding: 0 .36rem;
        width: 0.44rem;
	      height: 0.44rem;
      }
      p {
        font-size: .3rem;
        color: #666;
      }
      .wallet{
        padding-right: 2.64rem;
      }
      .number {
        padding: 0 .2rem;
        font-size: 0.34rem;
        color: #fa9820;
      }
      .arrow {
        padding: 0;
        width: 0.14rem;
        height: 0.24rem;
      }
    }
  }
  .middle {
    margin: .3rem auto;
    width: 7.42rem;
    display: flex;
    flex-wrap: wrap;
    border-radius: .16rem;
    overflow: hidden;
    li{
      width: 33.33%;
      height: 1.6rem;
      background-color: #fff;
      text-align: center;
      color: #999;
      .number {
        padding: .26rem 0 .16rem;
        font-size: .48rem;
        color: #262628;
      }
      p {
        font-size: 0.28rem;
      }
      img {
        padding: .26rem 0 .16rem;
        width: 0.44rem;
	      height: 0.48rem;
      }
    }
  }
  .footer {
    li {
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #e5e5e5;
      p {
        font-size: 0.3rem;
	      color: #4a4a4a;
      }
    }
    li:nth-last-child(1) {
      border-bottom: none;
    }
    .cell-logo {
      padding: .3rem .22rem 0 .6rem;
      width: 0.44rem;
	    height: 0.44rem;
    }
    .arrow{
      padding: .36rem .68rem 0 0;
      width: 0.14rem;
	    height: 0.24rem;
    }
  }
}

</style>
