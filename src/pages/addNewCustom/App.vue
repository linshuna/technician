<template>
  <div id="app">
    <div class="customWrap">
      <div class="logoWrap">
        <img :src="customerLogo" class="customLogo"/>
      </div>
      <ul class="fieldWrap border-bottom-1px">
        <li>
          <span class="fieldName">
            客户类型
            <span class="redColor">*</span>
          </span>
          <div class="setCusRight">
            <mt-radio
              v-model="cusTypevalue"
              :options="options">
            </mt-radio>  
          </div>
          
        </li>
        <li>
          <span class="fieldName">
            客户名称
            <span class="redColor">*</span>
          </span>
          <div class="setCusRight">
            <input type="text" placeholder="请输入客户名称" class="cusNameInp" v-model="cusName"/>
            <mt-radio
              v-model="cusNameValue"
              :options="cusNameOptions">
            </mt-radio>
          </div>
        </li>
        <li>
          <span class="fieldName">
            手机号码
            <span class="redColor">*</span>
          </span>
          <div class="setCusRight">
            <input type="text" placeholder="请输入客户手机号" v-model="cusPhone"/>
          </div>
        </li>
        <li>
          <span class="fieldName">
            客户级别
          </span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择级别" v-model="cusLabelText" readonly @focus="cusLabel" @blur="comfirmChecked=false"/>
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
          <span class="fieldName">
            生日
          </span>
          <div class="setCusRight">
            <input type="text" placeholder="请选择日期" v-model="birthDate" readonly @focus="cusBirth('birthPicker')"/>
            <img :src="birthIcon" alt="" class="btmArrowIcon">
              <mt-datetime-picker
                ref="birthPicker"
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
          <span class="fieldName">
            所在单位
          </span>
          <div class="setCusRight">
            <input type="text" placeholder="请输入客户所在单位" v-model="cusAddress"/>
          </div>
        </li>
      </ul>
      <div class="remarkWrap">
        <p>其他联系人</p>
        <p class="addLinkerWrap">
          <img :src="addLinkerIcon" alt="" class="addOtherLinker">
          <span>添加联系人</span>
        </p>
        <textarea name="" placeholder="备注" v-model="remarkTip"></textarea>
      </div>
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
      cusTypevalue:'1',
      cusNameValue:'1',
      cusName:'',
      cusPhone:'',
      customerLogo:require("modules/images/defaultLogo.png"),
      btmArrowIcon: require("modules/images/btmArrow.png"),
      addLinkerIcon: require("modules/images/blueAddIcon.png"),
      birthIcon: require("modules/images/birthIcon.png"),
      options:[
          {
            label: '个人',
            value: '1'
          },
          {
            label: '单位',
            value: '0'
          }
        ],
      cusNameOptions:[
          {
            label:'先生',
            value:'1'
          },
          {
            label:'女士',
            value:'0'
          },
      ],
      popupVisible:false,//picker组件显示和关闭
      slots: [{defaultIndex:0}],//picker选择框数据
      cusLabelText:'',//选中的value值
      cusTypeStyle:  ['普通', '中级', '高级', 'vip', 'vvip'],
      startDate: new Date('1970/1/1'),//开始的生日日期
      endDate: new Date(),//结束的生日日期
      birthDate: '',//选中的生日日期
      cusAddress:'',//客户单位地址
      remarkTip:''//备注
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
    cusLabel(){//职业类型选择框
        this.popupVisible=true;//激活picker组件
        this.slots=[{
              defaultIndex:0,
              flex: 1,
              values: this.cusTypeStyle,//职业类型
              textAlign: 'center'
        }];
    },
    cancle:function(){
      this.popupVisible=false;
    },
    select:function(){
      var pickerVal=this.$refs.pickerObj.getValues();
      this.cusLabelText = pickerVal;
      this.popupVisible=false;
    },
    cusBirth:function(picker){
      this.$refs[picker].open();//open时间选择器
    },
    handleChange(value) {
        this.birthDate = format(value.toString(),"yyyy-MM-dd");
    },
    saveMsg:function(){
      console.log(this.cusNameVaule)
    }
    
  }
}
</script>

<style lang="stylus">
  #app
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
        li
          width: 100%
          font-size: 0  
          padding: .2rem 0
          position: relative
          .fieldName
            line-height: .7rem
            vertical-align top  
            font-size: .28rem
            width: 20%
            display: inline-block
            .redColor
              color: red
          .setCusRight
            display: inline-block
            font-size: .28rem
            width: 80%
            height: .7rem
            padding-left: .32rem
            box-sizing:border-box
            position: relative
            .btmArrowIcon
              position: absolute 
              top: 50%
              width: .45rem
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
        textareatextarea
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



