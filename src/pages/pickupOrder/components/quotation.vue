<template>
  <div class="quotation">
    <div class="total-wrapper">¥0 
      <img src=""/>
    </div>
    <div class="btn-wrapper">
      <div class="btn border-right-1px" @click="addSever">添加服务</div>
      <div class="btn">保存报价</div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      addSever() {
        this.$router.push('/addSever')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  .quotation
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #f9f9f9
    .total-wrapper
      position: fixed
      bottom: .8rem
      line-height: .8rem
      width: 100%
      line-height: 0.8rem
      text-align: right
      background: #fff
    .btn-wrapper
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      background: $color-main
      .btn
        width: 50%
        float: left  
        color: #fff
        text-align: center
</style>