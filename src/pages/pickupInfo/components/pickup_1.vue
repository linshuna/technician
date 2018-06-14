<template>
  <div class="wrapper">
    <div class="carno-wrapper">
      <div class="title">车牌号</div>
      <input class="carno" placeholder="请输入车牌号" @click="showCarKeyCode" v-model="carno"/>
    </div>
    <div class="vin-wrapper">
      <div class="title">车架号</div>
      <input class="vin" placeholder="请输入17位数车架号"/>
    </div>
    <div class="brand-wrapper">
      <div class="title">车型</div>
      <div class="brand" @click="selectBrand">奔驰</div>
    </div>
    <div class="name-wrapper">
      <div class="title">客户名称</div>
      <input class="name" type="text" placeholder="请输入名称"/>
      <mt-radio v-model="cusNameValue" :options="cusNameOptions"></mt-radio>
    </div>
    <div class="link-phone">
      <div class="title">手机号</div>
      <input class="phone" type="number" placeholder="请输入手机号码"/>
    </div>
    <div class="chooseCus">
      选择系统客户<span class="iconfont">&#xe66b;</span>
    </div>

    <carKeyCode v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></carKeyCode>
    <brand :popBrand.sync="popBrand" @show="toggleShow"></brand>
  </div>
</template>
<script>
  import Vue from 'vue';
  import CarKeyCode from "components/CarKeyCode"
  import Brand from "components/brand.vue"
  import { Toast} from 'mint-ui';
  import { Radio} from 'mint-ui';
  Vue.component(Radio.name, Radio);

  export default {
    data() {
      return {
        carno: '',
        isShow: false,
        tip: '',
        cusName:'',
        cusNameValue: '1',
        popBrand: false,
        cusNameOptions:[
          {
            label:'先生',
            value:'1'
          },
          {
            label:'女士',
            value:'0'
          },
        ],
      }
    },
    methods: {
      gainCarno:function(value){//子组件传给当前组件（父组件）
        this.carno = value.carno
        this.tips = value.tips
        if(this.tips&&this.tips!=''){
            Toast(this.tips)
        }
      },
      showCarKeyCode() {
        this.isShow = true
      },
      selectBrand() {
        this.popBrand = true
      },
      toggleShow(val){
        console.log(val)
      }
    },
    components:{
      CarKeyCode,
      Brand
    }
  }
</script>
<style lang="stylus" scoped>
   @import '~modules/css/variable.styl'

  .wrapper >>> .mint-cell-wrapper
    background: none
    padding: 0
  .wrapper >>> .mint-radiolist
    float: left
  .wrapper >>> .mint-cell
    float: left
    min-height: auto
  .wrapper >>> .mint-cell:last-child
    background: none

  .wrapper
    margin-bottom: 1rem
    .carno-wrapper
      height: .8rem
      line-height: .8rem
      margin-top: .2rem
      display: flex
      .title
        float: left
        width: 1.4rem
        line-height: .6rem
      .carno
        float: left
        width: 4rem
        height: 0.4rem
        line-height: .4rem
        font-size: 0.28rem
        border: 1px solid #d9d9d9
        padding: 0.1rem 0.2rem
        border-radius: 4px
        flex: 1
    .vin-wrapper
      overflow: hidden
      margin-bottom: .2rem
      display: flex
      .title
        float: left
        width: 1.4rem
        line-height: .6rem
      .vin
        float: left
        width: 4rem
        height: .4rem
        font-size: .28rem
        border: 1px solid #d9d9d9
        padding: .1rem .2rem
        border-radius: 4px
        flex: 1
    .brand-wrapper
      overflow: hidden
      margin-bottom: .2rem
      display: flex
      .title
        float: left
        width: 1.4rem
        line-height: .6rem
      .brand
        float: left
        width: 4rem
        height: .4rem
        font-size: .28rem
        border: 1px solid #d9d9d9
        padding: .1rem .2rem
        border-radius: 4px
        flex: 1
    .name-wrapper
      overflow: hidden
      margin-bottom: .2rem
      line-height: .8rem
      .title
        float: left
        width: 1.4rem
      .name
        float: left
        width: 2rem
        font-size: .28rem
        line-height: .8rem
        border: 1px solid #d9d9d9
        padding-left: .2rem;
        border-radius: 4px;
    .link-phone
      overflow: hidden
      margin-bottom: .2rem
      display: flex
      .title
        float: left
        width: 1.4rem
        line-height: .6rem
      .phone
        float: left
        width: 4rem
        height: 0.4rem
        font-size: 0.28rem
        border: 1px solid #d9d9d9
        padding: 0.1rem 0.2rem
        border-radius: 4px
        flex: 1
    .chooseCus
      color: $color-main
      float: right
</style>
