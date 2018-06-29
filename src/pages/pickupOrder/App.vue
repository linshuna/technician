<template>
  <div id="app">
    <mt-navbar v-model="type">
      <mt-tab-item id="atServe" class="">
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

    <div class="search">
      <input v-model="carno" class="search-input" placeholder="请输入车牌号" @click.prevent="showCarKeyCode" readonly/>
    </div>
    <!-- tab-container -->
    <mt-tab-container v-model="type">
      <mt-tab-container-item id="atServe">
        <div class="item border-bottom-1px" v-for="item in atServeOrder" @click="goOrderDetail(item.orderNo)" v-if="atServeOrder.length>0">
          <img class="carImg" :src="item.icon"/>
          <div class="main-c">
            <div class="carno">{{item.carNo}}</div>
            <div class="name">{{item.uname}}</div>
            <div class="itemName">{{item.project}}</div>
            <div class="deliveryTime">预计交车时间 <span>{{item.gettime}}</span></div>
          </div>
          <div class="main-r">
            <div class="type">服务中</div>
            <div class="account">¥{{item.price}}</div>
          </div>
        </div>
         <div class="noData" v-if="atServeOrder.length==0">
          <img class="noDataImg" :src="noDataImg" />
          <div class="text">暂无订单</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="waitPay">
        <div class="item border-bottom-1px" v-for="item in waitPayOrder" @click="goOrderDetail(item.orderNo)" v-if="waitPayOrder.length>0">
          <img class="carImg" :src="item.icon"/>
          <div class="main-c">
            <div class="carno">{{item.carNo}}</div>
            <div class="name">{{item.uname}}</div>
            <div class="itemName">{{item.project}}</div>
            <div class="deliveryTime">预计交车时间 <span>{{item.gettime}}</span></div>
          </div>
          <div class="main-r">
            <div class="type">待结账</div>
            <div class="account">¥{{item.price}}</div>
          </div>
        </div>
        <div class="noData" v-if="waitPayOrder.length==0">
          <img class="noDataImg" :src="noDataImg" />
          <div class="text">暂无订单</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="picked">
        <div class="item border-bottom-1px" v-for="item in pickedOrder" @click="goOrderDetail(item.orderNo)" v-if="pickedOrder.length>0">
          <img class="carImg" :src="item.icon"/>
          <div class="main-c">
            <div class="carno">{{item.carNo}}</div>
            <div class="name">{{item.uname}}</div>
            <div class="itemName">{{item.project}}</div>
            <div class="deliveryTime">预计交车时间 <span>{{item.gettime}}</span></div>
          </div>
          <div class="main-r">
            <div class="type">已提车</div>
            <div class="account">¥{{item.price}}</div>
          </div>
        </div>
        <div class="noData" v-if="pickedOrder.length==0">
          <img class="noDataImg" :src="noDataImg" />
          <div class="text">暂无订单</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <car-key-code v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></car-key-code>

    <router-view></router-view>  
  </div>
</template>

<script>
  import carKeyCode from "components/carKeyCode"
  import { Toast} from 'mint-ui'

  export default {
    name: 'App',
    data () {
      return {
        noDataImg: require('modules/images/noData-order.png'),
        type:'atServe',
        carno: '',
        isShow: false,
        atServeOrder: [],
        waitPayOrder: [],
        pickedOrder: []
      }
    },
    methods: {
      goOrderDetail(orderNo) {
        window.location.href = `./pickupOrder.html?orderNo=${orderNo}#/path`
        //this.$router.push('/path')
      },
      getOrderList(carNo) {
        this.$http.post('/api.php/TechService/index',{carNo: carNo})
          .then((response)=>{
            let res = response.data;
            if(res.errorCode == 200){
              this.atServeOrder = res.data.service
              this.waitPayOrder = res.data.pay
              this.pickedOrder = res.data.finish
            }
          })
      },
      gainCarno:function(value){//子组件传给当前组件（父组件）
        this.carno = value.carno
        this.tips = value.tips
        if(this.tips&&this.tips!=''){
          Toast(this.tips)
        }else{
          this.getOrderList(this.carno)
        }
      },
      showCarKeyCode() {
        this.isShow = true
      },
    },
    created() {
      this.getOrderList(this.carno)
    },
    components:{
      'car-key-code':carKeyCode,
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  #app >>>  .mint-tab-item-label
    font-size: .28rem

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
        padding: .2rem
        box-sizing: border-box  
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
    .noData
      margin: 2rem
      text-align: center
      .noDataImg
        width: 2rem
      .text
        font-size: .32rem
        color: $color-main      
</style>
