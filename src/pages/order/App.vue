<template>
  <div id="app">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">待到店</mt-tab-item>
        <mt-tab-item id="2">已到店</mt-tab-item>
        <mt-tab-item id="3">已取消</mt-tab-item>
        <mt-tab-item id="4" class="search">
          <img src="../../modules/images/searchIcon.png" class="search-icon" @click="searchCarOrder"></img>
        </mt-tab-item>
      </mt-navbar>

      <!--<div class="selectTime">6月4日(星期一)</div>  -->

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="noData" v-if="orderHaveConfirmData.length==0">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">暂无订单</div>
          </div>
          <div class="order-wrapper" v-if="orderHaveConfirmData.length>0">
            <div class="item" v-for="item in orderHaveConfirmData" @click="goOrderDetail(item.orderNo)">
              <div class="carInfo">
                <div class="time">
                  <div>{{item.orderDay}}</div>
                  <div>{{item.orderTime}}</div>
                </div>
                <img class="carImg" :src="item.icon"/>
                <div class="carno">{{item.carNo}}</div>
                <div class="name">{{item.uname}}</div>
              </div>
              <div class="repaire-type-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="itemName">{{item.project}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="noData" v-if="orderHaveInStoreData.length==0">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">暂无订单</div>
          </div>
          <div class="order-wrapper" v-if="orderHaveInStoreData.length>0">
            <div class="item" v-for="item in orderHaveInStoreData">
              <div class="carInfo">
                <div class="time">
                  <div>{{item.orderDay}}</div>
                  <div>{{item.orderTime}}</div>
                </div>
                <img class="carImg" :src="item.icon"/>
                <div class="carno">{{item.carNo}}</div>
                <div class="name">{{item.uname}}</div>
              </div>
              <div class="repaire-type-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="itemName">{{item.project}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="noData" v-if="orderHaveCancleData.length==0">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">暂无订单</div>
          </div>
          <div class="order-wrapper" v-if="orderHaveCancleData.length>0">
            <div class="item" v-for="item in orderHaveCancleData">
              <div class="carInfo">
                <div class="time">
                  <div>{{item.orderDay}}</div>
                  <div>{{item.orderTime}}</div>
                </div>
                <img class="carImg" :src="item.icon"/>
                <div class="carno">{{item.carNo}}</div>
                <div class="name">{{item.uname}}</div>
              </div>
              <div class="repaire-type-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="itemName">{{item.project}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          
        </mt-tab-container-item>
      </mt-tab-container>
    <router-view></router-view>  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected:'1',
        noDataImg: require('modules/images/noData-order.png'),
        orderHaveConfirmData: [],
        orderHaveInStoreData: [],
        orderHaveCancleData: []
      }
    },
    methods: {
      goOrderDetail(id) {
        window.location.href = 'editReservedOrder.html?orderId='+id
      },
      searchCarOrder() {
        this.$router.push('/search')
      }
    },
    mounted() {
      this.$http.post('/api.php/TechOrder/lists',{carNo: ''})
      .then((response)=>{
        let res = response.data
        if(res.errorCode == 200){
          this.orderHaveConfirmData = res.data.nodeal
          this.orderHaveInStoreData = res.data.deal
          console.log(this.orderHaveInStoreData)
          this.orderHaveCancleData = res.data.cancel
        }else{
          Toast(res.message)
        }
      })
    }
  }  
</script>

<style lang="stylus">
  @import '~modules/css/variable.styl'

  #app
    font-family: PingFangSC-Regular
    .mint-navbar
      .mint-tab-item
        padding: 0
        flex: 2
        .mint-tab-item-label
          font-size: .32rem
          line-height: .8rem  
      .search
        flex: 1          
        .search-icon
          width: 0.5rem
          padding-top: .2rem
          height: 0.6rem
          box-sizing: border-box
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
          text-align: center
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
