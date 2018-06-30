<template>
  <div class="customerWrap" :style="{'padding-bottom':customerList.length>3?'1.5rem':''}">
    <div class="setBg">
      <div class="searchWrap" :class="{'changeFixed':changePosi}">
        <div class="searchLeft">
            <search-temp setWidthStyle="100" 
              setPlaceholder="搜索姓名、手机号"
              v-on:getSearchValue="gainSearchValue" 
              v-bind:changePosi.sync="changePosi"></search-temp>
        </div>  
        <div class="searchRight">
          <img src="../modules/images/add-icon.png" alt="" class="addIcon" @click="addNewCustom">
        </div>
      </div>
      <template v-if="getStorage">
        <div v-if="customerList.length>0" style="margin-top:1rem;">
          <ul class="searchResult">
              <li class="border-bottom-1px" v-for="(item,index) in customerList" :key="index" @click="linkCusDetial(item.clientvid)">
                  <div class="resultLeft">
                    <img :src="item.headimg" alt="">
                  </div>
                  <div class="resultRight">
                    <p class="customMsg">
                      {{item.uname}}
                      <img :src="item.sex==1?boyIcon:girlIcon" alt="" class="sexType"></p>
                    <p class="remark" :class="{'grayColor':!item.remark,'orangeColor':item.remark}">{{item.remark?item.remark:'暂无'}}</p>
                    <a :href="'tel:'+item.phone">
                      <img src="../modules/images/telIcon.png" alt="" class="telIcon">
                    </a>
                  </div>
              </li>
          </ul> 
        </div>
        <div class="noData" v-else>
          <no-data-tip :tipData="{typeTipe:0,titleTip:'客户',conTip:'暂无客户'}"></no-data-tip>
        </div>  
      </template>
      <template v-else>
        <no-login-tip></no-login-tip>
      </template>
           
    </div>

  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import noDataTip from './noDataTip';
  import noLoginTip from './NoLoginTip';
  import searchTemp  from "components/searchTemp.vue"
  export default {
    data(){
      return{
        techvid:null,
        searchValue:'',
        customerList: [],
        title: '',
        defaultIcon: require("modules/images/isLoginIcon.png"),
        girlIcon: require("modules/images/girlIcon.png"),
        boyIcon: require("modules/images/boyIcon.png"),
        changePosi: false,
        returnUrl: window.location.href
      }
    },
    components:{
      'no-data-tip': noDataTip,
      'no-login-tip': noLoginTip,
      'search-temp':searchTemp
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      }
    },
    created: function(){
      let gainTecherData = this.getStorage;
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
      }
    },
    mounted: function(){
      this.searchData();
    },
    methods:{
      formSubmit(){
        return false;
      },
      addNewCustom(){
        if(this.techvid){
          window.location.href = "addNewCustom.html"
        }else{
          Toast("请先登录");
          let _this = this;
          setTimeout(function(){
            window.location.href = "login.html?returnUrl="+_this.returnUrl
          },500)
          
        }
      },
      linkCusDetial(id){
        window.location.href = "customerDetail.html?cusId="+id
      },
      gainSearchValue(value){//就是触发回车的请求
        if(!this.techvid){
          Toast("请先登录");
          return false;
        }
        if(value == ''){
          Toast("请输入您要搜索姓名、手机号");
          return false;
        }
        this.searchData(value)
      },
      showAllData(){
        if(this.searchValue==''){
          this.searchData()
        }else{
          return false;
        }
      },
      searchData(value){
        let gainValue = value?value:'';
        if(this.techvid){
          this.$http.post('/api.php/TechSysClient/index',{techvid: this.techvid,search:gainValue})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              this.customerList = res.data
            }else{
              Toast(res.message)
            }
          })
        }
       
      }
    }
  }
</script>
<style lang="stylus">
  .orangeColor
    color: #fa9e15
    font-size: .22rem!important
  .grayColor
    color: #999  
    font-size: .22rem!important
  .customerWrap
    width: 100%
    min-height: 100%
    position: absolute
    left: 0
    top: 0
    background: #f4f4f4
    .loginMsg
      text-align: center
      margin-top: 30%
      a
        display: inline-block
        width: 100%
        line-height: .5rem
        font-size: .28rem
        img
          display: inline-block
          width: 1.5rem
        span
          display:block
          text-align: center
    .setBg
      width: 100%
      .searchWrap 
        width:100%
        padding: .2rem
        font-size: 0
        padding-top: .2rem
        box-sizing: border-box
        background #ffffff
        position: fixed
        top:0
        left:0
        z-index:2
        .searchLeft,.searchRight
          display: inline-block
          font-size: .28rem
        .searchLeft
          width: 85%
          vertical-align: middle
          text-align: left
          box-sizing: border-box
          // border: 1px solid #f4f4f4
          // border-radius: 5px
          // padding: .15rem .2rem
          // img 
          //   display: inline-block
          //   width: .35rem
          //   vertical-align: middle
          // form
          //   display: inline-block
          //   width: 90%
          //   vertical-align: middle
          //   input 
          //     display: inline-block
          //     width: 100%
        .searchRight
          width: 15%  
          vertical-align: middle
          text-align: center
          img 
            width: .6rem
            height: .6rem
      .noData
        width: 100%
        text-align: center    
        margin-top: 2rem  
        color: #fa9e15
        .noDataLogo
          display: inline-block
          width: 2.5rem
        p
          line-height: .45rem
      div
        width: 100%      
        .searchResult
          width: 100%
          width:100%
          padding-left:.32rem
          box-sizing: border-box
          background #ffffff
          li
            font-size: 0
            padding: .32rem 0
            .resultLeft,.resultRight
              display: inline-block
              font-size: .28rem
              vertical-align: top
            .resultLeft
              width: 15%
              img
                display: inline-block
                width: 1rem
                height: 1rem
            .resultRight
              width: 85%
              position: relative
              color: #999
              text-align: left
              padding-left: .32rem
              box-sizing: border-box
              .customMsg
                width: 100%
                .sexType 
                  display: inline-block
                  width: .3rem
                  height: .3rem
                  margin-left: .15rem
              .remark
                margin-top: .3rem
              a
                position: absolute
                top: 0
                right: .32rem
                img.telIcon
                  display: inline-block
                  width: .5rem
                  height: .5rem






</style>
