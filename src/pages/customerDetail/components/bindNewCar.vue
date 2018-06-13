<template>
  <div class="bindNewCarWrap">
    <div class="customWrap">
      <ul class="fieldWrap border-bottom-1px">
        <li>
          <span class="fieldName">
            车牌号
          </span>
          <div class="setCusRight">
            <input type="text" v-model="carno" @focus="isShow=true" placeholder="请输入车牌号">
          </div>
        </li>
        <li>
          <span class="fieldName">车架号</span>
          <div class="setCusRight">
            <input type="text" placeholder="请输入17位车架号" v-model="carVin"/>
          </div>
        </li>
        <li>
          <span class="fieldName">品牌车型</span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择品牌车型" v-model="carType"/>
          </div>
        </li>
        <li>
          <span class="fieldName">注册日期</span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择日期" v-model="registDate" readonly @focus="cusBirth('registPicker')"/>
            <img :src="birthIcon" alt="" class="btmArrowIcon">
              <mt-datetime-picker
                ref="registPicker"
                type="date"
                :startDate="startDate"
                :endDate="endDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleChange"
              >
              </mt-datetime-picker>
          </div>
        </li>
        <li>
          <p>商业险</p>
        </li>
        <li>
          <span class="fieldName">到期日期</span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择日期" v-model="bussiDate" readonly @focus="cusBirth('bussiPicker')"/>
            <img :src="birthIcon" alt="" class="btmArrowIcon">
              <mt-datetime-picker
                ref="bussiPicker"
                type="date"
                :startDate="startDate"
                :endDate="endDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleChange"
              >
              </mt-datetime-picker>
          </div>
        </li>
        <li>
          <span class="fieldName">承保公司</span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择级别" v-model="bussiCompanyText" readonly @focus="companyPick('bussi')" @blur="comfirmChecked=false"/>
            <img :src="btmArrowIcon" alt="" class="btmArrowIcon">
            <mt-popup v-model="popupVisible" position="bottom">
              <div class="picker-toolbar">  
                  <span class="mint-datetime-cancel" @click="cancle">取消</span>  
                  <span class="mint-datetime-confirm" @click="select">确定</span>  
              </div>  
              <mt-picker ref='pickerObj' :slots="slots" valueKey="name" ></mt-picker>
            </mt-popup>

          </div>
        </li>
        <li>
          <p>交强险</p>
        </li>
        <li>
          <span class="fieldName">到期日期</span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择日期" v-model="tranDate" readonly @focus="cusBirth('tranPicker')"/>
            <img :src="birthIcon" alt="" class="btmArrowIcon">
              <mt-datetime-picker
                ref="tranPicker"
                type="date"
                :startDate="startDate"
                :endDate="endDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleChange"
              >
              </mt-datetime-picker>
          </div>
        </li>
        <li>
          <span class="fieldName">承保公司</span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择级别" v-model="tranCompanyText" readonly @focus="companyPick('tran')" @blur="comfirmChecked=false"/>
            <img :src="btmArrowIcon" alt="" class="btmArrowIcon">
            <mt-popup v-model="popupVisible" position="bottom">
              <div class="picker-toolbar">  
                  <span class="mint-datetime-cancel" @click="cancle">取消</span>  
                  <span class="mint-datetime-confirm" @click="select">确定</span>  
              </div>  
              <mt-picker ref='pickerObj' :slots="slots" valueKey="name" ></mt-picker>
            </mt-popup>

          </div>
        </li>
        <li>
          <span class="fieldName">发动机号</span>
          <div class="setCusRight">
            <input type="text" placeholder="请输入发动机号" v-model="carEniger"/>
          </div>
        </li>
      </ul>
      <carKeyCode v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></carKeyCode>
      <button class="saveBtn" @click="saveMsg">保存</button>
    </div>
     

  </div>
</template>

