<template>
  <div class="bill">
    <div class="wrapper">
      <div class="item">
        结算金额
        <div class="fr">100</div>
      </div>
      <div class="item">
        成本价
        <div class="fr">100</div>
      </div>
      <div class="item">
        结算金额
        <div class="fr">100</div>
      </div>
      <div class="item">
        实收金额
        <div class="fr">100</div>
      </div>
      <div class="item">
        回访日期
        <div class="fr">2018.09</div>
      </div>
    </div>
    <div class="btn">提交结账</div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .bill
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #f9f9f9
    overflow: scroll
    padding-bottom: .2rem
    .wrapper
      background: #fff
      font-size: .32rem
      .item
        height: 1rem
        line-height: 1rem
        padding: 0 .2rem
        .fr
          color: #fb5757
    .btn
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main      
</style>