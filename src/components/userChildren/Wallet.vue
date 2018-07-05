<template>
  <div id="walletWrap">
    <!-- <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="日" @click.native="changeTime('日')">  
        日  
      </mt-tab-item>  
      <mt-tab-item id="月" @click.native="changeTime('月')">  
        月  
      </mt-tab-item>  
    </mt-tabbar>  
    <div class="tabCon">
        <mt-tab-container class="page-tabbar-container" v-model="selected">  
          <mt-tab-container-item id="日"> 
            <div class="timeCon">
              <img @click="reduceDate(checkedDate)" :src="leftArrowIcon" alt="">
              <span @click="changeIsShow('日')">{{checkedDate}}</span>
              <img @click="addDate(checkedDate)" :src="rightArrowIcon" alt="">
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="月">  
            <div class="timeCon">
              <img @click="reduceDate(checkedMonthDate)" :src="leftArrowIcon" alt="">
              <span @click="changeIsShow('月')">
                {{checkedMonthDate}}
              </span>
              <img @click="addDate(checkedMonthDate)" :src="rightArrowIcon" alt="">
            </div>
          </mt-tab-container-item>  
        </mt-tab-container>  
    </div> -->
    <div class="changeTimeWrap">
        <ul class="listWrap">
          <li :class="{'selected':isShowDate}" @click="isShowDate=!isShowDate">日</li>
          <li :class="{'selected':!isShowDate}" @click="isShowDate=!isShowDate">月</li>
        </ul>
        <div class="tabCon">
          <div v-show="isShowDate">
            <img @click="changeDate(date,-1)" :src="leftArrowIcon" alt="" class="left">
            <datepicker v-model="date" language="zh-cn"></datepicker>
            <img @click="changeDate(date,1)" :src="rightArrowIcon" alt="" class="right">
          </div>
          <div v-show="!isShowDate">
            <img @click="changeDate(event_date.date,-1)" :src="leftArrowIcon" alt="" class="left">
            <datepicker 
              :class="{'picker': !event_date.range, 'picker-range': event_date.range}" 
              language="zh-cn"
              :range="event_date.range" 
              v-model="event_date.date" 
              @input="updateEventDate">
            </datepicker>
            <img @click="changeDate(event_date.date,1)" :src="rightArrowIcon" alt="" class="right">
          </div>
        </div>
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
    

  </div>
</template>

<script>
import datepicker from 'vue-date' 
import {format} from "modules/js/date.js"
export default {
  name: 'App',
  data(){
    return {
      leftArrowIcon:require("modules/images/leftArrow.png"),
      rightArrowIcon:require("modules/images/rightArrow.png"),
      firstDate:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+1,
      currentDate:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
      date: '',
      event_date: {
          date: '',
          range: true
      },
      isShowDate: true
    }
  },
  created: function(){
    this.$emit('getIsLink',true)
  },
  components:{datepicker},
  mounted: function(){
    this.date = this.currentDate;//初始化按日筛选的date
    this.event_date.date = [this.firstDate,this.currentDate];//初始化按月筛选的date 
  },
  methods:{
    changeDate(date,type){
      // type==-1减法，type==1加法
      let sd = '',n=1;
      if(typeof date == 'object'){//按月
        n = this.getDays(date[0],date[1]);
        sd = date[0];
        let gainDate = this.getEndDate(n,sd,type);
        this.event_date.date = [gainDate,date[0]];
      }else{
        sd = date;
        this.date = this.getEndDate(n,sd,type)
      }
    },
    getEndDate(n,sd,type) {
        var d = new Date(sd);
        if (type<0) {//减期
            d.setDate(d.getDate()-n);
        }else{//加期
            d.setDate(d.getDate()+n);
        }
        var date=format(d,'yyyy-MM-dd') 
        return date;
    },
    getDays(strDateStart,strDateEnd){//计算相差的天数
      var strSeparator = "-"; //日期分隔符
      var oDate1;
      var oDate2;
      var iDays;
      oDate1= strDateStart.split(strSeparator);
      oDate2= strDateEnd.split(strSeparator);
      var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
      var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
      iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
      return iDays ;
    },
    updateEventDate(val){
      console.log(val)
    }
    
  }
}
</script>

<style lang="stylus" scoped>
  .fl
    float: left
  .fr
    float: right 
  .clearFloat
    overflow: hidden
  .input-wrapper
    border: none!important
  .cancel-btn
    display: none!important  
  .date-panel
    left: 50%!important
    transform: translate(-50%,0)!important
  .date-picker
    width: 45% !important//设置日期的div
    display: inline-block
    padding-top: 5px
    background: #fff
    vertical-align: middle
  .grayColor 
    font-size: .24rem
    line-height: .45rem
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
    .changeTimeWrap
      width: 100%
      ul.listWrap
        background:#ffffff
        border-bottom: 1px solid #efefef
        padding: 0 .2rem
        font-size: 0
        li
          display: inline-block
          width: 50%
          height: .7rem
          line-height: .7rem
          padding: 0
          font-size: .28rem
        .selected
          border-bottom: 1px solid #FA9E15
          color: #FA9E15
      .tabCon
        width: 100%
        background: #ffffff
        >div
          width: 100%  
          img 
            display:inline-block
            width: .15rem
            vertical-align: middle
          // position: relative 
          // .left
          //   position: absolute
          //   left: 0
            
          // .right
          //   position: absolute
          //   right: 0  
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
    // .tabCon  
    //   width: 100%
    //   margin-top: .7rem
    //   height: .9rem
    //   line-height: .9rem
    //   background: #ffffff
    //   .timeCon
    //     width: 100%
    //     img
    //       display: inline-block
    //       width: .15rem
    //       vertical-align: middle
    //     span
    //       display: inline-block
    //       margin:0 .4rem
    //       vertical-align: middle
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



