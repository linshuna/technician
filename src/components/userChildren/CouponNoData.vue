<template>
  <div>
    <div class="couponList">
      <div class="noDataTip">
        <img :src="noneCouponTipIcon" alt="">
        <p class="grayColor">您没有未使用的优惠券</p>
      </div>
    </div>
  </div>
</template>

<script>
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
  mounted: function(){
    this.$nextTick(function(){
      document.title = '优惠券'
    })
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
  .couponList
    margin-top: .9rem   
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



