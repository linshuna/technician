<template>
  <div id="app">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">待确认</mt-tab-item>
        <mt-tab-item id="2">已确认</mt-tab-item>
        <mt-tab-item id="3">已到店</mt-tab-item>
        <mt-tab-item id="4">已取消</mt-tab-item>
      </mt-navbar>

      <div class="selectTime">6月4日(星期一)</div>  

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="noData" v-if="!orderData.length">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">无数据</div>
            </div>
            <div class="order-wrapper" v-if="orderData.length">
            <div class="item" v-for="item in orderData">
              <div class="type">已确认(<span>1</span>)</div>
              <div class="carInfo">
                <div class="time">{{item.time}}</div>
                <img class="carImg" :src="item.carImg"/>
                <div class="carno">{{item.carno}}</div>
                <div class="name">{{item.name}}</div>
              </div>
              <div class="repaire-type-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="itemName">{{item.itemName}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="noData" v-if="!orderHaveConfirmData.length">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">无数据</div>
            </div>
            <div class="order-wrapper" v-if="orderHaveConfirmData.length">
            <div class="item" v-for="item in orderHaveConfirmData">
              <div class="type">已确认(<span>1</span>)</div>
              <div class="carInfo">
                <div class="time">{{item.time}}</div>
                <img class="carImg" :src="item.carImg"/>
                <div class="carno">{{item.carno}}</div>
                <div class="name">{{item.name}}</div>
              </div>
              <div class="repaire-type-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="itemName">{{item.itemName}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
         都是
        </mt-tab-container-item>
      </mt-tab-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected:'1',
        noDataImg: require('modules/images/noData-order.png'),
        orderData: [
          {
            type: 0,
            time: '17:00',
            carno: '粤A6666',
            itemName: '美容',
            name: '烟火',
            carImg: require('modules/images/carImg.png')
          },
           {
            type: 0,
            time: '17:00',
            carno: '粤A6666',
            itemName: '美容',
            name: '烟火222',
            carImg: require('modules/images/carImg.png')
          },
           {
            type: 0,
            time: '17:00',
            carno: '粤A6666',
            itemName: '美容',
            name: '烟火333',
            carImg: require('modules/images/carImg.png')
          }
        ],
        orderHaveConfirmData: []
      }
    }
  }  
</script>

<style lang="stylus">
  @import '~modules/css/variable.styl'

  #app
    font-family: PingFangSC-Regular
    .selectTime
      height: 1rem
      line-height: 1rem
      padding-left: .4rem
      font-size: .24rem
      background: #f9f9f9
    .noData
      margin: 2rem
      text-align: center
      .noDataImg
        width: 2rem
      .text
        font-size: .32rem
        color: $color-main
    .order-wrapper
      margin: .4rem
      .item
      .type
        font-size: .32rem
        color: #2c3e50
      .carInfo
        display: flex
        align-items: center
        position: relative
        .time
          font-size: .24rem
          color: #c1bfbf
        .carImg
          margin: 0 .2rem
          width: 1rem
        .carno
          color: #848484
        .name
          position: absolute
          right: 0
          color: #848484
      .repaire-type-wrapper
        width: 100%
        height: 2rem
        position: relative
        .circle
          width: .2rem
          height: .2rem
          border: .1rem solid #ffdaa2
          border-radius: 50%
          background: $color-main
        .line
          position: absolute
          top: .6rem
          left: .18rem
          height: 50%
          border-left: 1px solid #eee
        .itemName
          position: absolute
          left: 1rem
          top: .3rem
          color: #000  
</style>
