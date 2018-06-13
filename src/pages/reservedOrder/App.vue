<template>
  <div id="app">
    <Calendar
      @choseDay="clickDay"
      @changeMonth="changeDate" @isToday="isToday"></Calendar>
    <div class="look" @click="goOrder">查看</div>
    <div class="add-wrapper"> 
      <div class="add-order-btn"></div>  
    </div>
    <div class="noData" v-if="!orderData.length">
      <img class="noDataImg" :src="noDataImg" />
      <div class="text">无数据</div>
    </div>
    <div class="order-wrapper" v-if="orderData.length">
      <div class="item" v-for="item in orderData" @click="goOrderDetail">
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
          <div class="btn-wrapper">
            <div class="pickup btn">立即接车</div>
            <div class="cancelR btn">取消预约</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendar from 'vue-calendar-component';

  export default {
    name: 'App',
    data () {
      return {
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
        ]
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
      clickDay(data) {
        console.log(data); //选中某天
      },
      changeDate(data) {
        console.log(data); //左右点击切换月份
      },
      clickToday(data) {
        console.log(data); //跳到了本月
      },
      isToday(data) {
        console.log(data);
      },
      goOrder() {
        window.location.href = 'order.html'
      },
      goOrderDetail() {
        window.location.href = 'reservedOrderDetail.html'
      }
    },
    components: {
      Calendar
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  #app >>> .wh_content_all
    background-color: #fff
    .wh_top_changge
      li
        color: #969696
      .wh_jiantou1
        border-top: 2px solid #2c3e50
        border-left: 2px solid #2c3e50  
      .wh_jiantou2
        border-top: 2px solid #2c3e50
        border-right: 2px solid #2c3e50
    .wh_content_item
      color: #2c3e50
      .isTodayNow
        color: #fff
        background-color: #d2d2d2
      .wh_isToday
        color: #fff
        background-color: $color-main
    .wh_top_changge .wh_content_li
        flex: 1    
body
  background: #f9f9f9        
  #app
    font-family: PingFangSC-Regular
    background: #F9F9F9
    .look
      position: absolute
      right: 0.2rem
      top: 0.34rem
      font-size: .28rem
      color: $color-main
    .add-wrapper
      overflow: hidden
      margin-top: .2rem
      .add-order-btn
        width: 1rem
        height: .6rem
        float: right
        background: url('../../modules/images/add-icon.png') no-repeat
        background-size: contain
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
        .btn-wrapper
          position: absolute
          right: 0
          bottom: .4rem
          .btn
            float: left
            font-size: .28rem
            color: $color-main
            padding: .1rem
            border: 1px solid $color-main
          .pickup
            margin-right: 0.1rem
</style>
