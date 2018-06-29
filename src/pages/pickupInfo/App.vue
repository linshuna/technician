<template>
  <div id="app">
    <router-view @getVal="getVal" @getType1Val="getType1Val"></router-view>
    <div class="pickup">
      <div class="title border-bottom-1px">接车事项</div>
      <div class="atStore border-bottom-1px">
        在店等
        <mt-switch v-model="waitSwitch"></mt-switch>
      </div>
      <div class="odometer-wrapper">
        <div class="title">进店里程</div>
        <input class="odometer" type="number" v-model="distance"/>
        <div class="pre-odometer">上次里程:<span>无</span></div>
      </div>
      <div class="oil-wrapper">
        <div class="title">进店油表</div>
        <div class="oil" @click="openOilPicker">{{this.oil}}
          <span class="iconfont fr">&#xe60d;</span>
        </div>
      </div>
      <div class="expect-delivery">
        <div class="title">预计交车</div>
        <div class="delivery-time" @click="openTimePicker">
         {{this.deliveryTime}}
        </div>
      </div>
      <div class="owner-remark">
        车主嘱咐
        <textarea class="remark" placeholder="请输入车主嘱咐" v-model="remark"></textarea>
      </div>
    </div>

    <mt-datetime-picker @confirm="handleConfirm" ref="pickerDelivery" type="datetime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hour-format="{value} 时" minute-format="{value} 分"></mt-datetime-picker>

    <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar picker-toolbar-oil">  
          <span class="mint-datetime-cancel" @click="cancle">取消</span>  
          <span class="mint-datetime-confirm" @click="select">确定</span>  
      </div>  
      <mt-picker ref="oil" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

    <div class="btn-wrapper">
      <div class="btn receive" @click="handleReceive">接待</div>
    </div>
  </div>
</template>

