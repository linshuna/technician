<template>
  <div class="wrapper">
    <div class="carno-wrapper">
      <div class="title">车牌号</div>
      <input class="carno" placeholder="请输入车牌号" @click="showCarKeyCode" v-model="carno"/>
    </div>
    <div class="vin-wrapper">
      <div class="title">车架号</div>
      <input class="vin" placeholder="请输入17位数车架号" v-model="vin"/>
    </div>
    <div class="brand-wrapper">
      <div class="title">车型</div>
      <div class="brand" @click="selectBrand">{{this.selectedBrand}}</div>
    </div>
    <div class="name-wrapper">
      <div class="title">客户名称</div>
      <input class="name" type="text" placeholder="请输入名称"/>
      <mt-radio v-model="cusNameValue" :options="cusNameOptions"></mt-radio>
    </div>
    <div class="link-phone">
      <div class="title">手机号</div>
      <input class="phone" type="number" placeholder="请输入手机号码" v-model="phone"/>
    </div>
    <div class="chooseCus">
      选择系统客户<span class="iconfont">&#xe66b;</span>
    </div>

    <carKeyCode v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></carKeyCode>
    <brand :popBrand.sync="popBrand" @selectedBrand="activedBrand" @closePop="closePop"></brand>
  </div>
</template>
<script>
  import Vue from 'vue'
  import carKeyCode from "components/carKeyCode"
  import Brand from "components/brand.vue"
  import { Toast } from 'mint-ui'
  import { Radio } from 'mint-ui'
  Vue.component(Radio.name, Radio)

  export default {
    data() {
      return {
        carno: '',
        vin: '',
        modelid: '1',
        isShow: false,
        tip: '',
        cusName:'',
        phone: '',
        cusNameValue: '1',
        popBrand: false,
        selectedBrand: '奥迪',
        type_1_val: {},
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
      gainCarno:function(value){
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
      activedBrand(brand) {
        this.selectedBrand = brand
        console.log(brand)
      },
      closePop() {
        this.popBrand = false
      }
    },
    components:{
      carKeyCode,
      Brand
    },
    watch: {
      carno(newVal) {
        this.type_1_val.carNo = newVal
        this.$emit('getType1Val',this.type_1_val)
      },
      vin(newVal) {
        this.type_1_val.vin = newVal
        this.$emit('getType1Val',this.type_1_val)
      },
      modelid(newVal) {
        this.type_1_val.modelid = newVal
        this.$emit('getType1Val',this.type_1_val)
      },
      cusName(newVal) {
        this.type_1_val.username = newVal
        this.$emit('getType1Val',this.type_1_val)
      },
      cusNameValue(newVal) {
        this.type_1_val.sex = newVal
        this.$emit('getType1Val',this.type_1_val)
      },
      phone(newVal) {
        this.type_1_val.phone = newVal
        this.$emit('getType1Val',this.type_1_val)
      }
    },
    mounted() {
      this.type_1_val['carNo'] = this.carno 
      this.type_1_val['vin'] = this.vin  
      this.type_1_val['modelid'] = this.modelid
      this.type_1_val['username'] = this.cusName
      this.type_1_val['sex'] = this.cusNameValue
      this.type_1_val['phone'] = this.phone
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
        line-height: .4rem
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
