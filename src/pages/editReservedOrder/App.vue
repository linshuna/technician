<template>
  <div id="app">
    <div class="item border-bottom-1px carInfo">{{this.carno}}</div>
    <div class="item border-bottom-1px" @click="showNameModal">{{this.name}}
      <span class="iconfont icon-right">&#xe66b;</span>
    </div>
    <div class="item border-bottom-1px" @click="showTypeModal">服务类型
      <span class="iconfont icon-right">&#xe66b;</span>
    </div>
    <div class="item border-bottom-1px" @click="showPicker">预约到店日期
      <span class="iconfont icon-right">&#xe66b;</span>
    </div>
    <div class="item border-bottom-1px" @click="showTimeModal">预约到店时间
      <span class="iconfont icon-right">&#xe66b;</span>
    </div>
    <div class="item link-phone border-bottom-1px">
      联系电话
      <input class="phone" type="number" pattern="[0-9]*" placeholder="请输入"/>
    </div>
    <div class="remark-wrapper">
      <div class="title item">车店备注</div>
      <textarea class="remark" name="" placeholder="备注" v-model="remark"></textarea>
    </div>
    <div class="btn">保存</div>

    <mt-popup position="bottom" v-model="popupVisibleName" :closeOnClickModal=false>
      <div class="picker-toolbar name-picker-toolbar">  
          <span class="mint-datetime-cancel" @click="cancle">取消</span>  
          <span class="mint-datetime-confirm" @click="select">确定</span>  
      </div>  
      <mt-picker class="name-picker" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

    <mt-popup class="modal-type" v-model="popupVisibleType" popup-transition="popup-fade" position="right">
      <div class="title">服务类型</div>
      <div class="list" v-for="(item,index) in typeData">
        <div class="item" @click="selectItem(item)" :class="item.active==true?'active':''">{{item.name}}</div>
      </div>
      <div class="btn-wrapper">
        <div class="btn reset" @click="resetType">重置</div>
        <div class="btn confirm" @click="confirmSelecteType">确定</div>
      </div>
    </mt-popup>
    <mt-datetime-picker ref="picker" type="date" year-format="{value} 年"  month-format="{value} 月" date-format="{value} 日" v-model="pickerValue">
    </mt-datetime-picker>
    <mt-popup class="modal-type" v-model="popupVisibleTime" popup-transition="popup-fade" position="right">
      <div class="title">到店时间</div>
      <div class="list" v-for="item in timeData">
        <div class="item">{{item}}</div>
      </div>
      <div class="btn-wrapper">
        <div class="btn reset">重置</div>
        <div class="btn confirm">确定</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { GetQueryString,changeTitle } from 'modules/js/config.js'
import Vue from 'vue'
  import vueAxiosPlugin from "modules/js/axiosPrototype.js"
  Vue.use(vueAxiosPlugin)

export default {
  name: 'App',
  data() {
    return {
      type: '',
      carno: '',
      carvid: '',
      name: '',
      popupVisibleType: false,
      popupVisibleTime: false,
      pickerValue: false,
      popupVisibleName: false,
      selectTypeIndex: '-1',
      project: [],
      remark:'',
      slots: [
        {
          flex: 1,
          values: ['a', 'b'],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      typeData: [],
      timeData: ['09:00','10:00','11:00','12:00','13:00','14:00','09:00','10:00','11:00','12:00','13:00','14:00']
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    showTypeModal() {
      this.popupVisibleType = true
    },
    showTimeModal() {
      this.popupVisibleTime = true
    },
    showPicker() {
      this.$refs.picker.open();
    },
    showNameModal() {
      if(this.type==='add'){
        return
      }
      this.popupVisibleName = true
    },
    selectItem(item) {
      this.project.push({id:item.id,name:item.name})
      item.active=true
      console.log(item)
      
      //this.selectTypeIndex = index
    },
    confirmSelecteType() {
      this.popupVisibleType = false
    },
    resetType() {
      this.project.forEach((item,index)=>{
        item.active=false
      })
    },
    cancle() {
      this.popupVisibleName = false
    },
    select() {
      this.popupVisibleName = false
    }
  },
  mounted() {
    this.type = GetQueryString('type');
    if(this.type==='add'){
      this.name = decodeURIComponent(GetQueryString('name'))
      this.carno = decodeURIComponent(GetQueryString('carno'))
      this.carvid = GetQueryString('carvid')
      changeTitle('新增预约')
    }
    console.log(this.type)

    this.$http.get('/api.php/TechOrder/servicelist')
    .then((response)=>{
      let res = response.data
      if(res.errorCode == 200){
        let data = res.data
        data.forEach((item,index)=>{
          item.active = false
        })
        this.typeData = data
        console.log(this.typeData)
      }else{
        Toast(res.message)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  #app >>>.name-picker-toolbar
    width: 100%
    padding: 15px 10px
    box-sizing: border-box
    color: #26a2ff
  #app 
    font-family: PingFangSC-Regular
    font-size: .32rem
    color: #2c3e50
    .item
      margin-left: .4rem
      height: 1rem
      line-height: 1rem
      .icon-right
        font-size: .3rem
        float: right
        margin-right: .2rem
      .phone
        display: inline-block
        //width: 4rem
        height: 1rem
        line-height: 1rem
        text-align: right
        float: right  
        margin-right: .2rem
    .remark-wrapper
      .remark
        margin: 0 .4rem
        width: 90%
        height: 1.5rem
        border: 1px solid #f4f4f4
        border-radius: 5px
        padding: .1rem
        font-family: PingFangSC-Regular
        font-size: .28rem
        box-sizing: border-box
    .btn
      position: fixed
      bottom: 0
      width: 100% 
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main         
    .name-picker
      width: 7.5rem    
    .mint-popup-right
      width: 70%
      height: 100% 
      .title
        height: 1rem
        line-height: 1rem
        font-size: .36rem
        text-align: center
      .list
        //display: flex
        .item
          width: 25%
          height: .56rem
          line-height: .56rem
          float: left
          margin: .2rem
          font-size: .24rem
          text-align: center
          background: #eee
        div.active
          color: #fff
          background: #4a93f1
      .btn-wrapper
        position: fixed
        bottom: 0
        width:100%
        height: .8rem
        .btn
          width: 50%
          height: .8rem
          line-height: .8rem
          float: left 
        .reset
          color: #4a93f1
          background: #cae9ff
          left: 0
        .confirm
          color: #fff
          background: #4a93f1   
          right:0
</style>
