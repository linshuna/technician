<template>
  <div class="wrapper">
    <div class="carInfo-wrapper border-bottom-1px">
      <img class="carImg" :src="carImg"/>
      <div class="carInfo">
        <div class="carno">{{this.carno}}</div>
        <div class="brand">{{this.carplate}}</div>
      </div>
    </div>
    <div class="user-wrapper">
      <div class="name">{{this.name}}</div>
      <img class="sexImg" :src="sexImg"/>
      <div class="phone">{{this.phone}}</div>
      <div class="vip-type">会员</div>
    </div>
    <div class="num">已到店{{this.num}}次</div>
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
        carImg: require('modules/images/carImg.png'),
        //sexImg: require('modules/images/boyIcon.png'),
        carvid: '',
        clientvid: '',
        carplate: '',
        num: '',
        name: '',
        sex: '',
        carno: '',
        phone: ''
      }
    },
    computed: {
      sexImg() {
        return this.sex==='1'?require('modules/images/boyIcon.png'):require('modules/images/girlIcon.png')
      }
    },
    created() {
      this.carvid = GetQueryString('carvid')
      this.clientvid = GetQueryString('clientvid')
      this.$http.get(`/api.php/TechMeet/users?carvid=${this.carvid}&clientvid=${this.clientvid}`)
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            let data = res.data
            this.carno = data.car.carNo
            this.carImg = data.car.icon
            this.carplate = data.car.carplate
            this.num = data.client.num
            this.name = data.client.uname
            this.sex = data.client.sex
            this.phone = data.client.phone
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
  .wrapper >>> .mint-cell
    float: left
    min-height: auto
  .wrapper >>> .mint-cell:last-child
    background: none 

.wrapper
  position: relative
  padding-bottom: 1rem
  .carInfo-wrapper
    overflow: hidden
    .carImg
      width: 1rem
      height: 1rem
      padding: .2rem
      box-sizing: border-box
      float: left
    .carInfo
      float: left
      margin-top: .2rem
  .user-wrapper
    height: 1rem 
    line-height: 1rem
    .sexImg
      float: left
      width: .3rem
      margin: .3rem 2rem 0 .6rem 
    .name
      float: left
    .vip-type
      float: right
      margin-right: .2rem
    .phone
      float: right      
  .num
    color: #18b3f9
    border: 1px solid #18b3f9
    display: inline-block
    padding: .1rem
    border-radius: 4px
    position: absolute
    left: 50%
    transform: translate(-50%)
</style>