<script>
  import {format} from 'modules/js/date.js'
  import {GetQueryString} from 'modules/js/config.js'
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import vueAxiosPlugin from "modules/js/axiosPrototype.js"
  Vue.use(vueAxiosPlugin)

  export default {
    name: 'App',
    data () {
      return {
        carvid: '',
        clientvid: '',
        techvid: null,
        waitSwitch: true,
        distance: '',
        deliveryTime:'',
        oil: '',
        remark: '',
        popupVisible: false,
        type_2_Val: {},
        type_1_Val: {},
        slots: [
          {
            values: ['1/2','1/3','1/4','满']
          }
        ]
      }
    },
    computed: {
      wait() {
        return this.waitSwitch === true?'1':'0'
      },
      getStorage(){
        return this.$store.getters.getStorage;
      }
    },
    methods: {
      openTimePicker() {
        this.$refs.pickerDelivery.open();
      },
      handleConfirm(value) {
        console.log(format(value.toString(),"yyyy-MM-dd HH:mm"))
        this.deliveryTime = format(value.toString(),"yyyy-MM-dd HH:mm");
      },
      openOilPicker() {
        this.popupVisible = true
      },
      cancle() {
        this.popupVisible = false;
      },
      select() {
        this.popupVisible = false;
        this.oil = this.$refs.oil.getValues().toString();
      },
      onValuesChange() {},
      getVal(obj) {
        this.type_2_Val = obj
        console.log(obj)
      },
      getType1Val(obj) {
        this.type_1_Val = obj
      },
      handleReceive() {
        console.log(this.$route.path)

        if(!this.distance){
          Toast({
              message: '请输入进店里程',
              position: 'bottom',
              duration: 2000
            })
            return
        }
        if(!this.oil){
          Toast({
              message: '请输入进店油表',
              position: 'bottom',
              duration: 2000
            })
            return
        }
        if(!this.deliveryTime){
          Toast({
              message: '请输入预计交车时间',
              position: 'bottom',
              duration: 2000
            })
            return
        }


        if(this.$route.path==='/type3'){
          this.$http.post(`/api.php/TechMeet/users`,{wait: this.wait,distance:this.distance,gettime:this.deliveryTime,oil: this.oil,remark: this.remark,techvid:this.techvid,carvid:this.carvid,clientvid:this.clientvid})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              let instance = Toast(res.message)
                setTimeout(() => {
                  instance.close()
                }, 2000)
            }else{
              Toast(res.message)
            }
          })
        }else if(this.$route.path==='/type2'){
          if(!type_2_Val.username){
             Toast({
              message: '请输入客户名字',
              position: 'bottom',
              duration: 2000
            })
            return
          }
          if(!type_2_Val.phone){
             Toast({
              message: '请输入客户电话',
              position: 'bottom',
              duration: 2000
            })
            return
          }

          this.$http.post(`/api.php/TechMeet/noUsers`,
           Object.assign({wait: this.wait,distance:this.distance,gettime:this.deliveryTime,oil: this.oil,remark: this.remark,techvid:this.techvid,carvid:this.carvid},this.type_2_Val))
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              let instance = Toast(res.message)
                setTimeout(() => {
                  instance.close()
                }, 2000)
            }else{
              Toast(res.message)
            }
          })
        }else if(this.$route.path==='/type1'){
          if(!this.type_1_Val.carNo){
            Toast({
              message: '请输入车牌',
              position: 'bottom',
              duration: 2000
            })
            return
          }
          if(!type_1_Val.username){
             Toast({
              message: '请输入客户名字',
              position: 'bottom',
              duration: 2000
            })
            return
          }
          if(!type_1_Val.phone){
             Toast({
              message: '请输入客户电话',
              position: 'bottom',
              duration: 2000
            })
            return
          }


          this.$http.post(`/api.php/TechMeet/addCars`,
          Object.assign({wait: this.wait,distance:this.distance,gettime:this.deliveryTime,oil: this.oil,remark: this.remark,techvid:this.techvid},this.type_1_Val))
            .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              let instance = Toast(res.message)
                setTimeout(() => {
                  instance.close()
                }, 2000)
            }else{
              Toast(res.message)
            }
            })
        }
      }
    },
    created() {
      this.carvid = GetQueryString('carvid')
      this.clientvid = GetQueryString('clientvid')
      let gainTecherData = this.getStorage
      if(gainTecherData){
        this.techvid = gainTecherData.vid
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  #app >>> .mint-switch
    float: right
    margin-top: .1rem

  #app >>> .picker-item
    padding: 0
  #app >>> .mint-popup-bottom
    width: 100%   
  #app >>> .picker-toolbar-oil
      width: 100%
      padding: 15px 10px
      box-sizing: border-box
      color: #26a2ff 

  #app
    color: #2c3e50
    font-size: .32rem
    margin: 0 .2rem
    padding-bottom: 1.4rem
    .title
      height: .8rem
      line-height: .8rem
    .atStore
      height: .8rem
      line-height: .8rem
    .odometer-wrapper
      overflow: hidden
      .title
        float: left
      .odometer
        float: left
        width: 4rem
        height: 0.4rem
        font-size: 0.28rem
        border: 1px solid #d9d9d9
        padding: 0.1rem 0.2rem
        margin-top: 0.2rem
        margin-left: .2rem
        border-radius: 4px
      .pre-odometer
        font-size: 0.24rem
        float: left
        margin-left: 1.5rem
        border-radius: 4px
        height: .4rem
        line-height: .4rem
    .oil-wrapper
      overflow: hidden
      .title
        float: left
      .oil
        display: inline-block
        width: 4rem
        line-height: .4rem
        padding: .1rem .2rem
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9
        border-radius: 4px
        font-size: .28rem
    .expect-delivery
      overflow: hidden
      .title
        float: left
      .delivery-time
        display: inline-block
        width: 4rem
        height: .4rem
        line-height: .4rem
        padding: .1rem .2rem
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9
        border-radius: 4px
        font-size: .28rem
    .owner-remark
      .remark
        width: 4rem
        height: 1rem
        margin-left: .1rem
        vertical-align: middle
        border: 1px solid #d9d9d9
        border-radius: 4px
        font-family: PingFangSC-Regular
        font-size: .28rem
        padding: 0 .2rem
  .btn-wrapper
      position: fixed
      width: 100%
      height: 1rem
      bottom: 0
      left: 0
      right: 0
      background: $color-main
      .btn
        float: left
        //width: 50%
        width: 100%
        text-align: center
        color: #fff
      .btn-l
        height: 1rem
        font-size: .28rem
        padding-top: .2rem
      .receive
        line-height: 1rem
</style>
