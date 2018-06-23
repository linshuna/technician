<template>
  <div id="calendar" v-show="showCalendar">
    <!-- 年份 月份 -->
    <div class="month">
        <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                <span class="choose-year">{{ currentYear }}</span>
                <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color:red">六</li>
        <li style="color:red">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li  v-for="(dayobject,index) in days" 
            :key="index" 
            :class="{'active':dayobject.checked,
            'betweenActive':gainSelectedType=='月'&&dayobject.day>firstDay&&dayobject.day<lastDay}"
            @click="dayobject.day.getMonth()+1 != currentMonth?change:pick(index,dayobject)">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->
            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
                <!--今天  同年同月同日-->
                <span>{{dayobject.day.getDate()}}</span>
            </span>

        </li>
    </ul>
    <div class="sureWrap">
        <button @click="makeSure">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
        'showCalendar':{type: Boolean},
        'gainSelectedType':{type: String},
        'gainStartDate':{type: String},
        'gainEndDate':{type: String}
    },
    data() {
      return{
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        arrDate: [10,15],
        nowDay:new Date().getDate(),
        nowMonth: new Date().getMonth(),
        nowYear:new Date().getFullYear(),
        checkedArr:[],
        firstDay:'',
        lastDay:'',
        makeSureDate:''
      }
    },
    created: function() {  //在vue初始化时调用
        this.initData(null);
        this.makeSureDate = this.gainStartDate;//数九初始化
    },
    watch:{
        gainSelectedType(newVal,oldVal){
            this.gainSelectedType = newVal
            if(this.gainSelectedType=='月'){
                this.days.forEach((item,timeInd)=>{
                    if(new Date(item.day).getDate()==1&&timeInd<30){
                    this.$set(this.checkedArr,0,timeInd) 
                    this.firstDay = item.day
                    this.$set(this.days[timeInd],'checked',true)
                    }
                    if(item.checked){
                        this.$set(this.checkedArr,1,timeInd)
                        this.lastDay = item.day
                    }
                })    
            }else{
                this.days.forEach((item,timeInd)=>{
                    if(new Date(item.day).getDate()==1&&timeInd<30){
                        this.$set(this.days[timeInd],'checked',false)
                    }
                })
            }
        },
        gainStartDate(newVal,oldVal){
            this.gainStartDate = newVal
            this.initData(null)
        },
        gainEndDate(newVal,oldVal){
            this.gainEndDate = newVal
            this.initData(null)
        }
    },
    mounted: function(){

    },
    methods: {
        initData: function(cur) {
            
            var leftcount=0; //存放剩余数量
            var date;
            if (cur) {
                date = new Date(cur);
            } else {
                var now  = new Date();
                var d = new Date(this.formatDate(now.getFullYear() , now.getMonth()+1 , 1));
                d.setDate(42);
                date = new Date(this.formatDate(d.getFullYear(),d.getMonth(),1));
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;

            this.currentWeek = date.getDay(); // 1...6,0
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            //初始化本周
            let getStartDate = '',getEndDate='';
            if(this.gainStartDate){
                let startArr = this.gainStartDate.split("-")
                getStartDate = startArr[2]
            }
            if(this.gainEndDate){
                let endArr = this.gainEndDate.split("-")
                getEndDate = endArr[2]
            }
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str);
                d.setDate(d.getDate() - i);
                var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                dayobject.day=d;
                // dayobject.checked=(d.getDate()==this.nowDay?true:false);
                dayobject.checked=(d.getDate()==getStartDate||d.getDate()==getEndDate?true:false);
                this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
            }
            //其他周
            for (var i = 1; i <= 42 - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                var dayobject={};
                dayobject.day=d;
                // dayobject.isSign = this.isVerDate(d.getDate());
                dayobject.checked=(d.getDate()==getStartDate||d.getDate()==getEndDate?true:false);
                this.days.push(dayobject);
            }

        },
        isVerDate (v) {
            return this.arrDate.includes(v)
        },
        pickPre: function(year, month) {

            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickNext: function(year, month) {
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(42);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickYear: function(year, month) {
            // alert(year + "," + month);
        },
        change:function(){
            return false;
        },
        pick: function(index,date){
            if(this.gainSelectedType=='日'){
                this.days.forEach((item,timeInd)=>{
                    this.days[timeInd].checked = (index==timeInd?true:false)
                })
                var checkedDate = new Date(date.day)
                checkedDate = this.formatDate(checkedDate.getFullYear(),checkedDate.getMonth()+1,checkedDate.getDate())  
            }else{
                //将所有的
                this.days.forEach((item,timeInd)=>{
                    this.days[timeInd].checked = false;
                })
                this.$set(this.checkedArr,0,this.checkedArr[1])
                this.$set(this.checkedArr,1,index)
                this.days[index].checked = true;
                this.checkedArr.forEach((item,index)=>{
                    let i = this.checkedArr[index];
                    this.days[i].checked = true;
                }) 
                //比较起始值
                let checkedArrFirst = this.days[this.checkedArr[0]].day;
                let checkedArrLast = this.days[this.checkedArr[1]].day;
                let first = checkedArrFirst,last = checkedArrLast;
                
                if(checkedArrFirst>checkedArrLast){
                    first = checkedArrLast;
                    last = checkedArrFirst;
                }
                this.firstDay = first
                this.lastDay = last
                let startDate = new Date(first)
                let startDay = this.formatDate(startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate())
                let endDate = new Date(last)
                let endDay = this.formatDate(endDate.getFullYear(),endDate.getMonth()+1,endDate.getDate()) 
                var checkedDate = startDay+"~"+endDay
            }
            this.makeSureDate = checkedDate
        },
        makeSure: function(){
            this.$emit("gainCheckedDate",this.makeSureDate);
            this.$emit('update:showCalendar', false)
            var start = '',end = '';
            if(this.makeSureDate.indexOf("~")>-1){
                let makeSureDateArr = this.makeSureDate.split("~");
                start = makeSureDateArr[0];
                end = makeSureDateArr[1];
            }else{
                start = end = this.makeSureDate
            }
            this.$emit('update:gainStartDate', start)
            this.$emit('update:gainEndDate', end)

        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
            var y = year;
            var m = month;
            // if(m<10) m = "0" + m;
            var d = day;
            // if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },


    }
  } 
</script>
<style lang="stylus" scoped>
  * {
      box-sizing: border-box;
  }

  ul {
      list-style-type: none;
  }

  body {
      font-family: Verdana, sans-serif;
      background: #E8F0F3;
  }
  #calendar{
      width:80%;
      margin: 0 auto;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
      position: absolute;
      top: 1.7rem;
      left: 50%;
      transform: translate(-50%,0);
      z-index: 100000
  }
  .month {
      width: 100%;
      background: #00B8EC;
  }

  .month ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
  }

  .year-month {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 10px;
  }

  .year-month:hover {
      background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
      padding-left: 20px;
      padding-right: 20px;
  }

  .choose-month {
      text-align: center;
      font-size: 20px;
  }

  .arrow {
      padding: 30px;
      margin-bottom: -10px;
  }

  .arrow:hover {
      background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
      color: white;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 3px;
  }

  .weekdays {
      margin: 0;
      padding: 10px 0;
      background-color: #00B8EC;
      display: flex;
      flex-wrap: wrap;
      color: #FFFFFF;
      justify-content: space-around;
  }

  .weekdays li {
      display: inline-block;
      width: 13.6%;
      text-align: center;
  }

  .days {
      padding: 0;
      background: #FFFFFF;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
  }

  .days li {
        list-style-type: none;
        display: inline-block;
        width: 14%;
        text-align: center;
        padding-bottom: 10px;
        padding-top: 10px;
        font-size: 12px;
        line-height: 16px;
        margin-top: 1px;
  }
  .betweenActive{
      background: #b0e4f3!important;
      color: #fff!important;
  }
  .active {
      background: #00B8EC!important;
      color: #fff!important;
  }
  .days li .active {
      padding: 2px 3px;
      border-radius: 0;
      background: #00B8EC;
      color: #fff;
      display: inline-block;
      width: 50%;
  }

  .days li .other-month {
      padding: 5px;
      color: gainsboro;
  }

  .days li:hover {
      background: #e1e1e1;
  }
    .sureWrap{
        background: #fff;
        text-align: right;
        width: 100%;
        padding: 4px;
    }
    .sureWrap button{
        border: 1px solid #00b8ec;
        background: transparent;
        border-radius: 2px;
        color: #00b8ec;
    }
</style>