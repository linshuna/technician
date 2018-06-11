<template>
  <div id="app">
    <div class="search">
      <mt-search v-model="value"></mt-search>
      <div class="add-wrapper">
        <div class="iconfont">&#xe60c;</div>
        <div class="">新增车辆</div>
      </div>
    </div>
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
    .add-wrapper
      position: absolute
      right: .2rem
      top: .2rem
      color: $color-main
      text-align: center
</style>
