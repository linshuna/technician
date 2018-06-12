<template>
  <div class="edit">
    <div class="pickup">
      <div class="title border-bottom-1px">接车事项</div>
      <div class="atStore">
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
        <div class="delivery-time" @click="openTimePicker">
          <input placeholder="请选择日期" v-model="deliveryTime"/>
          <mt-datetime-picker @confirm="handleConfirm" ref="pickerDelivery" type="datetime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hour-format="{value} 时" minute-format="{value} 分" ></mt-datetime-picker>
        </div>
      </div>
      <div class="owner-remark">
        车主嘱咐
        <textarea class="remark" placeholder="请输入车主嘱咐"></textarea>
      </div>
    </div>
    <div class="btn">保存</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value:'',
        deliveryTime:''

      }
    },
    methods: {
      openTimePicker() {
        this.$refs.pickerDelivery.open();
      },
      handleConfirm() {

      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  .edit >>> .mint-switch
    position: absolute
    top: .1rem
    right: 0

  .edit
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #fff
    overflow: scroll
    padding: 0 .2rem
    padding-bottom: .2rem
    .title
        height: .8rem
        line-height: .8rem
    .atStore
      height: .8rem
      line-height: .8rem
      position: relative
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
        border-radius: 4px;
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
        border-radius: 4px;
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
        border-radius: 4px;
    .owner-remark
      .remark
        width: 60%
        height: 1rem
        margin-left: .1rem
        vertical-align: middle
        border: 1px solid #d9d9d9
        border-radius: 4px
    .btn
      position: fixed
      bottom: 0
      right: 0
      left: 0
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main    
</style>