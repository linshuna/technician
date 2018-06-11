<template>
  <div id="app">
    <router-view></router-view>
    <div class="pickup">
      <div class="title border-bottom-1px">接车事项</div>
      <div class="atStore border-bottom-1px">
        在店等
        <mt-switch v-model="value"></mt-switch>
      </div>
      <div class="odometer-wrapper">
        <div class="title">进店里程</div>
        <input class="odometer" type="number" />
        <div class="pre-odometer">上次里程:<span>无</span></div>
      </div>
      <div class="oil-wrapper">
        <div class="title">进店油表</div>
        <div class="oil">1/2</div>
      </div>
      <div class="expect-delivery">
        <div class="title">预计交车</div>
        <div class="delivery-time" @click="openTimePicker">2018-08-08
          <mt-datetime-picker v-model="deliveryTime" @confirm="handleConfirm" ref="picker" type="datetime" ></mt-datetime-picker>
        </div>
      </div>
      <div class="owner-remark">
        车主嘱咐
        <textarea class="remark" placeholder="请输入车主嘱咐"></textarea>
      </div>
    </div>

    <div class="btn-wrapper">
      <div class="btn btn-l border-right-1px">
        <p>完成接待并快速报价</p>
        <p>添加服务</p>
      </div>
      <div class="btn receive">接待</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data () {
      return {
        value: '',
        deliveryTime:''
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
      openTimePicker() {
        this.$refs.picker.open();
      },
      handleConfirm() {
        this.$refs.picker.close();
      }
    },
    components: {
      
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  #app >>> .mint-switch
    float: right
    margin-top: .1rem

  #app
    color: #2c3e50
    font-size: .32rem
    margin: 0 .2rem
    .title
      height: .8rem
      line-height: .8rem
    .atStore
      height: .8rem
      line-height: .8rem
    .odometer-wrapper
      overflow: hidden;
      .title
        float: left
      .odometer
        display: inline-block
        width: 4rem
        padding: .1rem .2rem 
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9
      .pre-odometer
        font-size: .24rem
        float: left
        margin-left: 1.4rem
    .oil-wrapper
      overflow: hidden
      .title
        float: left
      .oil
        display: inline-block
        width: 4rem
        height: .4rem
        padding: .1rem .2rem 
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9 
    .expect-delivery
      overflow: hidden
      .title
        float: left
      .delivery-time
        display: inline-block
        width: 4rem
        height: .4rem
        padding: .1rem .2rem 
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9 
    .owner-remark
      .remark
        width: 60%
        height: 1rem
        margin-left: .1rem
        vertical-align: middle
        border: 1px solid #d9d9d9 
  .btn-wrapper
      position: fixed
      width: 100%
      height: 1rem
      bottom: 0
      left: 0
      right: 0
      .btn
        float: left
        width: 50%
        text-align: center
        color: #fff
        background: $color-main
      .btn-l
        height: 1rem
        font-size: .28rem
        padding-top: .2rem
      .receive
        line-height: 1rem            
</style>
