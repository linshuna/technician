<template>
  <div>
    <div class="customDetailWrap" v-if="cusItem">
      <div class="setMsg">
        <div class="logoWrap border-bottom-1px">
          <img :src="cusItem.headimg" class="customLogo"/>
          <div class="logoRight">
            <p class="customerName">
              <span>{{cusItem.uname}}</span>
              <img :src="cusItem.sex==1?boyIcon:girlIcon" class="sexIcon">
            </p>
            <p class="setRemark" :class="{'grayColor':!cusItem.remark,'orangeColor':cusItem.remark}">
              {{cusItem.remark?cusItem.remark:'暂无备注'}}
            </p>
            <a :href="'tel:'+cusItem.phone" class="customerTel">{{cusItem.phone}}</a>
          </div>
        </div>  
        <div class="wechatWrap">
          <button class="bindWechat">绑定微信</button>
        </div>
      </div>
      <div class="setMsg">
        <ul class="carMsgList">
          <li class="carMsgTitle clearFloat border-bottom-1px">
            <p class="fl">车辆清单</p>
            <p class="fr bindCar" @click="bindNewCar">绑定车辆</p>
          </li>
          <template v-if="carItem&&carItem.length>0">
            <transition-group tag="ul" name="slide">
              <li v-for="(item,index) in carItem" :key="index" :class="{'border-bottom-1px':carItem.length-1!=index}" @click="carDetailMsg({carId:item.carvid,carNo:item.carNo})">
                <p>
                  <span>{{item.carNo}}</span>
                  <span class="grayColor">{{item.carplate?item.carplate:'暂无'}}</span>
                </p>
                <p class="smallFont">历史进店 {{item.num}} 次</p>
                <span class="rightArrow">
                  <img :src="rightArrowIcon" alt="">
                </span>
              </li>
            </transition-group>
            <div class="more" v-if="carItemAll" @click="showItemAll">
              <img :src="carItem==carItemAll?moreIconTop:moreIconBtm" alt="">
            </div>
          </template>
          <template v-else>
            <li>
              <p class="grayColor">暂无车辆清单</p>
            </li>
          </template>
          
          
        </ul>
      </div>
      <div class="setMsg">
        <p class="setPadding clearFloat">
          <span class="fl">其他联系人</span> 
          <span class="fr grayColor">{{cusItem.contact | noData}}</span>
        </p>
      </div>
      <div class="setMsg setBtmPadding">
        <p class="setPadding border-bottom-1px">生日：{{cusItem.birthday | noData}}</p>
        <p class="setPadding">地址：{{cusItem.address | noData}}</p>
      </div>
      <button class="editorBtn" @click="editorFn">编辑</button>
    </div>  
    <router-view></router-view>  
  </div>

  
</template>

