<template>
  <div class="edit">
    <ul class="pickup">
      <li class="atStore border-bottom-1px">
        在店等
        <mt-switch v-model="value"></mt-switch>
      </li>
      <li class="odometer-wrapper border-bottom-1px">
        <div class="title">进店里程</div>
        <div class="default-right-wrap">
          <input class="odometer" type="number" v-model="distance" placeholder="请输入进店里程"/>
        </div>
        <div class="pre-odometer">上次里程:<span>无</span></div>
      </li>
      <li class="oil-wrapper border-bottom-1px">
        <div class="title">进店油表</div>
        <div  class="default-right-wrap" @click="openOilPicker">
          <input v-model="oil" readonly placeholder="请选择进店油表"/>
          <span class="iconfont fr">&#xe60d;</span>
        </div>
      </li>
      <li class="expect-delivery border-bottom-1px">
        <div class="title">预计交车</div>
        <div  class="default-right-wrap" @click="openTimePicker('deliveryTime')">
          <input placeholder="请选择日期" v-model="deliveryTime"/>
          <span class="iconfont fr">&#xe60d;</span>
        </div>
      </li>
      <li class="expect-delivery border-bottom-1px">
        <div class="title">回访日期</div>
        <div class="default-right-wrap" @click="openTimePicker('visitime')">
          <input placeholder="请选择日期" v-model="visitime"/>
          <span class="iconfont fr">&#xe60d;</span>
        </div>
      </li>
      <li class="owner-remark">
        车主嘱咐
        <textarea class="remark" v-model="remark" placeholder="请输入车主嘱咐"></textarea>
      </li>
    </ul>

    <mt-datetime-picker @confirm="handleConfirm" :startDate="startDate" ref="pickerDelivery" type="datetime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" hour-format="{value} 时" minute-format="{value} 分" ></mt-datetime-picker>

    <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <div class="picker-toolbar picker-toolbar-oil">  
          <span class="mint-datetime-cancel" @click="cancle">取消</span>  
          <span class="mint-datetime-confirm" @click="select">确定</span>  
      </div>  
      <mt-picker ref="oil" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <div class="btn" @click="save">保存</div>
  </div>
</template>
<script>
  import {Toast,MessageBox} from 'mint-ui'
  import {format} from 'modules/js/date.js'
  export default {
    data() {
      return {
        value:'',
        deliveryTime:'',
        popupVisible: false,
        oil: '',
        slots: [
          {
            values: ['1/2','1/3','1/4','满']
          }
        ],
        distance:'',
        remark:'',
        visitime: '',
        currentPickerId: '',
        startDate: new Date()
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.init()
      })
    },
    methods: {
      init(){
        this.$http.get('/api.php/TechService/editsorder?orderNo='+this.orderNo)
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
              this.distance = res.data.distance
              this.oil = res.data.oid
              this.deliveryTime = res.data.gettime//交车时间
              this.visitime = res.data.visitime;//回访日期
              this.remark = res.data.remark
          }
        })
      },
      openTimePicker(type) {
        this.$refs.pickerDelivery.open();
        this.currentPickerId = type;
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
      handleConfirm(value) {
        if(this.currentPickerId == 'deliveryTime'){
          this.deliveryTime = format(value,'yyyy-MM-dd HH:mm')
        }else{
          this.visitime = format(value,'yyyy-MM-dd HH:mm')
        }
      },
      save(){
        if(!this.distance){ Toast('请填写进店里程'); return false;}
        if(!this.deliveryTime){ Toast('请选择预计交车时间'); return false;}
        if(!this.visitime){ Toast('请选择回访日期'); return false;}
        let reqData = {
          orderNo: this.orderNo,
          gettime: this.deliveryTime,
          distance: this.distance,
          oid: this.oil,
          remark: this.remark,
          visitime: this.visitime
        }
        MessageBox.confirm('是否确认修改接单信息','').then(action => {
          this.$http.post('/api.php/TechService/editsorder',reqData)
          .then((response)=>{
            let res = response.data;
            if(res.errorCode == 200){
              Toast('修改成功');
              let url = "./pickupOrder.html?orderNo="+this.orderNo+"&carNo="+this.carno+"#/path"
              setTimeout(function(){
                window.location.href = url
              },500)
            }else{
              Toast(res.message)
            }
          })
        })
        .catch(()=>{})
        
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .edit >>> .mint-switch
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0,-50%);
  .edit >>> .picker-item
    font-size: .28rem 
  .edit >>> .mint-popup-bottom
    width: 100% 
  .edit >>> .picker-toolbar-oil
      width: 100%
      padding: 15px 10px
      box-sizing: border-box
      color: #26a2ff  
  .pickup
    width:100%
    margin-top: .4rem
    background: #fff
    padding: 0 .2rem
    box-sizing: border-box
    li >>> .default-right-wrap
      display: inline-block
      width: 4.5rem
      padding: .15rem 0.1rem
      margin: .1rem 0 .1rem .2rem
      border: 1px solid #d9d9d9
      border-radius: 4px    
    li >>> input
      height: 100%
      font-size: .26rem
      color: $gray-color
  li
    width:100%
    padding: .2rem 0      
  .edit
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #f4f4f4
    overflow: scroll
    padding-bottom: .2rem
    .title
        height: .8rem
        line-height: .8rem
    .atStore
      height: .8rem
      line-height: .8rem
      position: relative
    .odometer-wrapper
      overflow: hidden;
      .title
        float: left
      .pre-odometer
        font-size: .24rem
        border-radius: 4px;
        color: $gray-color
        margin-left: 1.4rem
    .oil-wrapper
      overflow: hidden
      .title
        float: left
      .oil
        display: inline-block
        width: 4rem
        height: .4rem
        padding: .1rem .2rem
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9
        border-radius: 4px;
    .expect-delivery
      overflow: hidden
      .title
        float: left
      .delivery-time
        display: inline-block
        width: 4rem
        height: .4rem
        padding: .1rem
        margin: .1rem 0 .1rem .2rem
        border: 1px solid #d9d9d9
        border-radius: 4px
    .owner-remark
      .remark
        width: 4.5rem
        height: 1rem
        margin-left: .1rem
        vertical-align: middle
        border: 1px solid #d9d9d9
        border-radius: 4px
        font-family: PingFangSC-Regular
        font-size: .24rem
        padding: .1rem
        color: $gray-color
    .btn
      position: fixed
      bottom: 0
      right: 0
      left: 0
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main    
</style>

