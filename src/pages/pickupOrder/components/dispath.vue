<template>
  <div class="dispath">
    <mt-radio
      align="right"
      v-model="value"
      :options="options">
    </mt-radio>
    <div class="btn">确定</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: ['名字','名字2','名字22'],
        value:''
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .dispath >>>.mint-radiolist-title
    margin: 0

  .dispath
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