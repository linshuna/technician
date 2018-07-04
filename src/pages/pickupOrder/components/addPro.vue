<template>
  <div class="addSever">
    <input class="search" placeholder="搜索商品名称"/>
    <span class="filter">筛选</span>
    <ul class="item-wrapper">
      <li class="item border-bottom-1px">
        <div class="name">主气囊</div>
        <div class="code">商品编码: 23232</div>
        <div class="account">¥300</div>
        <div class="countBtn-wrapper">
          <div class="reduce" @click="reduceCount">-</div>
          <input class="count-input" type="number" >
          <div class="add" @click="addCount">+</div>
        </div>
      </li>
    </ul>

    <div class="btn-wrapper">
      <div class="btn border-right-1px" @click="newSever">新增</div>
      <div class="btn">保存</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      newSever() {
        this.$router.push('/newPro')
      },
      addCount() {
        this.prodQty ++;
      },
      reduceCount() {
        this.prodQty --;
      }
    },
    watch:{
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
      width: 80%
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
    .filter
      position: absolute
      right: .2rem
      top: .2rem  
      line-height: .8rem
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
        .countBtn-wrapper
          position: absolute
          right: .2rem 
          bottom: .2rem
          height: .4rem
          line-height: .4rem
          .reduce
            float: left
            font-size: .32rem
          .count-input
            float: left
            width: .48rem
            border: 1px solid #eee
            margin: 0 .2rem
            text-align: center
            padding: 0 .2rem
            font-size: .24rem
            line-height: .4rem
          .add
            float: left 
            font-size: .32rem 
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