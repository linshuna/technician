<template>
  <div id="app" class="set-tab-default">
    <mt-navbar v-model="selected" :fixed=true>
      <mt-tab-item id="1">当前仓库</mt-tab-item>
      <mt-tab-item id="2">待采购</mt-tab-item>
      <mt-tab-item id="3">待入库</mt-tab-item>
      <mt-tab-item id="4">领取记录</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul>
          <li class="item border-bottom-1px">
            <img class="proImg" src="../../modules/images/defaultLogo.png"/>
            <div class="main-c">
              <div>小型轿车雨刮器</div>
              <div>编码: B2121</div>
              <div>库存: 23</div>
            </div>
            <div class="iconfont arrowRight">&#xe646;</div>
          </li>
        </ul>
        <div class="btn">添加库存</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul>
        22
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul>
        33
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
  
  export default {
    name: 'App',
    data () {
      return {
        selected: '1'
      }
    },
    created() {
      let gainTecherData = this.$store.getters.getStorage;
      if(!gainTecherData){
        let instance = Toast('请先登录')
        setTimeout(() => {
          instance.close()
          window.location.href = './login.html?returnUrl='+window.location.href
        }, 2000);
      }
    },
    methods: {
      
    }
  }
</script>
<style lang="stylus">
  .mint-navbar.is-fixed
    border-bottom: 1px solid #efefef!important
</style>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  
  #app
    color: #2c3e50
    font-size: .28rem
    ul
      margin-top: 1rem
      padding-bottom: 1rem
      .item
        display: flex
        padding: 0 .2rem
        .proImg
          width: 1.2rem
          height: 1.2rem
          margin: .32rem .2rem
          display: inline-block
          vertical-align: middle
        .main-c
          flex: 1
          line-height: .45rem
          padding: .2rem 0
        .arrowRight
          float: right 
          line-height: 2rem
          font-size: .4rem
          color: #999
    .btn
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main  
</style>
