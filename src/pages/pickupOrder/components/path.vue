<template>
  <div id="path">
      <div class="nav-section commen-width">
        <ul class="nav-section-list">
          <li v-for="(nav,index) in navData" :key="index" @click="handleNavClick(nav)">
            <div class="nav-icon" :class="nav.className"></div>
            <p>{{nav.name}}</p>
          </li>
        </ul>
      </div>
      <div class="path-wrapper">
        
        <ul>
          <p class="line"></p>
          <li v-if="orderCar">
            <div class="searchLeft" :class="{'color-active':status<2,'color-gray':status>1}">
              <span class="searchTime">接车</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">{{orderCar.nickname | noTipFilter}} {{orderCar.intime | noTipFilter}}</p>
              <p class="grayColor">预计交车时间:{{orderCar.gettime | noTipFilter}}</p>
              <p class="grayColor">嘱咐: {{orderCar.remark | noTipFilter}}</p>
              <div class="btn-wrapper">
                <div class="btn check" :class="{'btn-active':status<2,'btn-gray':status>1}" @click="look">查看</div>
                <div class="btn" :class="{'btn-active':status<2,'btn-gray':status>1}"  @click="edit">编辑</div>
              </div>
            </div>
          </li>
          <li v-if="checkList">
            <div class="searchLeft" :class="{'color-active':status<2,'color-gray':status>1}">
              <span class="searchTime">检车</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">检测时间 {{checkList.checktime | noTipFilter}}</p>
              <p class="grayColor">结论: {{checkList.remark | noTipFilter}}</p>
              <div class="btn-wrapper">
                <div class="btn check" :class="{'btn-active':status<2,'btn-gray':status>1}" @click="check">检测</div>
              </div>
            </div>
          </li>
          <li v-if="reckList">
            <div class="searchLeft"  :class="{'color-active':status<2,'color-gray':status>=2}">
              <span class="searchTime">报价</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">项目: {{reckList.names | noTipFilter}}</p>
              <p class="grayColor">金额: {{reckList.price | payFilter}}</p>
              <div class="btn-wrapper">
                <div class="btn check" :class="{'btn-active':status<2,'btn-gray':status>=2}" @click="addSever">添加服务</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft"  :class="{'color-active':status<2,'color-gray':status>=2}">
              <span class="searchTime">材料</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <template v-if="scienceList&&scienceList.length>0">
                <ul style="display:inline-block;padding:0;line-height: .45rem;">
                  <li class="grayColor" v-for="item in scienceList">{{item.name}} {{item.num | getScienceFilter}}</li>
                </ul>
              </template>
              <template v-else>
                <span class="grayColor">{{scienceList | noTipFilter}}</span>
              </template>
              <div class="btn-wrapper">
                <div class="btn check" :class="{'btn-active':status<2,'btn-gray':status>=2}" @click="addPro" >添加材料</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft"  :class="{'color-active':status<2,'color-gray':status>=2}">
              <span class="searchTime">派工</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">技师: {{nickname | noTipFilter}}</p>
              <div class="btn-wrapper">
                <div class="btn check" :class="{'btn-active':status<2,'btn-gray':status>=2}" @click="dispath">派工</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft" :class="{'color-active':status<2,'color-gray':status>=2}">
              <span class="searchTime">确认</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <div class="btn-wrapper">
                <div class="btn check" :class="{'btn-active':status<2,'btn-gray':status>=2}" @click="bill">提交结账</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft" :class="{'color-active':status<3,'color-gray':status>2}">
              <span class="searchTime">收款</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">实收:{{pay | payFilter}} </p>
              <div class="btn-wrapper">
                <div class="btn check btn-active" @click="makepay" :class="{'btn-active':status<3,'btn-gray':status>2}">确认收款</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft" :class="{'color-active':status<4,'color-gray':status>=4}">
              <span class="searchTime">提车</span>
              <span class="ring"></span>
            </div>
            <div class="searchRight">
              <div class="btn-wrapper">
                <div class="btn check btn-active" @click="makeSure" :class="{'btn-active':status<4,'btn-gray':status>=4}">提车</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
  import {GetQueryString} from 'modules/js/config.js'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        navData: [
          {
            className:'nav-icon-report',
            name:'检测单',
            isCheck:'check',
            tag: 'check'
          },
          {
            className:'nav-icon-quotation',
            name:'报价',
            isCheck:'addSever',
            tag: 'quotation/pick-up-list'
          },
          {
            className:'nav-icon-material',
            name:'材料单',
            isCheck:'addPro',
            tag: 'quotation/store-list'
          },
          {
            className:'nav-icon-history',
            name:'进店历史',
            tag:''
          },
          {
            className:'nav-icon-file',
            name:'客户档案',
            tag: './index.html#/customer'
          },
          {
            className:'nav-icon-carMsg',
            name:'车辆信息',
            tag:'./carDetail.html'
          }
        ],
        carvid: '',
        clientvid: '',
        orderNo: '',
        techvid: null,
        orderCar: null,
        checkList: null,
        reckList: null,
        scienceList:null,
        nickname:'',
        pay:0,
        status: 0
      }
    },
    filters:{
      noTipFilter:function(value){
        if(!value||value.length==0) return '暂无';
          else return value;
      },
      payFilter: function(value){
        return '￥'+value
      },
      getScienceFilter: function(value){
        return 'x'+value
      }
    },
    methods: {
      init(orderNo){
        console.log(orderNo)
        this.$http.post('/api.php/TechService/detail',{orderNo:orderNo})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            let gainData = res.data;
            this.orderCar = gainData.order
            this.checkList = gainData.check
            this.reckList = gainData.reck
            this.scienceList = gainData.science
            this.nickname = gainData.service.nickname
            this.status = gainData.top.status - 0
            console.log(gainData.top.status)
            this.pay = gainData.pay.money//结账金额

          }else{
            Toast(res.message)
          }
        })
      },
      look() {
        if(this.status>=2){return false;}
        this.$router.push('/look')
      },
      edit() {
        if(this.status>=2){return false;}
        this.$router.push('/edit')
      },
      check() {
        if(this.status>=2){return false;}
        this.$router.push('/check')
      },
      addSever() {
        if(this.status>=2){return false;}
        this.$router.push('/quotation/pick-up-list')
      },
      addPro() {
        if(this.status>=2){return false;}
        this.$router.push('/quotation/store-list')
      },
      dispath() {
        if(this.status>=2){return false;}
        this.$router.push('/dispath')
      },
      bill() {
        if(this.status>=2){return false;}
        this.$router.push('/bill')
      },
      handleNavClick(val) {
        let tag = val.tag
        if(!tag) return false;
        if(val.isCheck){
          this.$store.dispatch('delToast')
          if(this.status>=2){Toast('您已提交订单');return false;}
        }
        if(tag.indexOf(".html")>-1){
          window.location.href = tag;
        }else{
          this.$router.push('/'+tag)
        }
      },
      makepay(){
        this.$store.dispatch('delToast');
        if(!this.orderCar){Toast('您还没有编辑接车信息'); return false;}
        if(!this.nickname){Toast('您还没派工');return false;}
        if(this.status<2){Toast('您还没有提交结账');return false;}
        if(this.status>=3){return false;} //已提交车辆
        this.$http.post('/api.php/TechService/makepay',{orderNo: this.orderNo})
        .then((response)=>{
          let res = response.data;
          Toast(res.message)
          if(res.errorCode == 200){
              this.init(this.orderNo);//要重新调用
          }
        })
      },
      makeSure(){
        if(!this.nickname){Toast('您还没派工');return false;}
        if(this.status<3){this.$store.dispatch('delToast');Toast('您还没有确认收款');return false;}
        if(this.status>=4){Toast("您已提车了");return false;}
        this.$http.post('/api.php/TechService/makesure',{orderNo: this.orderNo})
        .then((response)=>{
          let res = response.data;
          Toast(res.message)
          if(res.errorCode == 200){
              this.init(this.orderNo);//要重新调用
          }
        })
      },
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage
      }
    },
    created:function() {
      let gainTecherData = this.getStorage
      if(gainTecherData){
        this.techvid = gainTecherData.vid
      }
    },
    mounted() {
      this.$nextTick(function(){
        this.orderNo = GetQueryString('orderNo')
        this.init(this.orderNo)
      })
    },
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  #path
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    text-align: center
    font-size: .28rem
    background: #f9f9f9
    overflow: scroll
    padding-bottom: .2rem
    .nav-section:after
      width: 0
      height: 0
      border-style: solid
      border-width: 25px
      border-color: #fff transparent transparent transparent
      content:''
      display:block
      clear:both
      position: relative
      left: 50%
      transform: translate(-50%,0)
    .nav-section-list
      background: #fff  
      overflow: hidden
      padding: .2 0
      box-shadow: 0 0 6px 0 rgba(0,0,0,0.10)
      li
        display:inline-block
        float:left
        width:25%
        padding-bottom: .3rem
        color: $gray-color6
        font-size: .28rem
        background: #fff
        .nav-icon
          width:.84rem
          height:.84rem
          margin:.2rem auto
          background-repeat: no-repeat
          background-size: 100% 100%
          background-position: center
        .nav-icon-report
          background-image: url('../../../modules/images/nav-icon-report.png')
        .nav-icon-quotation
          background-image: url('../../../modules/images/nav-icon-quotation.png') 
        .nav-icon-material
          background-image: url('../../../modules/images/nav-icon-material.png')
        .nav-icon-history
          background-image: url('../../../modules/images/nav-icon-history.png')
        .nav-icon-file
          background-image: url('../../../modules/images/nav-icon-file.png')
        .nav-icon-carMsg
          background-image: url('../../../modules/images/nav-icon-carMsg-pickup.png')    
    .arrow
      width: 100%
      height: .5rem
      margin: .2rem 0
      background: url('../../../modules/images/path.png') no-repeat  
      background-size: contain
      background-position: center
    .path-wrapper
      width: 100%
      font-size: 0
      background: #fff
      ul
        width: 100%
        padding: .2rem
        box-sizing: border-box 
        position:relative
        overflow: hidden 
        .line
          display: inline-block
          width: .02rem
          background: #cecece
          height: 98%
          position: absolute
          top: 0.3rem
          left: 1.02rem
        li
          font-size: 0
          text-align: right
          width: 100%
          padding: 0
          position: relative
          overflow: hidden
          .searchLeft
            display: inline-block
            width: 25%
            vertical-align: top
            font-size: .28rem
            padding-right: 0.15rem
            box-sizing: border-box
            position: absolute
            left: -.7rem
          .color-active
            .searchTime
              display: inline-block
              width: 75%
              color: $color-main
              font-size: .24rem
              vertical-align: middle
              text-align: right
              box-sizing: border-box
            .ring
              display: inline-block
              width: 0.25rem
              height: 0.25rem
              background: $color-main
              border-radius: 50% 
              vertical-align: middle
          .color-gray
            .searchTime
              display: inline-block
              width: 75%
              color: $gray-color9
              font-size: .24rem
              vertical-align: middle
              text-align: right
              box-sizing: border-box
            .ring
              display: inline-block
              width: 0.25rem
              height: 0.25rem
              background: $gray-color9
              border-radius: 50% 
              vertical-align: middle
          .line
            display: inline-block
            width: .02rem
            height: 1.2rem
            background: #d4d4d4
            margin-right: .1rem
          .searchRight
            //display: inline-block
            width: 84%  
            vertical-align: top
            padding: .2rem
            box-sizing: border-box
            text-align: left
            font-size: .28rem
            background: #ffffff
            margin-top: .08rem
            border: 1px solid #e6e6e6
            border-radius: 4px
            float: left
            margin-left: 1rem
            p
              width: 100%
              line-height: .45rem
            .grayColor
              color: gray
              font-size: .28rem
              text-align: left
            .btn
              float: right
              width: 2rem
              height: .6rem;
              line-height: .6rem;
              text-align: center;
              color: #fff
            .btn-active
              background: url('../../../modules/images/path-btn-bg.png') no-repeat
              background-size: 100% 100%
            .btn-gray
              background: url('../../../modules/images/path-btn-bg-gray.png') no-repeat
              background-size: 100% 100%  
</style>   