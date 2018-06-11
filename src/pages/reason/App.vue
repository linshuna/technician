<template>
  <div id="app">
    <mt-radio align="right" title="" v-model="value" :options="options"></mt-radio>
    <div class="btn">确定</div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data () {
      return {
        options: ['车主计划有变','预约信息填写错误','其他'],
        value: ''
      }
    },
    computed: {
      
    },
    created() {
      
    },
    methods: {
     
    },
    components: {
      
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
