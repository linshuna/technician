<template>
  <div class="wrap">
    <ul class="checkedRemarkList">
      <li v-for="(item,index) in serverList" :key="index">
        <p class="checkedTitle border-bottom-1px">
          <span class="checkedTime">{{index}}</span>
        </p>
        <div class="serverDetailList border-bottom-1px" v-for="(serListItem,serListIndex) in item" :key="serListIndex" @click="serDetail(serListIndex)">
          <p>单号：{{serListIndex}}</p>
          <p class="clearFloat">
            <span class="fl">项目名称</span>
            <span class="fr">项目金额</span>
          </p>
          <ul class="projectList">
            <li class="checkedCon clearFloat" v-for="(serItem,serIndex) in serListItem" :key="serIndex">
              <span class="fl">{{serItem.name?serItem.name:'暂无'}}</span>
              <span class="fr">
                <span>{{serItem.num | serNumFilter}}</span>
                <span class="orangeColor">{{serItem.price | serPriceFilter}}</span>
              </span>
            </li>
          </ul>
        </div>
        
      </li>
    </ul>
     
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  import {GetQueryString} from 'modules/js/config.js'
  export default {
    data(){
      return {
        serverList:[]
      }
    },
    created:function(){
      this.init()
    },
    filters:{
      serPriceFilter:function(value){
        return '￥'+value;
      },
      serNumFilter:function(value){
        return 'x'+value
      }
    },
    methods: {
      init: function(){
        this.$http.post('/api.php/TechReck/reckList',{carNo:this.carno})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            this.serverList = res.data
          }else{
            Toast(res.message)
          }
        })
      },
      serDetail: function(value){//跳转查看详情
        window.location.href = "pickupOrder.html?carno="+this.carno+"&reckorderNo="+value+"#/serDetail"
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .orangeColor
    color: #fa9e15!important
  .wrap
    position: absolute
    top: 0
    left: 0 
    width: 100%
    min-height: 100%
    background: #f4f4f4
    z-index: 100
    .checkedRemarkList
      width: 100%
      font-size: .28rem
      li
        width: 100%
        padding: 0 .32rem
        box-sizing: border-box
        background: #ffffff
        margin-top: .2rem
        p
          line-height .7rem
        .checkedTitle
          line-height .7rem
          position: relative
          img 
            display: inline-block
            width: .15rem
            line-height .7rem
            position: absolute
            right: 0
            top: 50%
            transform: translate(0,-50%)
        .projectList
          width: 100%
          color: gray
          li
            line-height: .7rem
            margin-top: 0
            padding: 0
            .quotedMsg
              .smallFont
                font-size: .2rem
                padding:0 .2rem
              .orangeColor
                font-size: .28rem
                color: #FA9E15
</style>