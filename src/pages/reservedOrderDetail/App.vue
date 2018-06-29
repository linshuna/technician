<template>
  <div id="app">
    <div class="type-wrapper border-bottom-1px">
      <div class="time" v-if="this.data.status==0 && this.diff>0">距离到店时间{{this.countDowmTime}}</div>
      <div class="order-type">{{this.data.status==0?'待到店':'已到店'}}</div>
    </div>
    <div class="carInfo-wrapper border-bottom-1px">
      <div class="carno">{{this.data.carNo}}</div>
      <div class="brand">{{this.data.carplate}}</div>
      <div class="records-num">已到店{{this.data.num}}次</div>
    </div>
    <div class="name border-bottom-1px">{{this.data.uname}}</div>
    <div class="service-type border-bottom-1px">
      服务类型
      <div class="type">{{this.data.project}}</div>
    </div>
    <div class="reservedTime border-bottom-1px">
      预约到店时间
      <div class="time">{{this.data.orderDay}}</div>
    </div>
    <div class="link-phone border-bottom-1px">
      联系电话
      <a href="tel:1111" class="phone">{{this.data.phone}}</a>
    </div>
    <div class="owner-remark border-bottom-1px">
      车主备注
      <div class="owner">{{this.data.remark}}</div>
    </div>
    <div class="store-remark border-bottom-1px">
      车店备注
      <div></div>
    </div>
    <div class="btn-wrapper">
      <div class="btn pickup-btn border-right-1px">立即接车</div>
      <div class="btn cancel-btn border-right-1px" @click="cancelReseved">取消预约</div>
      <div class="btn edit-btn" @click="editReseved">编辑预约</div>
    </div>
  </div>
</template>

<script>
  import {GetQueryString,SecondToDate} from 'modules/js/config.js'
  import axios from 'axios'
  import Vue from 'vue'
  import vueAxiosPlugin from "modules/js/axiosPrototype.js"
  Vue.use(vueAxiosPlugin)
  import { Toast } from 'mint-ui'

  export default {
    name: 'App',
    data () {
      return {
        orderNo: '',
        vid: '',
        data: {},
        countDowmTime: '',
        diff:''
      }
    },
    mounted() {
      this.orderNo = GetQueryString('orderNo')
      this.vid = GetQueryString('vid')
      this.$http.post('/api.php/TechOrder/orderdetail',{orderNo: this.orderNo})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            this.data = res.data.detail
            this.data.num = res.data.num
            let date  = new Date()
            date = Date.parse(date)/1000
            this.diff = Number(this.data.orderDate)-Number(date)
            if(this.diff<0){
              return
            }
            this.countDowmTime = SecondToDate(this.diff)
          }else{
            Toast(res.message)
          }
        })
    },
    methods: {
      cancelReseved() {
        window.location.href='reason.html?vid='+this.vid
      },
      editReseved() {
        window.location.href='editReservedOrder.html?orderNo='+this.orderNo
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  #app
    color: #2c3e50
    font-size: .28rem
    height: .8rem
    line-height: .8rem
    margin: 0 .2rem
    .type-wrapper
      height: 1rem
      line-height: 1rem
      font-size: .34rem
      color: $color-main
      .time
        float: left
      .order-type
        float: right
    .carInfo-wrapper
      height: .8rem
      line-height: .8rem
      .carno
        float: left
      .brand
        float: left
        margin-left:.28rem
      .records-num
        float: right
        height: .4rem
        line-height: .4rem
        padding: 0 .2rem
        margin-top: .16rem
        color: #55b7ff
        border: 1px solid #55b7ff
    .name
    .service-type
      .type
        float: right
        color: #a7a7a7
    .reservedTime
      .time
        color: #a7a7a7
        float: right
    .link-phone
      .phone
        color: #55b7ff
        float: right
    .owner-remark
      .owner
        color: #a7a7a7      
    .btn-wrapper
      position: fixed
      width: 100%
      left: 0 
      right: 0
      bottom: 0
      color: #fff
      background: $color-main
      .btn
        float: left
        width: 33.33%
        text-align: center
</style>
