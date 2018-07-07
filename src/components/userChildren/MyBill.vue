<template>
  <div class="mybill-wrap">
    <div class="changeTimeWrap">
        <ul class="listWrap">
          <li :class="{'selected':isShowDate}" @click="changeDateBol">日</li>
          <li :class="{'selected':!isShowDate}" @click="changeDateBol">月</li>
        </ul>
        <div class="tabCon">
          <div v-show="isShowDate">
            <img @click="changeDate(date,-1)" :src="leftArrowIcon" alt="" class="left">
            <datepicker v-model="date" @input="updateEventDate" language="zh-cn"></datepicker>
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
          <p :class="{'orangeColor':money>0,'grayColor':!money||money==0}">{{money | topPriceFileter}}</p>
          <p class="grayTitle">营业额</p>
        </div>
        <div class="walletTypeBtm">
          <span>
            <p :class="{'orangeColor':money>0,'grayColor':!money||money==0}">{{pprice | topPriceFileter}}</p>
            <p class="grayTitle">配件成本</p>
          </span>
          <span>
            <p :class="{'orangeColor':money>0,'grayColor':!money||money==0}">{{profit| topPriceFileter}}</p>
            <p class="grayTitle">毛利</p>
          </span>
        </div>
      </div>
      <template v-if="!billList||billList.length==0">
        <no-data-tip :tipData="{typeTipe:0,titleTip:'我的账单',conTip:'暂无账单'}"></no-data-tip>
      </template>
      <template v-else>
        <ul class="walletList border-bottom-1px">
          <li :class="{'border-bottom-1px':index+1!==billList.length}" v-for="(item,index) in billList">
            <span>{{item.carNo}} - {{item.money | priceFilter}}</span>
            <div class="listRight">
              <span>{{item.days}}</span>
              <img :src="rightArrowIcon" alt="">
            </div>
          </li>
        </ul>
      </template>
      
    </div>  
  </div>
</template>
<script>
  import datepicker from 'vue-date' 
  import {format} from "modules/js/date.js"
  import noDataTip  from "components/common/noDataTip"
  export default {
    data(){
      return {
        leftArrowIcon:require("modules/images/leftArrow.png"),
        rightArrowIcon:require("modules/images/rightArrow.png"),
        firstDate:format(new Date(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-1"),'yyyy-MM-dd'),
        currentDate:format(new Date(),'yyyy-MM-dd'),
        date: '',
        event_date: {
            date: '',
            range: true
        },
        isShowDate: true,
        techvid: null,
        // money是营业额    profit利润  pprice成本价 
        money: 0,
        profit: 0,
        pprice: 0,
        billList: null,//我的账单列表
        startDate: '',
        endDate:''
      }
    },
    created:function() {
      let getStorage = this.$store.getters.getStorage;
      if(getStorage){
        this.techvid = getStorage.vid;
        this.init();//初始数据
      }else{

        let instance = Toast('请先登录')
        setTimeout(() => {
          instance.close()
          window.location.href = './login.html?returnUrl='+window.location.href
        }, 2000);
        
      }
      this.$emit('getIsLink',true)
    },
    mounted: function(){
      this.date = this.currentDate;//初始化按日筛选的date
      this.event_date.date = [this.firstDate,this.currentDate];//初始化按月筛选的date 
    },
    components:{
      'datepicker': datepicker,
      'no-data-tip': noDataTip,    
    },
    filters:{
      topPriceFileter:function(value){
        if(!value||value==0) return 0
          else return value
      },
      priceFilter:function(value){
        if(!value||value==0) return '￥'+value;
          else return '￥'+(value-0).toFixed(1) 
      }
    },
    methods:{
      init:function(){
        this.$http.post('/api.php/Tech/myInt',{
          techvid: this.techvid,
          startDate: this.startDate,
          endDate: this.endDate
        }).then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
              let resData = res.data;
              this.money = resData.money
              this.profit = resData.profit
              this.pprice = resData.pprice
              this.billList = resData.list
          }
        })
      },
      changeDateBol:function(){
        this.isShowDate=!this.isShowDate
        if(this.isShowDate){//按日期
          this.startDate = this.endDate = this.date
        }else{//按月
          this.startDate = this.event_date.date[0]
          this.endDate = this.event_date.date[1]
        }
        this.init()
      },
      changeDate(date,type){
        // type==-1减法，type==1加法
        let sd = '',n=1;
        let gainDate = '',startdate='',enddate=''
        if(typeof date == 'object'){//按月
          n = this.getDays(date[0],date[1]);
          if(type<0){
            sd = enddate = date[0];
            gainDate = this.getEndDate(n,sd,type);
            startdate = gainDate
          }else{
            sd = startdate = date[1];
            gainDate = this.getEndDate(n,sd,type);
            enddate = gainDate
          }
          
          this.event_date.date = [startdate,enddate];
          this.startDate = startdate
          this.endDate = enddate
        }else{
          sd = date;
          this.date = this.getEndDate(n,sd,type)
          this.startDate = this.endDate = this.date;
        }
        this.init()
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
      updateEventDate(val){//重新选择日期
        console.log(val)
        if(typeof val == 'object'){
          this.startDate = val[0]
          this.endDate = val[1]  
        }else{
          this.startDate = this.endDate = val
        }
        
        this.init()
      }
    }
  }  
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
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
    width: 55% !important//设置日期的div
    display: inline-block
    padding-top: 5px
    background: #fff
    vertical-align: middle
  .grayTitle
    font-size: .24rem
    lin-height: .45rem  
  .grayColor 
    font-size: .36rem
    color: $gray-color9 
  .orangeColor 
    font-size: .36rem
    color: $color-main    
  .mybill-wrap
    width:100%
    min-height: 100vh
    position: absolute
    top: 0
    left: 0
    background: #f4f4f4
    z-index: 100
    padding: 0
    .changeTimeWrap
      width: 100%
      text-align: center
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
        margin-top: .2rem
        li 
          width: 100%
          position: relative
          text-align: left
          padding: .25rem 0
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
<style lang="stylus">
  .input-wrapper
    border: none!important
  .cancel-btn
    display: none!important  
  .date-panel
    left: 50%!important
    transform: translate(-50%,0)!important
  .date-picker
    width: 55% !important//设置日期的div
    display: inline-block
    padding-top: 5px
    background: #fff
    vertical-align: middle
</style>