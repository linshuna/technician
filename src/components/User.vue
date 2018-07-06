<template>
  <div class="userWrap">
    <div v-if="!isLink">
      <div class="card header">
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
            <div class="user-asset clearFloat">
              <p class="fl">可提现
                <span class="number">0.00</span>
              </p>
              <router-link to="/user/wallet">
                  <button class="fl">
                    我的钱包
                  </button>
                </router-link>
            </div>
          </div>
        </div>
        <ul class="header-bottom">
          <li>
            <p>今日收入</p>
            <span>10</span>
          </li>
          <li>
            <p>今日预约</p>
            <span>10</span>
          </li>
          <li>
            <p>未交车辆</p>
            <span>10</span>
          </li>
        </ul>
      </div>
      <ul class="card middle">
        <router-link v-for="(linkItem,index) in userTypeData" :key="index" :to="linkItem.linkUrl" tag="li">
          <p>{{linkItem.linkName}}</p>
          <img :src="linkItem.icon" alt="">
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
          'linkUrl': '/user/coupon',
          'icon': require("modules/images/myOrderIcon.png"),
          'linkName': '我的账单'
        }, {
          'linkUrl': '/user/coupon',
          'icon': require("modules/images/cordIcon.png"),
          'linkName': '优惠券'
        }],
        userSettingTypeData: [{
          'linkUrl': '/user/selfCenter',
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
  background-color: #dedede;
  font-size: .28rem;
  text-align: left;
  padding-bottom: 2rem;
  .card {
    width: 100%;
    background-color: #ffffff;
    margin-bottom: .3rem;
    box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.08);
  }
  .header {
    height: 4.24rem;
  }
  .header-top {
    height: 2.88rem;
    border-bottom: 1px solid #e5e5e5;
    .img-box {
      width: 1.88rem;
      height: 1.88rem;
      margin: .38rem .44rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 1.88rem;
        height: 1.88rem;
      }
    }
    .user-login {
      padding-top: .2rem
    }
    .user-login a {
      font-size: .48rem;
      color: #4a4a4a;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      .user-name {
        padding-top: .84rem;
        font-size: .48rem;
        color: #4a4a4a;
        line-height: .66rem;
      }
      .user-city {
        font-size: 0.32rem;
        color: #9b9b9b;
        line-height: 0.44rem;
      }
      .user-asset {
        p {
          font-size: .28rem;
          color: #9b9b9b;
          .number {
            font-size: .4rem;
            color: #fa9e15;
            padding-left: .2rem;
          }
        }
        button {
          width: 1.28rem;
          height: 0.34rem;
          line-height: .3rem;
          text-align: center;
          border-radius: 0.16rem;
          margin-left: .8rem;
          margin-top: .06rem;
          font-size: .24rem;
          color: #fa9e15;
          border: solid 1px #fa9e15;
          background-color: #fff;
        }
      }
    }
  }
  .header-bottom {
    display: flex;
    justify-content: space-around;
    li {
      text-align: center;
      p {
        padding-top: 0.2rem;
        font-size: 0.28rem;
        color: #999999;
      }
      span {
        display: block
        padding-top: 0.2rem;
        font-size: 0.48rem;
        color: #262628;
      }
    }
  }
  .middle {
    height: 1.6rem;
    display: flex;
    justify-content: space-around;
    text-align: center;
    p {
      padding-top: 0.24rem;
      font-size: 0.28rem;
      color: #999999;
    }
    img {
      padding-top: .2rem;
      width: 0.44rem;
	    height: 0.48rem;
    }
  }
  .footer {
    li {
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px solid #e5e5e5;
      p {
        font-size: 0.34rem;
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
