<template>
  <div class="bill">
    <div class="wrapper">
      <div class="item">
        应收金额
        <div class="fr grayColor">{{price}}</div>
      </div>
      <div class="item">
        成本价
        <div class="fr grayColor">{{pprice}}</div>
      </div>
      <div class="item">
        实收金额
        <input class="fr" :value="money"/>
      </div>
      <div class="item">
        回访日期
        <input class="inp fr" readonly placeholder="请选择回访日期" v-model="visitime"  @click="cusBirth('birthPicker')" />
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
    </div>
    <div class="btn" @click="save">提交结账</div>
  </div>
</template>
<script>
  import {format} from "modules/js/date.js"
  import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        visitime:'',
        money:'',
        pprice:'',
        price:'',
        priceList: null,
        startDate: new Date(),//开始的生日日期
        endDate: new Date(new Date().getFullYear()+"/12/31"),//结束的生日日期
      } 
    },
    mounted: function(){
      this.$nextTick(function(){
        this.init()
      })
    },
    methods:{
      cusBirth:function(picker){
        this.$refs[picker].open();//open时间选择器
      },
      handleChange(value) {
        this.visitime = format(value.toString(),"yyyy-MM-dd");
      },
      init: function(){
        this.$http.get('/api.php/TechService/pays/orderNo?orderNo='+this.orderNo)
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            let priceList = res.data;
            this.money = priceList.money;
            this.pprice = priceList.pprice;
            this.price = priceList.price;
          }
        })
      },
      save: function(){
        this.$store.dispatch('delToast')
        if(!this.visitime) {
          Toast("请选择回访日期");
          return false;
        }
        let reqData = {
          orderNo: this.orderNo,
          money: this.money,
          visitime: this.visitime,
          price: this.price,
          pprice: this.pprice
        }
        this.$http.post('/api.php/TechService/pays/orderNo',reqData)
        .then((response)=>{
          let res = response.data;
          Toast(res.message)
          if(res.errorCode == 200){
              let url = this.defaultUrl+"/pickupOrder.html?orderNo="+this.orderNo+"&carNo="+this.carno+"#/path"
              setTimeout(function(){
                window.location.href = url
              },500)
              
          }
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .grayColor
    color:gray!important
  .bill
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #f9f9f9
    overflow: scroll
    padding-bottom: .2rem
    .wrapper
      background: #fff
      font-size: .32rem
      .item
        height: 1rem
        line-height: 1rem
        padding: 0 .2rem
        .fr
          color: #fb5757
        input
          text-align: right  
          line-height: 1rem
    .btn
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main      
</style>