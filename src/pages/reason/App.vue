<template>
  <div id="app">
    <mt-radio align="right" title="" v-model="value" :options="options"></mt-radio>
    <div class="btn" @click="handleConfirm">确定</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {GetQueryString} from 'modules/js/config.js'
  import { Toast } from 'mint-ui'

  export default {
    name: 'App',
    data () {
      return {
        data: '',
        options: [],
        value: '',
        reasonId:'',
        vid: ''
      }
    },
    methods: {
      handleConfirm() {
        if(!this.reasonId){
          Toast('请选择取消预约原因')
          return
        }
        axios.post('/api.php/TechOrder/ordercancel',{vid: this.vid,typeid: this.reasonId})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            Toast('取消预约成功')
          }else{
            Toast(res.message)
          }
        })
      }
    },
    watch: {
      'value'(newVal) {
        this.data.forEach((item,index)=>{
          if(newVal ===item.reason){
            this.reasonId = item.typeid
          }
        })
      }
    },
    created() {
      this.vid = GetQueryString('vid')
      axios.get('/api.php/TechOrder/cancelreason')
      .then((response)=>{
        let res = response.data
        if(res.errorCode == 200){
          this.data = res.data
          this.data.forEach((item,index)=>{
            this.options.push(item.reason)
          })
        }else{
          
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  
  #app >>> .mint-radiolist-title
      margin: 0
  #app >>> .mint-cell
      background: none
  #app >>> .mint-cell-wrapper
      background: none
  #app >>> .mint-cell-wrapper
      border-bottom: 1px solid #e8e8e8

  #app
    color: #2c3e50
    font-size: .28rem
    height: .8rem
    line-height: .8rem
    .btn
      position: fixed
      bottom: 0
      width: 100%
      text-align: center
      color: #fff
      background: $color-main
</style>
