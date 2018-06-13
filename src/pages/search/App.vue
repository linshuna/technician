<template>
  <div id="app">
    <div class="search">
      <mt-search v-model="value" class="search-input"></mt-search>
      <div class="add-wrapper" @click="addCar">
        <div class="iconfont">&#xe60c;</div>
        <div class="">新增车辆</div>
      </div>
    </div>
    <ul class="result">
      <li class="item border-bottom-1px" @click="goDetail">
        粤A686868
        <div class="name-wrapper">名字<img class="typeImg" src="../../modules/images/stystem-icon.png" /></div>
      </li>
      <li class="item border-bottom-1px">
        粤A686868
        <div class="name-wrapper">名字22<img class="typeImg" src="../../modules/images/reserve-icon.png" /></div>
      </li>
      <li class="item border-bottom-1px" @click="">
        粤A686868
        
      </li>
      <li class="item border-bottom-1px">
        粤A2222
        
      </li>
    </ul>
  </div>
</template>

<script>
  
  export default {
    name: 'App',
    data () {
      return {
        value: ''
      }
    },
    methods: {
      goDetail() {
        window.location.href='pickupInfo.html#/type3'
      },
      addCar() {
        window.location.href='pickupInfo.html#/type1'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  #app >>> .mintui-search
    font-size: .36rem
  #app >>> .mint-searchbar-core
    padding: .2rem
  #app >>> .mint-searchbar
    width: 80%
  #app >>> .mint-searchbar  
    background: none
  #app >>> .mint-searchbar-inner
    border: 1px solid #d9d9d9;
  #app >>> .mint-searchbar-cancel
    display: none  

  #app
    color: #2c3e50
    font-size: .28rem
    .search
      .search-input
        height: 1rem
      .add-wrapper
        position: absolute
        right: .2rem
        top: .2rem
        color: $color-main
        text-align: center
    .result
      .item
        padding: 0 .2rem
        height: .8rem
        line-height: .8rem
        .name-wrapper
          float: right
          margin-right: .2rem
          .typeImg
            width: .3rem
            height: .4rem  
            vertical-align: middle
            margin-left: .2rem
</style>
