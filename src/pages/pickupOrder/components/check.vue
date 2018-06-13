<template>
  <div class="check">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">漆面检查</mt-tab-item>
      <mt-tab-item id="2">空调检查</mt-tab-item>
      <mt-tab-item id="3">发动机舱</mt-tab-item>
      <mt-tab-item id="4">底盘检查</mt-tab-item>
      <mt-tab-item id="5">路试</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="tabContainer">
      <mt-tab-container-item id="1">
        <div class="title">
          <div>项目名称</div>
          <div>标准</div>
          <div>检车意见</div>
        </div>
        <div class="item">
          <div>前保险杠</div>
          <div class="main-c">无凹凸、刮花、氧化</div>
          <div class="main-r">
            <span class="bad border-1px">不良</span>
            <span class="normal border-1px active">正常</span>
          </div>
        </div>
        <div class="item">
          <div>后保险杠</div>
          <div class="main-c">无凹凸、刮花、氧化</div>
          <div class="main-r">
            <span class="bad border-1px">不良</span>
            <span class="normal border-1px active">正常</span>
          </div>
        </div>
        <div class="item">
          <div>左前叶子板</div>
          <div class="main-c">无凹凸、刮花、氧化</div>
          <div class="main-r">
            <span class="bad border-1px">不良</span>
            <span class="normal border-1px active">正常</span>
          </div>
        </div>
        <div class="item">
          <div>左前门</div>
          <div class="main-c">无凹凸、刮花、氧化</div>
          <div class="main-r">
            <span class="bad border-1px">不良</span>
            <span class="normal border-1px active">正常</span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        3
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="conclusion-wrapper border-bottom-1px">检车结论
      <div class="lastKm fr">上次里程：无</div>
      <textarea class="conclusion" placeholder="请输入检车结论"></textarea>
    </div>
    <div class="btn">保存</div>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        selected:'1',
        value:''
      }
    },
    methods: {
      
    }
  } 
</script>
<style lang="stylus" scoped>
   @import '~modules/css/variable.styl'

  .check
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #f9f9f9
    overflow: scroll
    padding-bottom: .2rem
    .title,.item
      display: flex
      height: .8rem
      line-height: .8rem
      div
        flex: 1
        text-align: center
      .main-c
        flex: 2
      .main-r
        text-align: left
        font-size: 0
        span
          padding: .1rem
          font-size: .24rem
          &.active
            color: #446eea
            background: #a2cbe0
    .tabContainer
      margin-bottom: .2rem
      background: #fff
    .conclusion-wrapper
      padding: 0 .2rem
      line-height: .8rem
      background: #fff
      .lastKm
        color: #2494b7
      .conclusion
        width: 98%
        height: 2rem
        border: 1px solid #eee
        border-radius: 4px  
    .btn
      position: fixed
      bottom: 0
      right: 0
      left: 0
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main         
</style>