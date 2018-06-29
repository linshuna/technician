<template>
  <div class="wrapper">
    <div class="carInfo-wrapper border-bottom-1px">
      <img class="carImg" :src="carImg"/>
      <div class="carInfo">
        <div class="carno">{{this.carno}}</div>
        <div class="brand">{{this.carplate}}</div>
      </div>
    </div>
    <div class="name-wrapper">
      <div class="title">客户名称</div>
      <input class="name" type="text" placeholder="请输入名称" v-model="name"/>
      <mt-radio v-model="cusNameValue" :options="cusNameOptions"></mt-radio>
    </div>
    <div class="link-phone">
      <div class="title">手机号</div>
      <input class="phone" type="number" placeholder="请输入手机号码" v-model="phone"/>
    </div>
    <div class="chooseCus">
      选择客户<span class="iconfont">&#xe66b;</span>
    </div>

  </div>
</template>
<script>
  import {GetQueryString} from 'modules/js/config.js'
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import vueAxiosPlugin from "modules/js/axiosPrototype.js"
  Vue.use(vueAxiosPlugin)

  export default {
    data() {
      return {
        carvid: '',
        carno: '',
        carplate: '',
        carImg: require('modules/images/carImg.png'),
        name:'',
        phone:'',
        cusNameValue: '1',
        emitObj: {},
        cusNameOptions:[
          {
            label:'先生',
            value:'1'
          },
          {
            label:'女士',
            value:'0'
          },
        ]
      }
    },
    watch: {
      name(newVal) {
        this.emitObj['username'] = newVal
        this.$emit('getVal',this.emitObj)
      },
      cusNameValue(newVal) {
        this.emitObj['sex'] = newVal
        this.$emit('getVal',this.emitObj)
      },
      phone(newVal) {
        this.emitObj['phone'] = newVal
        this.$emit('getVal',this.emitObj)
      }
    },
    mounted() {
      this.carvid = GetQueryString('carvid')
      this.emitObj.username = this.name
      this.emitObj.sex = this.cusNameValue
      this.emitObj.phone = this.phone

      this.$http.get(`/api.php/TechMeet/noUsers?carvid=${this.carvid}`)
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            let data = res.data
            this.carno = data.car.carNo
            this.carImg = data.car.icon
            this.carplate = data.car.carplate
          }else{
            Toast(res.message)
          }
        })
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
    height: .8rem
    line-height: .8rem
  .wrapper >>> .mint-cell
    float: left
    min-height: auto
  .wrapper >>> .mint-cell:last-child
    background: none

  .carInfo-wrapper
    overflow: hidden
    .carImg
      width: 1rem
      height: 1rem
      float: left
      margin-right: .2rem
    .carInfo
      float: left
      margin-top: .2rem
  .name-wrapper
      overflow: hidden
      margin: .2rem 0
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
        border-radius: 4px
        padding: 0 .1rem
        box-sizing: border-box
    .link-phone
      overflow: hidden
      margin-bottom: .2rem
      .title
        float: left
        width: 1.4rem
        height: .8rem
        line-height: .8rem
      .phone
        float: left
        width: 4rem
        font-size: .28rem
        border: 1px solid #d9d9d9
        padding: .1rem .2rem
        margin-top: .2rem
        border-radius: 4px
    .chooseCus
      text-align: right
      color: $color-main
</style>
