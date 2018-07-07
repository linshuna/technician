<template>
  <div class="customerWrap" :style="{'padding-bottom':customerList.length>3?'1.5rem':''}">
    <div class="setBg">
      <div class="searchWrap">
        <div class="searchLeft">
            <search-temp setWidthStyle="100" 
              setPlaceholder="搜索姓名、手机号"
              v-on:getSearchValue="gainSearchValue" ></search-temp>
        </div>  
        <div class="searchRight">
          <img src="../modules/images/add-icon.png" alt="" class="addIcon" @click="addNewCustom">
        </div>
      </div>
         
      <template v-if="getStorage">
        <loading v-if="loading"></loading>
        <div v-else-if="customerList&&customerList.length>0" style="margin-top:1.14rem;">
          <ul class="searchResult">
              <li v-for="(item,index) in customerList" :key="index" @click="linkCusDetial(item.clientvid)" :class="{'border-bottom-1px':index+1!==customerList.length}">
                  <div class="resultLeft">
                    <img :src="item.headimg" alt="">
                  </div>
                  <div class="resultRight">
                    <p class="customMsg">
                      {{item.uname}}
                      <img :src="item.sex==1?boyIcon:girlIcon" alt="" class="sexType"></p>
                    <p class="remark grayColor">{{item.remark?item.remark:'暂无'}}</p>
                    <p class="time grayColor">03:21PM</p>
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
  import noDataTip from 'components/common/noDataTip';
  import noLoginTip from 'components/common/NoLoginTip';
  import searchTemp  from "components/common/searchTemp.vue" 
  import loading from 'components/common/Loading.vue'
  import {mapState} from 'vuex'
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
        returnUrl: window.location.href
      }
    },
    components:{
      'no-data-tip': noDataTip,
      'no-login-tip': noLoginTip,
      'search-temp':searchTemp,
      'loading': loading
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      },
      ...mapState(['loading'])
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
        this.$store.commit('showLoading');//开始显示loading
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
            this.$store.commit('hideLoading');//隐藏loading
          })
        }
        

      }
    }
  }
</script>
<style lang="stylus" scoped>
  .orangeColor
    color: #fa9e15
    font-size: .24rem!important
  .grayColor
    color: #999  
    font-size: .26rem!important
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
        background: #fa902b
        position: fixed
        top:0
        left:0
        z-index:2
        .searchLeft,.searchRight
          display: inline-block
          font-size: .28rem
        .searchLeft
          width: 90%
          vertical-align: middle
          text-align: left
          box-sizing: border-box
          background-color #fff
          border-radius: 5px
        .searchRight
          width: 10%  
          vertical-align: middle
          text-align: center
          img 
            padding-left: 0.14rem
            width: .6rem
            height: .6rem
      div
        width: 100%      
        .searchResult
          width: 100%
          padding-left:.32rem
          box-sizing: border-box
          background #ffffff
          li
            font-size: 0
            height: 1.2rem
            padding: .32rem 0
            display flex
            .resultLeft,.resultRight
              font-size: .28rem
              vertical-align: top
            .resultLeft
              width: 22%
              text-align left
              img
                width: 1.2rem
                height: 1.2rem
            .resultRight
              width: 78%
              height: 1.52rem
              position: relative
              text-align: left
              box-sizing: border-box
              .customMsg
                font-size: 0.32rem
                .sexType 
                  display: inline-block
                  width: .64rem
                  height: .3rem
                  margin-left: .44rem
                  vertical-align: bottom
              .remark
                margin-top: .2rem
                width: 84%
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
              .time
                margin-top: .1rem
              a
                position: absolute
                top: 0.26rem
                right: .32rem
                img.telIcon
                  width: .5rem
                  height: .5rem






</style>
