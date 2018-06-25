<template>
  <div>
    <div class="customWrap">
      <bindNewCar v-on:gainCarMsg="gainNewCarMsg" :carno="this.carno"></bindNewCar>
      <div class="customerMsg">
        <p class="border-bottom-1px">客户信息</p>
        <ul class="fieldWrap">
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
          
        </ul>
      </div>
      <button class="saveBtn" @click="saveMsg">保存</button>
    </div>
     

  </div>
</template>

<script>
  import bindNewCar from "components/carPublic/bindNewCar"
  import {GetQueryString} from 'modules/js/config.js'
  import { Toast} from 'mint-ui'

export default {
  name: 'App',
  data(){
    return {
      carno: '',
      techvid: null,
      cusTypevalue:'1',
      cusNameValue:'1',
      cusName:'',
      cusPhone:'',
      newCarMsg: {},
      customerLogo:require("modules/images/defaultLogo.png"),
      btmArrowIcon: require("modules/images/btmArrow.png"),
      addLinkerIcon: require("modules/images/blueAddIcon.png"),
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
  components:{bindNewCar},
  methods:{
    gainNewCarMsg(value){//获取传回来的车辆信息,是一个对象
      console.log(value)
      this.newCarMsg = value
    },
    saveMsg:function(){
      this.$set(this.newCarMsg,'carvid',this.carvid)
      this.$set(this.newCarMsg,'techvid',this.techvid)
      this.$set(this.newCarMsg,'phone',this.cusPhone)
      this.$set(this.newCarMsg,'types',this.cusTypevalue)
      this.$set(this.newCarMsg,'sex',this.cusNameValue)
      this.$set(this.newCarMsg,'uname',this.cusName)
      console.log(this.newCarMsg)
      this.$http.post('/api.php/TechOrder/addNewClient',this.newCarMsg)
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            Toast('解绑成功')
          }else{
            Toast(res.data.message)
          }
        }) 
    }
    
  },
  computed:{
    getStorage(){
      return this.$store.getters.getStorage;
    }
  },
  created() {
    this.carno = decodeURIComponent(GetQueryString('carno'))
    this.carvid = GetQueryString('carvid')
    let gainTecherData = JSON.parse(this.getStorage);
    if(gainTecherData){
      this.techvid = gainTecherData.vid;
    }
  }
}
</script>

<style lang="stylus">
.customWrap
  width: 100%
  height: 100%
  background: #f4f4f4
  position: fixed
  top:0
  left:0
  font-size: .28rem
  overflow-y: scroll
  .customerMsg
    width: 100%
    box-sizing: border-box
    margin-top: .2rem
    padding-bottom:1rem
    p
      width: 100%
      line-height: .65rem
      background: #ffffff
      padding:0 .2rem
      box-sizing: border-box
    .fieldWrap
      width: 100% 
      font-size: 0
      padding-bottom:.2rem
      background: #ffffff
      padding:0 .2rem
      box-sizing: border-box
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
            width: 0.3rem
            right: 0.1rem
            margin-top: .03rem
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
                line-height: 12px
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
