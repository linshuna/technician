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
                <ul class="conpon-card">
                  <li class="card-item">
                    <div class="item-top">
                      <span>¥</span>
                      <p class="number">20</p>
                      <p class="type">洗车券</p>
                      <button class="usebtn">立即使用</button>
                    </div>
                    <div class="item-bottom">
                      <p>结束时间：2018.06.30</p>
                    </div>
                  </li>
                </ul>
              </div>
            </mt-tab-container-item>  
            <mt-tab-container-item id="已使用">  
              <div class="couponList">
                <ul class="conpon-card">
                  <li class="card-item">
                    <div class="item-top">
                      <span class="gray">¥</span>
                      <p class="number gray">20</p>
                      <p class="type gray">洗车券</p>
                      <img class="invalid-img" :src="alreadyIcon">
                    </div>
                    <div class="item-bottom gray">
                      <p>结束时间：2018.06.30</p>
                    </div>
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

    
  },
}
</script>

<style lang="stylus">
  .fl
    float: left
  .fr
    float: right 
  .clearFloat
    overflow: hidden
  .gray
    color: #999 !important  
  #couponWrap
    width:100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #fff
    z-index: 100
    .mint-tabbar
      height: .74rem
      top: 0
      backgound-image: none
      background:#ffffff
      border-bottom: 1px solid #efefef
      padding: 0 .2rem
      box-shadow: 0rem 0rem 0.12rem 0rem rgba(0, 0, 0, 0.1)
      .mint-tab-item {
        height: .74rem;
        line-height: .74rem;
        padding: 0;
        .mint-tab-item-label{
          line-height: .74rem !important;
          height: .74rem;
          font-size: .34rem !important;
        }
      }
    .is-selected
      background: transparent
      border-bottom: 1px solid #FA9E15
      color: #FA9E15
    .tabCon  
      width: 100%
      .couponList
        margin-top: .9rem 
        .conpon-card {
          width 7.14rem
          margin 0 auto
          .card-item {
            position: relative;
            margin-top: .4rem;
            background-color: #fafafa;
            border-radius: 0.06rem;
            border: 1px solid #cdcdcd;
            &:nth-child(1) {
              margin-top: 1.14rem;
            }
            &::before{
              content: '';
              position: absolute;
              right: -.1rem;
              bottom: .31rem;
              height: .2rem;
              width: .2rem;
              background-color: #fff;
              transform: rotate(45deg);
              z-index: 5;
              border-bottom: 1px solid #cdcdcd;
              border-left: 1px solid #cdcdcd;
            }
            &::after{
              content: '';
              position: absolute;
              left: -.1rem;
              bottom: .31rem;
              height: .2rem;
              width: .2rem;
              background-color: #fff;
              transform: rotate(45deg);
              z-index: 5;
              border-top: 1px solid #cdcdcd;
              border-right: 1px solid #cdcdcd;
            }
            .item-top {
              height: 1.38rem;
              line-height: 1.38rem;
              display:flex;
              align-items: center;
              border-bottom: 1px dashed #cdcdcd;
              span{
                padding: .32rem .1rem 0 .16rem; 
                color: #fa9e15;
                font-size: .28rem;
              }
              .number {
                padding-right: .24rem;
                color: #fa9e15;
                font-size: .72rem;
              }
              .type {
                padding-right: 2.4rem;
                font-size: 0.34rem;
                color: #333333;
              }
              .usebtn {
                width: 1.6rem;
                height: 0.5rem;
                background-color: #fa9e15;
                border-radius: .46rem;
                font-size: 0.34rem;
                border: none;
                color: #fff;
              }
              .invalid-img {
                position: absolute;
                top: 0;
                right: .24rem;
                width: 1.38rem;
	              height: 1.04rem;  
              }
            }
            .item-bottom {
              padding-left: .2rem;
              height: .4rem;
              line-height: .4rem;
              color: #333333
            }
          }
        }
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



