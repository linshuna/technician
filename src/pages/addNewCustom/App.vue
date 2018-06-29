<template>
  <div class="wrap">
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
            <!-- <input type="text" style="ime-mode:disabled" placeholder="请选择级别" v-model="cusLabelText" readonly @focus="cusLabel" @blur="comfirmChecked=false"/> -->
            <span @click="cusLabel" class="inp" :class="{'blackColor':cusLabelText!=''}">{{cusLabelText==''?'请选择级别':cusLabelText}}</span>
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
            <!-- <input type="text" style="ime-mode:disabled" placeholder="请选择日期" v-model="birthDate" readonly @focus="cusBirth('birthPicker')"/> -->
            <span class="inp" :class="{'blackColor':birthDate!=''}"  @click="cusBirth('birthPicker')">{{birthDate==''?'请选择日期':birthDate}}</span>
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
          <!-- <img :src="addLinkerIcon" alt="" class="addOtherLinker">
          <span>添加联系人</span> -->
          <input type="tel" placeholder="请输入其他联系人电话号码" v-model="contact">
        </p>
        <textarea name="" placeholder="备注" v-model="remarkTip"></textarea>
      </div>
      <button class="saveBtn" @click="saveMsg">保存</button>
    </div>
     

  </div>
</template>

<script>
  import { Toast,MessageBox   } from 'mint-ui';
  import {format} from 'modules/js/date.js'
  import {GetQueryString} from 'modules/js/config.js'
export default {
  name: 'App',
  data(){
    return {
      cusTypevalue:'2',
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
            value: '2'
          }
        ],
      cusNameOptions:[
          {
            label:'先生',
            value:'1'
          },
          {
            label:'女士',
            value:'2'
          },
      ],
      popupVisible:false,//picker组件显示和关闭
      slots: [{defaultIndex:0}],//picker选择框数据
      cusLabelText:'',//选中的value值
      cusLabelValue:0,
      cusTypeStyle:  [{name:'新客户',value:0}, {name:'普通',vlaue:1}, {name:'金牌',value:2}, {name:'钻石',vlaue:3}],
      startDate: new Date('1970/1/1'),//开始的生日日期
      endDate: new Date(),//结束的生日日期
      birthDate: '',//选中的生日日期
      cusAddress:'',//客户单位地址
      contact:'',
      remarkTip:'',//备注
      techvid: '',
      clientvid: null
    }
  },
  computed: {
    errors () {
      return this.$vuerify.$errors
    },
    invalid () {
      return this.$vuerify.invalid
    },
    getStorage(){
      return this.$store.getters.getStorage;
    }
  },
  vuerify:{
    cusPhone: {
      test: /^1[3|5|8]\d{9}$/,
      message: '请输入正确的手机号码'
    },
    cusName: {
      test: /^([\u4E00-\u9FFF]|\w){2,11}$/,
      message: '请输入正确的姓名格式'
    }
  },
  mounted: function(){
    let gainTecherData = this.getStorage;//获取技师登录的信息
    if(gainTecherData){
      this.techvid = gainTecherData.vid
    }
    let gainClientvid = GetQueryString("cusId")
    if(gainClientvid){
      this.clientvid = gainClientvid
    }
    if(this.clientvid&&this.techvid){
      this.init(this.clientvid,this.techvid)
    }
    this.$nextTick(function(){
    })
  },
  methods:{
    init:function(clientvid,techvid){
      this.$http.get('/api.php/TechSysClient/edits?clientvid='+clientvid+'&techvid='+techvid)
      .then((response)=>{
        let res = response.data
        if(res.errorCode == 200){
          this.$nextTick(function(){
            let cusItem = res.data;
            this.cusPhone = cusItem.phone;
            this.cusName = cusItem.uname;
            this.cusNameValue = cusItem.sex;//性别
            this.cusTypevalue = cusItem.types;//客户类型

            let level = cusItem.level;
            this.cusLabelValue = level
            this.cusLabelText = level==0?'新客户'
                                  :(level==1?'普通':(level==2?'金牌':level==3?'钻石':''))
            this.birthDate = cusItem.birthday
            this.cusAddress = cusItem.address
            this.remarkTip = cusItem.remark
            this.contact = cusItem.contact
          })
          
        
        }else{
          Toast(res.message)
        }
      })
    },
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
      this.cusLabelText = pickerVal[0].name;
      this.cusLabelValue = pickerVal[0].value;
      this.popupVisible=false;
    },
    cusBirth:function(picker){
      this.$refs[picker].open();//open时间选择器
    },
    handleChange(value) {
        this.birthDate = format(value.toString(),"yyyy-MM-dd");
    },
    saveMsg:function(){
      if(!this.cusName){
        Toast('请输入客户名称');
        return false
      }else{
        if(this.errors.cusName){
          Toast(this.errors.cusName)
          return false;
        }
      }

      if(!this.cusPhone){
        Toast('请输入手机号码')
        return false;
      }else{
        if(this.errors.cusPhone){
            Toast(this.errors.cusPhone);
            return false;
        }
      } 
      
      let gainNewCarData = {
        phone: this.cusPhone,
        uname: this.cusName,
        sex: this.cusNameValue,//性别
        types: this.cusTypevalue,//客户类型
        level: this.cusLabelValue,
        birthday: this.birthDate,
        address: this.cusAddress,
        remark: this.remarkTip,
        contact:this.contact,
        techvid: this.techvid||''
      }
      let tip = '',httpUrl = ''
      if(this.clientvid&&this.techvid){
        tip = '是否确定修改客户信息?'
        httpUrl = '/api.php/TechSysClient/edits'
        gainNewCarData.clientvid = this.clientvid;//编辑多一个客户的字段
      }else{
        tip = '是否确定新增客户?'
        httpUrl = '/api.php/TechSysClient/adds'
      }
      let _this = this;
      MessageBox.confirm(tip,'').then(action => {
        this.$http.post(httpUrl,gainNewCarData)
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              Toast(res.message)
              if(this.clientvid){
                let clientvid = this.clientvid;
                setTimeout(function(){
                  window.location.href = "customerDetail.html?cusId="+clientvid
                },1000)  
              }else{
                setTimeout(function(){
                  // _this.$router.push({path:"/customer"})
                  window.location.href = "index.html#/customer"

                },1000)
              }
              
            }else{
              Toast(res.message)
            }
            
          })

      });
      
    }
    
  }
}
</script>

<style lang="stylus">
  .wrap
    width: 100%
    height: 100%
    font-size: .28rem
    position: absolute
    left: 0
    top: 0
    background: #f4f4f4
    padding-bottom: 2rem
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
              width: 0.35rem
              right: 0.1rem
              transform: translate(0, -50%)
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
                  padding-left: 8px
                  padding-right: 0
                  font-size: .24rem
                  .mint-radiolist-label
                    padding: 0
              .mint-cell:last-child
                background: transparent!important
            input[type="text"],span.inp
              display: inline-block
              width: 100%
              border:1px solid #f4f4f4
              border-radius: 5px 
              padding: .2rem 0 .2rem .1rem
              box-sizing:border-box    
            span.inp  
              color: gray 
            .blackColor
              color: #000!important  
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
        margin-top: .5rem
        .addLinkerWrap
          width: 100%
          margin: .2rem 0
          input
            display: inline-block
            width: 100%
            border:1px solid #f4f4f4
            border-radius: 5px 
            padding: .2rem 0 .2rem .1rem
            box-sizing:border-box    
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
          margin-bottom: .2rem 
          font-size: .28rem
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
        font-size: .28rem

</style>



