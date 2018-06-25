<template>
  <div id="app">
    <div class="search">
      <input v-model="carno" class="search-input" placeholder="请输入车牌号" @click.prevent="showCarKeyCode"/>
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
      <li class="item border-bottom-1px" @click="goPath">
        粤A686868
        <div class="name-wrapper">名字22<img class="typeImg" src="../../modules/images/reserve-icon.png" /></div>
      </li>
      <li class="item border-bottom-1px" @click="goAdd">
        粤A686868
        
      </li>
      <li class="item border-bottom-1px">
        粤A2222
        
      </li>
    </ul>

    <carKeyCode v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></carKeyCode>
    
  </div>
</template>

<script>
  import carKeyCode from "components/carKeyCode"
  import { Toast} from 'mint-ui';
  export default {
    name: 'App',
    data () {
      return {
        carno: '',
        isShow: false,
        tip: ''
      }
    },
    methods: {
      goDetail() {
        window.location.href='pickupInfo.html#/type3'
      },
      goPath() {
        window.location.href= './pickupOrder.html#/path'
      },
      goAdd() {
        window.location.href= './pickupInfo.html#/type2'
      },
      addCar() {
        window.location.href='pickupInfo.html#/type1'
      },
      gainCarno:function(value){//子组件传给当前组件（父组件）
        this.carno = value.carno
        this.tips = value.tips
        if(this.tips&&this.tips!=''){
            Toast(this.tips)
        }
      },
      showCarKeyCode() {
        this.isShow = true
      }
    },
    components:{
      carKeyCode
    },
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
        width: 74%
        border: 1px solid #eee
        padding: 0 .8rem
        margin: .2rem
        height: .8rem
        line-height: .8rem
        box-sizing: border-box
        background: url('../../modules/images/searchIcon.png') no-repeat
        background-size: .5rem
        background-position: .2rem
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
