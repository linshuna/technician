<template>
  <div id="couponWrap">
    <div class="carDetailMsg">
      <mt-tabbar v-model="selected" fixed>  
        <mt-tab-item id="未使用">  
          未使用  
        </mt-tab-item>  
        <mt-tab-item id="已使用">  
          已使用  
        </mt-tab-item>  
        <mt-tab-item id="已失效">  
          已失效  
        </mt-tab-item>    
      </mt-tabbar>  
      <div class="tabCon">
        
          <mt-tab-container class="page-tabbar-container" v-model="selected">  
            <mt-tab-container-item id="未使用"> 
              <div class="couponList">
                <ul>
                  <li>
                    <p>20元洗车券</p>
                    <p class="setMarTop">结束时间：xxxx-xx-xx</p>
                    <button class="setListRightBtm">立即使用</button>
                  </li>
                </ul>
              </div>
              
            </mt-tab-container-item>  
            <mt-tab-container-item id="已使用">  
              <div class="couponList">
                <ul>
                  <li class="grayColor">
                    <p>20元洗车券</p>
                    <p class="setMarTop">结束时间：xxxx-xx-xx</p>
                    <img :src="alreadyIcon" alt="" class="setListRightBtm">
                  </li>
                </ul>
              </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="已失效">  
              <div class="couponList">
                <no-data-tip :tipData="{typeTip:1,conTip:'您没有失效的优惠券',titleTip:'优惠券'}"></no-data-tip>
              </div>
            </mt-tab-container-item>  
          </mt-tab-container>  
      </div>
    </div>

  </div>
</template>

<script>
import noDataTip from "components/common/noDataTip.vue"
export default {
  name: 'App',
  data(){
    return {
      selected: '未使用',
      searchValue:'',
      alreadyIcon:require("modules/images/alreadyIcon.png"),
      noneCouponTipIcon:require("modules/images/noneCouponTipIcon.png")
    }
  },
  created: function(){
    this.$emit('getIsLink',true)
  },
  components:{
    'no-data-tip':noDataTip
  },
  mounted: function(){
    // 添加返回事件监听
    // this.$store.dispatch('wxpopstate',this)
  },
  methods:{

    
  }
}
</script>

<style lang="stylus">
  .fl
    float: left
  .fr
    float: right 
  .clearFloat
    overflow: hidden
  .grayColor 
    font-size: .22rem
    color: #bfbfbf  
  #couponWrap
    width:100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #f4f4f4
    z-index: 100
    .mint-tabbar
      height: .7rem
      top: 0
      backgound-image: none
      background:#ffffff
      border-bottom: 1px solid #efefef
      padding: 0 .2rem
    .is-selected
      background: transparent
      border-bottom: 1px solid #FA9E15
      color: #FA9E15
    .mint-tab-item
      height: .7rem
      line-height: .7rem
      padding: 0  
      .mint-tab-item-label
        line-height: .7rem
    .tabCon  
      width: 100%
      .couponList
        margin-top: .9rem   
        ul
          width: 100%
          padding:0 .32rem
          box-sizing: border-box
          li
            width: 100%
            padding: .32rem .2rem
            background: #ffffff
            margin-top: .2rem
            position: relative
            box-sizing: border-box
            border-radius: 5px
            text-align: left
            font-size: .26rem
            .setMarTop
              margin-top: .6rem
            .setListRightBtm
              position: absolute
            button 
              border: 1px solid skyblue 
              color: skyblue 
              background: transparent  
              height: .5rem    
              border-radius: 3px
              font-size: .26rem  
              right: .2rem
              bottom: .2rem
            img 
              display: inline-block
              width: 1.5rem
              height: 1.5rem 
              right: 0
              bottom: 0
        .noDataTip
          width: 100%
          text-align: center
          font-size: .28rem
          padding-top: .7rem
          img
            display: inline-block
            width: 2.5rem
          p
            margin-top: .35rem

</style>



