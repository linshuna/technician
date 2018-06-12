<template>
  <div class="addSever">
    <input class="search" placeholder="搜索服务名称/编码"/>
    <div class="item-wrapper">
      <div class="item border-bottom-1px">
        <div class="name">代办提档费</div>
        <div class="code">编码: 23232</div>
        <div class="account">¥300</div>
        <div class="add">+</div>
      </div>
      <div class="item border-bottom-1px">
        <div class="name">更换氧传送器</div>
        <div class="code">编码: 23232</div>
        <div class="account">¥300</div>
        <div class="add">+</div>
      </div>
      <div class="item border-bottom-1px">
        <div class="name">仪表台修复</div>
        <div class="code">编码: 23232</div>
        <div class="account">¥300</div>
        <div class="add">+</div>
      </div>
      <div class="item border-bottom-1px">
        <div class="name">代理违章服务费</div>
        <div class="code">编码: 23232</div>
        <div class="account">¥300</div>
        <div class="add">+</div>
      </div>
    </div>

    <div class="btn-wrapper">
      <div class="btn border-right-1px" @click="newSever">新增</div>
      <div class="btn">保存</div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      newSever() {

      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  .addSever
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 11
    font-size: .28rem
    background: #fff
    .search
      width: 90%
      height: .8rem
      padding: .1rem
      padding-left: .8rem
      box-sizing: border-box
      border: 1px solid #eee
      position: absolute
      left: .3rem
      top: .2rem
      background: url('../../../modules/images/searchIcon.png') no-repeat
      background-size: .5rem .5rem
      background-position: .2rem
    .item-wrapper
      padding: 0 .2rem
      margin-top: 1.4rem  
      .item
        font-size: .28rem
        line-height: .6rem
        position: relative
        .name
          font-size: .32rem
        .account
          color: #0087ff
        .add
          position: absolute
          right: 0  
          bottom: .2rem
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