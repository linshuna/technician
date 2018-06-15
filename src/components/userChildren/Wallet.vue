<template>
  <div id="walletWrap">
    <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="日">  
        日  
      </mt-tab-item>  
      <mt-tab-item id="月">  
        月  
      </mt-tab-item>  
    </mt-tabbar>  
    <div class="tabCon">
        <mt-tab-container class="page-tabbar-container" v-model="selected">  
          <mt-tab-container-item id="日"> 
            <div class="timeCon" @click="isShow=true">
              <img :src="leftArrowIcon" alt="">
              <span>{{checkedDate}}</span>
              <img :src="rightArrowIcon" alt="">
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="月">  
            <div class="timeCon" @click="isShow=true">
              <img :src="leftArrowIcon" alt="">
              <span>5.1-5.30号</span>
              <img :src="rightArrowIcon" alt="">
            </div>
          </mt-tab-container-item>  
          
        </mt-tab-container>  
    </div>
    <div class="walletDetail">
      <div class="walletType">
        <div class="walletTypeTop">
          <p class="orangeColor">1232</p>
          <p class="grayColor">营业额</p>
        </div>
        <div class="walletTypeBtm">
          <span>
            <p class="orangeColor">1232</p>
            <p class="grayColor">配件成本</p>
          </span>
          <span>
            <p class="orangeColor">1232</p>
            <p class="grayColor">毛利</p>
          </span>
        </div>
      </div>
      <ul class="walletList">
        <li class="border-bottom-1px">
          <span>结余</span>
          <div class="listRight">
            <span>12312</span>
            <img :src="rightArrowIcon" alt="">
          </div>
        </li>
        <li class="border-bottom-1px">
          <span>收入</span>
          <div class="listRight">
            <span>12312</span>
            <img :src="rightArrowIcon" alt="">
          </div>
        </li>
        <li>
          <span>支出</span>
          <div class="listRight">
            <span>12312</span>
            <img :src="rightArrowIcon" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div class="marsk" v-show="isShow" @click="isShow=false">
        <Calendar v-on:gainCheckedDate="gainDate" v-bind:showCalendar.sync="isShow"></Calendar>
    </div>
    
  </div>
</template>

<script>
import Calendar from "components/Calendar"
export default {
  name: 'App',
  data(){
    return {
      selected: '日',
      searchValue:'',
      leftArrowIcon:require("modules/images/leftArrow.png"),
      rightArrowIcon:require("modules/images/rightArrow.png"),
      isShow: false,
      checkedDate:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()
    }
  },
  components:{Calendar},
  mounted: function(){
    this.$nextTick(function(){
      document.title = '钱包'
    })
  },
  methods:{
    gainDate(value){
      this.checkedDate = value
    }
    
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
    font-size: .24rem
    line-height: .55rem
  .orangeColor 
    font-size: .36rem
    color: #FA9E15    
  #walletWrap
    width:100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #f4f4f4
    z-index: 100
    padding: 0
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
      margin-top: .7rem
      height: .9rem
      line-height: .9rem
      background: #ffffff
      .timeCon
        width: 100%
        img
          display: inline-block
          width: .15rem
          vertical-align: middle
        span
          display: inline-block
          margin:0 .4rem
          vertical-align: middle
    .walletDetail
      width: 100%
      margin-top: .2rem
      .walletType
        background: #ffffff
        width: 100%
        padding: .35rem 0
        text-align: center
        .walletTypeBtm
          margin-top: .35rem
          font-size: 0
          span
            display: inline-block
            width: 50%
            text-align: center
      ul
        width: 100%
        padding:0 .32rem
        box-sizing: border-box
        border-top: 1px solid #ebebeb
        border-bottom: 1px solid #ebebeb
        background: #ffffff
        li 
          width: 100%
          position: relative
          text-align: left
          line-height: 0.45rem
          padding: .2rem 0
          .listRight
            position: absolute
            top: 50%
            right:0
            transform: translate(0,-50%)
            span
              vertical-align: middle
              padding-right: .2rem
            img 
              display: inline-block
              width: .15rem
              vertical-align: middle 
  .marsk
    position: fixed
    top:0
    left:0
    height: 100%
    width: 100%
    background: rgba(30,30,30,.2)
</style>



