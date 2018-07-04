<template>
  <div class="quotation">
    <div class="itemWrap" v-if="serverList.length>0">
      <div v-for="(item,index) in serverList" :key="index" class="border-bottom-1px">
        <server-temp v-bind:item.sync="item" v-on:deleteFn="delServer(item)" v-bind:isEditor="isEditor" v-bind:isDel="isDel" :tranType="type"></server-temp>
      </div>
    </div>
    <div class="addServerTipWrap" v-else>
      <p @click="addSever" class="addServerTip">赶紧去添加{{setName}}项目吧^_^</p>
    </div>
    <div class="total-wrapper clearFloat">
      <span class="fl" @click="changeEditor">
        <template v-if="!isEditor">
          <span>编辑</span> 
          <img :src="editSmallLogo" alt="" class="editSmallLogo">  
        </template>
        <template v-else>
          <span>保存</span>
        </template>
      </span>
      <span class="fr" :class="{'orangeColor':total>0}">¥{{total | totalFilter}}</span> 
    </div>
    <div class="btn-wrapper">
      <div class="btn border-right-1px" @click="addSever">{{setAddFont}}</div>
      <div class="btn" @click="saveReck">{{setSaveFont}}</div>
    </div>
  </div>
</template>
<script>
  import serverTemp from './serverTemp.vue'
  import {Toast,MessageBox} from 'mint-ui'
  export default {
    data(){
      return{
        type:'',
        techvid:'',
        serverList: [],
        editSmallLogo: require('modules/images/edit-small-logo.png'),
        isEditor: false,
        isDel: true,
        setName:'',
        setAddFont:'',
        setSaveFont:''
      }
    },
    components:{
      'server-temp':serverTemp
    },
    created:function(){
      //获取类型
      this.type = this.$route.params.type;
      if(this.type==this.storeList) {
        this.setName = '领料'
        this.setAddFont='添加领料';
        this.setSaveFont='保存领料';
      }else{
        if(this.type==this.pickUpList) this.setName='商品'
          else if(this.type==this.quickQuote) this.setName='服务'
          this.setAddFont='添加'+this.setName
          this.setSaveFont='保存'+this.setName
      }
      let getTechStorage = this.$store.getters.getStorage;
      this.techvid = getTechStorage?getTechStorage.vid:'';
      this.init()
    },
    filters:{
      totalFilter: function(value){
        if(!value) return 0;
        value = value - 0;
        return value.toFixed(1);
      }
    },
    computed:{
      total:function(){
        let gainTotal = 0;
        if(this.serverList.length>0){
          this.serverList.map((item,index)=>{
              gainTotal+=item.num*item.price
          })  
        }
        return gainTotal;
      }
    },
    methods: {
      init(){//查看添加项目的列表
        //******获取请求接口类型的不同路径，不同数据表*******
        let reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/checkreck';
        let reqData = {};
        if(this.type == this.pickUpList){//接车单
          if(!this.reckorderNo) return false;
          reqData = {reckorderNo: this.reckorderNo,orderNo:this.orderNo}
        }else if(this.type == this.storeList){//领料单
          if(!this.scienceorderNo) return false;
          reqData = {scienceorderNo: this.scienceorderNo,orderNo:this.orderNo}
        }else{//快速报价 quick-quote
          if(!this.reckorderNo) return false;
          reqData = {reckorderNo: this.reckorderNo}
        }
        this.$http.post(reqHttp,reqData)
        .then((response)=>{
            let res = response.data;
            if(res.errorCode == 200){
              let list = res.data.list;
              if(list&&list.length>0) this.serverList = list;
                else{//必须重置serverList数组
                  this.serverList = [];
                  this.isEditor = false;
                }
            }else{
              Toast(res.message)
            }
        })
      },
      delServer(item){//删除服务
        //url根据不同类型，改变请求路径
        //******获取请求接口类型的不同路径，不同数据表*******
        let reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/editextand';
        this.$http.post(reqHttp,{extandid:item.extandid})
        .then((response)=>{
          let res = response.data;
          Toast(res.message)
          if(res.errorCode == 200){
            this.init()
          }
        })
      },
      addSever() {
        this.$router.push('/addSever/'+this.type)
      },
      changeEditor(){
        if(this.serverList.length<=0){
          this.$store.dispatch('delToast')
          Toast("赶紧去添加"+this.setName+"项目吧"); 
          return false;
        }
        this.isEditor=!this.isEditor
      },
      saveReck(){//保存服务
        if(this.serverList.length<=0){
          this.$store.dispatch('delToast')
          Toast("赶紧去添加"+this.setName+"项目吧");
          return false;
        }
        //******获取请求接口类型的不同路径，不同数据表*******
        let reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/saves';
        let key = '';
        if(this.type == 'pick-up-list') key='addTempSerData'
          else if(this.type == 'store-list') key='addTechScience'
            else key='addTempProData'
        
        let project = [];
        this.serverList.map((item,index)=>{
          //要push item的内容
          project.push({
            projectid: item.projectid,
            num: item.num,
            types: item.types,
            pprice: item.pprice,
            price: item.price,
          })
        })
        let msgTip = '';
        let _this = this;
        if(this.isEditor){
          msgTip = "是否确定保存已编辑的"+this.setName+"项目？"
        }else{
          msgTip = "是否确定保存"+this.setName+"项目？"
        }
        MessageBox.confirm(msgTip,'')
        .then(action => {
            let gainListsData = {};
            gainListsData.carNo = this.carno
            gainListsData.project = project
            gainListsData.techvid = this.techvid
            if(this.type=='store-list') gainListsData.scienceorderNo=this.scienceorderNo
              else gainListsData.reckorderNo=this.reckorderNo
            if(this.type!=='quick-quote') gainListsData.orderNo=this.orderNo
            gainListsData = JSON.stringify(gainListsData)

            this.$http.post(reqHttp,{lists:gainListsData})
            .then((response)=>{
              let res = response.data
              Toast(res.message)
              if(res.errorCode==200){
                //要清空本地存储 key为addTempProData
                this.$store.commit('_setName',key);
                this.$store.commit("_remvoeStorage")
                this.$store.dispatch('delToast');
                Toast(res.message)
                let url='';
                if(this.type == this.quickQuote) url="pickupOrder.html?carno="+_this.carno+"&orderNo="+this.orderNo+"#/qRecord"
                  else url='pickupOrder.html?orderNo='+this.orderNo+'&carNo='+this.carno+'#/path'
                setTimeout(function(){
                  window.location.href = url         
                },500)
              }
            })
        })
        .catch((err)=>{
            if(err == 'cancel') console.log("取消")
        })
        
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .orangeColor
    color: #fa9e15!important
  .quotation
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    min-height: 100%
    z-index: 10
    font-size: .28rem
    background: #f9f9f9
    .item-wrapper
      margin-top: 1.4rem 
    .addServerTipWrap  
      text-align: center
      margin-top: 20%
      .addServerTip
        font-size: .28rem
        color: gray
    .total-wrapper
      position: fixed
      bottom: .8rem
      line-height: .8rem
      width: 100%
      padding: 0 .2rem
      box-sizing: border-box
      line-height: 0.8rem
      text-align: right
      background: #fff
      .fl
        span 
          vertical-align: middle
        img
          display: inline-block
          width: 0.32rem
          vertical-align: middle
    .btn-wrapper
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      background: $color-main
      .btn
        width: 50%
        float: left  
        color: #fff
        text-align: center
</style>