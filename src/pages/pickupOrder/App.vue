<template>
  <div id="app">
    <mt-navbar v-model="type">
      <mt-tab-item id="atServe" class="item">
        <div>服务中(22)</div>
        <div>¥25,7878</div>
      </mt-tab-item>
      <mt-tab-item id="waitPay">
        <div>待结账(2)</div>
        <div>¥25,8</div>
      </mt-tab-item>
      <mt-tab-item id="picked">
        <div>已提车</div>
      </mt-tab-item>
    </mt-navbar>

    <div class="search">搜索车牌</div>
    <!-- tab-container -->
    <mt-tab-container v-model="type">
      <mt-tab-container-item id="atServe">
        <div class="item border-bottom-1px" v-for="item in atServeOrder">
          <img class="carImg" :src="item.carImg"/>
          <div class="main-c">
            <div class="carno">{{item.carno}}</div>
            <div class="name">{{item.name}}</div>
            <div class="itemName">{{item.itemName}}</div>
            <div class="deliveryTime">预计交车时间 {{item.deliveryTime}}</div>
          </div>
          <div class="main-r">
            <div class="type">服务中</div>
            <div class="account">¥{{item.account}}</div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="waitPay">
        2
      </mt-tab-container-item>
      <mt-tab-container-item id="picked">
        3
      </mt-tab-container-item>
    </mt-tab-container>
    <router-view></router-view>  
  </div>
</template>

<script>

  export default {
    name: 'App',
    data () {
      return {
        type:'atServe',
        atServeOrder: [
          {
            carImg: require('modules/images/carImg.png'),
            carno: '临A8354J',
            name: '益达',
            itemName: '维修、美容',
            deliveryTime: '6.4 16:50',
            account: '1,370'
          },
          {
            carImg: require('modules/images/carImg.png'),
            carno: '临A8888J',
            name: '益达222',
            itemName: '维修',
            deliveryTime: '6.12 16:50',
            account: '16,866'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  #app >>>  .mint-tab-item-label
    font-size: .32rem

  #app
    font-family: PingFangSC-Regular
    color: #2c3e50
    .mint-navbar
      position: fixed
      top: 0
      width: 100%
      z-index: 9
     
    .search
      height: .6rem
      line-height: .6rem
      padding-left: .6rem
      font-size: .24rem
      border: 1px solid #eaeaea
      margin: .24rem
      margin-top: 1.6rem;
      background: url('../../modules/images/searchIcon.png') no-repeat
      background-size: .4rem .4rem
      background-position: .1rem
    .item
      overflow: hidden
      font-size: .28rem
      padding: .2rem
      .carImg
        width: 1rem
        height: 1rem
        float: left
      .main-c
        float: left
        margin-left: .4rem
        color: #a9a9a9
        line-height: .54rem
        .carno
          font-size: .32rem
          line-height: .54rem
          color: #2c3e50
      .main-r
        float: right 
        font-size: .32rem
        .type
          color: $color-main
          margin-bottom: .9rem
        .account
          color: #2eb2f3
          font-size: .36rem
</style>
