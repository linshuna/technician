<template>
  <div id="app">
    <div class="item border-bottom-1px carInfo">粤A99999 奔驰</div>
    <div class="item border-bottom-1px" @click="showNameModal">豆果
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
    <mt-picker :slots="slots" @change="onValuesChange" ref="picker"></mt-picker>
    <mt-popup class="modal-type" v-model="popupVisibleType" popup-transition="popup-fade" position="right">
      <div class="title">服务类型</div>
      <div class="list" v-for="item in typeData">
        <div class="item">{{item}}</div>
      </div>
      <div class="btn-wrapper">
        <div class="btn reset">重置</div>
        <div class="btn confirm">确定</div>
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
export default {
  name: 'App',
  data() {
    return {
      popupVisibleType: false,
      popupVisibleTime: false,
      pickerValue: false,
      slots: [
        {
          flex: 1,
          values: ['aa', 'bb', 'cc'],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      typeData: ['洗车','美容','保养','洗车','美容','保养'],
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
      //this.$refs.picker.style['display'] = 'block'
    }
  },
  created() {
    //this.$refs.picker.style.display = 'none'
  }
}
</script>

<style lang="stylus" scoped>
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
      .btn-wrapper
        position: fixed
        bottom: 0
        width:100%
        height: 1rem
        line-height: 1rem
        .btn
          width: 50%
          float: left 
          text-align: center
        .reset
          color: #4a93f1
          background: #cae9ff
        .confirm
          color: #fff
          background: #4a93f1   
</style>