<script>
  import Vue from 'vue';
  
  import { Toast,Radio,Popup ,Picker,DatetimePicker   } from 'mint-ui';
  import Vuerify from 'vuerify'
  Vue.use(Vuerify)
  Vue.component(Radio.name, Radio);
  Vue.component(Popup.name, Popup);
  Vue.component(Picker.name, Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
  import {format} from 'modules/js/date.js'
export default {
  name: 'App',
  data(){
    return {
      carno:'',
      carVin:'',
      carType:'',
      btmArrowIcon: require("modules/images/btmArrow.png"),
      addLinkerIcon: require("modules/images/blueAddIcon.png"),
      birthIcon: require("modules/images/birthIcon.png"),
      popupVisible:false,//picker组件显示和关闭
      slots: [{defaultIndex:0}],//picker选择框数据
      companyStyle:  ['中国人寿', '太平洋保险', '永安保险', '平安车险', '中华联合车险'],
      startDate: new Date('1970/1/1'),//开始的生日日期
      endDate: new Date(),//结束的生日日期
      currentCheckedDate:'',//选中对应的日期
      registDate: '',//选中的注册日期
      bussiDate:'',//商业险日期
      tranDate:'',//交强险日期
      currentPickerId:'',//被选中公司id
      bussiCompanyText:'',//商业险公司
      tranCompanyText:'',//交强险公司
      carEniger:'',//发动机号
      isShow: false,
      tips:''
    }
  },
  vuerify:{
    phone: {
      test: /^1[3|5|8]\d{9}$/,
      message: '请输入正确的手机号码'
    },
    password: {
      test: /^[\w!@#$%^&*.]{6,16}$/,
      message: '密码至少6位'
    },
  },
  computed: {
    errors () {
      return this.$vuerify.$errors
    },
    invalid () {
      return this.$vuerify.invalid
    }
  },
  methods:{
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    companyPick(id){//职业类型选择框
        this.popupVisible=true;//激活picker组件
        // this.currentPicker='careerName';//当前picker内容变量
        this.currentPickerId=id;//当前picker内容id变量
        this.slots=[{
              defaultIndex:0,
              flex: 1,
              values: this.companyStyle,//职业类型
              // className: 'slot1',
              textAlign: 'center'
        }];
    },
    cancle:function(){
      this.popupVisible=false;
    },
    select:function(){
      var pickerVal=this.$refs.pickerObj.getValues();
      this.popupVisible=false;
      if(this.currentPickerId == 'bussi'){
        this.bussiCompanyText = pickerVal;
      }else{
        this.tranCompanyText = pickerVal;
      }
    },
    cusBirth:function(picker){
      this.$refs[picker].open();//open时间选择器
      this.currentCheckedDate = picker
    },
    handleChange(value) {
        let date = value.toString();
        date = format(date,'yyyy-MM-dd')
        if(this.currentCheckedDate=='registPicker'){//注册日期
          this.registDate = date
        }else if(this.currentCheckedDate=='bussiPicker'){//商业险日期
          this.bussiDate = date
        }else{//交强险日期
          this.tranDate = date
        }
    },
    gainCarno:function(value){//子组件传给当前组件（父组件）
      this.carno = value.carno
      this.tips = value.tips
      if(this.tips&&this.tips!=''){
          Toast(this.tips)
      }
    },
    
    saveMsg:function(){
      console.log(this.cusNameVaule)
    }
    
  }
}
</script>

<style lang="stylus">
  .bindNewCarWrap
    width: 100%
    height: 100%
    font-size: .28rem
    position: fixed
    left: 0
    top: 0
    background: #f4f4f4
    .customWrap
      width: 100%
      padding:0 .32rem
      box-sizing: border-box
      background: #ffffff
      .logoWrap
        width: 100%
        text-align: center
        padding: .2rem 0;
        .customLogo
          display: inline-block
          width: .8rem
          height: .8rem
      .fieldWrap
        width: 100% 
        font-size: 0
        padding-bottom:.2rem
        padding-top: .2rem
        li
          width: 100%
          font-size: 0  
          padding: .1rem 0
          position: relative
          p
            font-size: .28rem
          .fieldName
            vertical-align top  
            font-size: .28rem
            width: 20%
            line-height: .7rem
            display: inline-block
            .redColor
              color: red
          .setCusRight
            display: inline-block
            font-size: .28rem
            width: 80%
            padding-left: .32rem
            box-sizing:border-box
            position: relative
            .btmArrowIcon
              position: absolute 
              top: 50%
              width: .35rem
              right: .1rem
              transform: translate(0,-50%)
            .isShowPicker
              display: inline-block   
            .mint-radiolist
              vertical-align middle
              display inline-block   
              text-align: right
              position: absolute
              top: 50%
              right: 0
              transform: translate(0,-50%)
              .mint-radiolist-title
                margin 0
              .mint-cell
                display inline-block  
                min-height auto
                .mint-radio-input:checked + .mint-radio-core
                  background-color: #fff
                  border-color: #26a2ff
                .mint-radio-input:checked + .mint-radio-core::after
                  background-color: #26a2ff
                .mint-cell-wrapper
                  background: transparent!important
                  padding-left: 10px
                  padding-right: 0
                  font-size: .24rem
                  .mint-radiolist-label
                    padding: 0
              .mint-cell:last-child
                background: transparent!important
            input[type="text"]
              display: inline-block
              width: 100%
              border:1px solid #f4f4f4
              border-radius: 5px 
              padding: .2rem 0 .2rem .1rem
              box-sizing:border-box    
            .cusNameInp
              width: 50%!important
            .mint-popup
              width: 100%
              .picker-toolbar
                width: 100%
                padding: 15px 10px
                box-sizing: border-box
                color: #26a2ff
              .mint-datetime-picker  
                .mint-datetime-action
                  line-height: 12px;  
      .remarkWrap        
        width: 100%
        margin-top: .2rem
        .addLinkerWrap
          width: 100%
          margin: .35rem 0 .2rem 0
          span
            vertical-align: middle
          img 
            display: inline-block
            width: .35rem
            height: .35rem
            vertical-align: middle
        textarea
          width: 100%
          height: 1.5rem
          border: 1px solid #f4f4f4
          border-radius: 5px
          padding: .1rem
          box-sizing: border-box    
      .saveBtn
        width: 100%
        height: .7rem
        border: none
        position: fixed
        bottom:0
        left: 0
        width: 100%
        background: #FA9E15
        color: #ffffff

</style>