<script>

  import {format} from 'modules/js/date.js'
  import {GetQueryString} from 'modules/js/config.js'
  import {Toast} from 'mint-ui'
  export default {
    name: 'App',
    data(){
      return {
        customerLogo:require("modules/images/defaultLogo.png"),
        girlIcon:require("modules/images/girlIcon.png"),
        boyIcon:require("modules/images/boyIcon.png"),
        rightArrowIcon: require("modules/images/rightArrow.png"),
        moreIconBtm: require("modules/images/path.png"),
        moreIconTop: require("modules/images/pathTop.png"),
        clientvid:'',
        techvid:'',
        cusItem:null,
        carItem:null,
        carItemAll:null
      }
    },
    computed: {
      getStorage(){
        return this.$store.getters.getStorage;
      }
    },
    mounted: function(){
      this.clientvid = GetQueryString('cusId');
      let gainTecherData = this.getStorage;
      let techvid = gainTecherData.vid||'';
      this.techvid = techvid;
      this.init(this.clientvid,techvid)
    },
    filters:{
      noData:function(value){
        if(!value) return '暂无'
          else return value
      }
    },
    methods:{
      init:function(clientvid,techvid){
        this.$http.get('/api.php/TechSysClient/clientinfo?clientvid='+clientvid+'&techvid='+techvid)
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            this.cusItem = res.data.client;//客户信息
            let carItem = res.data.carlist;//客户的车辆列表
            if(carItem.length>3){
              this.carItemAll = carItem;
              this.carItem = carItem.slice(0,3)
            }else{
              this.carItem = carItem
            }
          }else{
            Toast(res.message)
          }
        })
      },
      showItemAll(){
        if(this.carItem == this.carItemAll){
          this.carItem = this.carItemAll.slice(0,3);
        }else{
          this.carItem = this.carItemAll;
        }
        
      },
      carDetailMsg:function(e){
        this.$router.push({name:"carDetailMsg",params: { carId: e.carId }})
      },
      bindNewCar: function(){
        // window.open("/customerDetail/addNewCar")
        // let id = ''
        this.$router.push({path:"/addNewCar/0"})
      },
      editorFn(){
        window.location.href = "addNewCustom.html?cusId="+this.clientvid
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .fl
    float: left
  .fr
    float: right 
  .clearFloat
    overflow: hidden  
  .orangeColor
    color: #fa9e15
  .grayColor
    color: #808080  
   .slide{
    position: absolute;
    width:100%;
    top: 0;
    left:0;
    opacity: 0;
  }
  .slide-enter-active {
    transition: all .4s ease;// cubic-bezier(1.0, 0.5, 0.8, 1.0)
  }
  .slide-leave-active {
    transition: all .2s ease;
  }
  .slide-enter, .slide-leave-to{
    transform: translateY(-30%);
    opacity: 1;
  }  
  .customDetailWrap
    width: 100%
    font-size: .28rem
    position: absolute
    left: 0
    top: 0
    min-height: 100%
    padding-bottom: 1.5rem
    background: #f4f4f4
    .setMsg
      margin-top: .2rem;
      background: #ffffff
      .setPadding
        width: 100%
        padding: 0.4rem 0.32rem
        box-sizing: border-box
      .logoWrap
        width: 100%
        height: 1.66rem
        padding: 0.2rem 0 0.2rem 0.32rem
        box-sizing: border-box
        font-size:0
        .customLogo
          display: inline-block
          width: 1.2rem
          height: 1.2rem
          padding-right: .2rem
          vertical-align: top
        .logoRight
          display: inline-block
          position: relative
          box-sizing: border-box
          text-align:left
          vertical-align: top
          font-size: .28rem
          position: relative
          width: 80%
          overflow: hidden
          .customerName
            padding-top: 0.2rem
            span 
              vertical-align: middle
              font-size: .34rem
              color: #333
            img   
              display: inline-block
              width: .64rem
              height: .3rem
              vertical-align: middle
              padding-left:.1rem
          .setRemark
            overflow: hidden
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            padding-top: .1rem
            font-size: .3rem
            width: 100%
            font-size: 0.24rem
            line-height: .32rem
          .grayColor
            color: gray
          .orangeColor
            color: #FA9E15
          .customerTel
            position: absolute
            top: 0.2rem
            left: 2.8rem  
            font-size: 0.34rem
            color: #FA9E15
      .wechatWrap
        width: 100%
        padding: .2rem 0
        box-sizing: border-box
        text-align: center
        .bindWechat
          display: inline-block
          border: 1px solid #FA9E15
          color: #FA9E15  
          width: 4.2rem
          background: transparent
          height: .48rem
          font-size: .28rem
          border-radius: 1.04rem
    .carMsgList
      width: 100%
      background: #ffffff
      box-sizing: border-box
      padding: 0 0.32rem
      .more
        width: 100%
        text-align: center
        padding: .1rem 0
        img
          display: inline-block
          width: .35rem
      li.carMsgTitle
        padding: 0.4rem 0
        box-sizing: border-box
        .bindCar
          color: #fa9e15
      li
        width: 100%
        padding: .2rem 0
        box-sizing: border-box       
        position: relative
        p
          line-height: .45rem
        .grayColor
          color: gray 
          padding-left: .1rem
        .smallFont
          font-size: .24rem  
          color: gray
        .rightArrow
          display: inline-block
          width: .15rem
          position: absolute
          right: 0
          top: 50%
          transform: translate(0,-50%)  
          img 
            display: inline-block
            width: 100%
            height: 100%     
  .editorBtn
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



