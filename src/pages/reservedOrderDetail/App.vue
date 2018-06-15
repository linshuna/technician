<template>
  <div id="app">
    <div class="type-wrapper border-bottom-1px">
      <div class="time">距离到店时间3时22分</div>
      <div class="order-type">已确认</div>
    </div>
    <div class="carInfo-wrapper border-bottom-1px">
      <div class="carno">粤A686868</div>
      <div class="brand">奔驰</div>
      <div class="records-num">已到店1次</div>
    </div>
    <div class="name border-bottom-1px">周柏豪</div>
    <div class="service-type border-bottom-1px">
      服务类型
      <div class="type">洗车</div>
    </div>
    <div class="reservedTime border-bottom-1px">
      预约到店时间
      <div class="time">2018.08.08 14:50</div>
    </div>
    <div class="link-phone border-bottom-1px">
      联系电话
      <a href="tel:1111" class="phone">1552108888</a>
    </div>
    <div class="owner-remark border-bottom-1px">
      车主备注
      <div></div>
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
  
  export default {
    name: 'App',
    data () {
      return {
        
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
      cancelReseved() {
        window.location.href='reason.html'
      },
      editReseved() {
        window.location.href='editReservedOrder.html'
      }
    },
    components: {
      
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
