<template>
  <div class="search-wrapper">
    <div class="search">
      <img :src="searchIcon" alt="">
      <input type="text" v-model="carno" placeholder="搜索车牌" @click.prevent="showCarKeyCode" readonly/>
    </div>

    <mt-navbar v-model="selected">
        <mt-tab-item id="1">待到店</mt-tab-item>
        <mt-tab-item id="2">已到店</mt-tab-item>
        <mt-tab-item id="3">已取消</mt-tab-item>
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
    </mt-tab-container>

    <carKeyCode v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow" @canRequest="searchCarOrder"></carKeyCode>
  </div>
</template>
<script>
  import carKeyCode from 'components/carKeyCode.vue'
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        selected:'1',
        noDataImg: require('modules/images/noData-order.png'),
        searchIcon: require("modules/images/searchIcon.png"),
        isShow: false,
        tips:'',
        gainCarData:null,
        carno: '',
        orderHaveConfirmData: [],
        orderHaveInStoreData: [],
        orderHaveCancleData: []
      }
    },
    methods: {
      gainCarno:function(value){
        this.carno = value.carno
        this.tips = value.tips
        if(this.tips&&this.tips!=''){
          Toast(this.tips)
        }
      },
      showCarKeyCode() {
        this.isShow = true
      },
      searchCarOrder() {
        this.$http.post('/api.php/TechOrder/lists',{carNo: this.carno})
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
    },
    watch: {
      
    },
    components:{
      carKeyCode
    }
  }
</script>
<style lang="stylus" scoped>
.search-wrapper >>> .pkey-header2
  font-size: .32rem

.search-wrapper
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 9
  background: #fff
  .search
    vertical-align: middle
    text-align: left
    border: 1px solid #f4f4f4
    border-radius: 5px
    margin: .2rem .4rem 0 .4rem
    padding-left: .2rem
    box-sizing: border-box
    img 
      display: inline-block
      width: .35rem
      vertical-align: middle
    input 
      display: inline-block
      width: 90%
      vertical-align: middle
      font-size: .28rem
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