<template> 
  <div class="quoteWrap">
    <!-- <div class="search-wrapper">
      <input class="search" type="text" v-model="carno" placeholder="请输入车牌" readonly @focus="isShow=true"/>
    </div> -->
    <div class="search-temp-wrap" :class="{'changeFixed':changePosi}">
        <search-temp setWidthStyle="100" 
            setPlaceholder="请输入车牌"
            type="search-car"
            v-on:getSearchValue="gainSearchValue" 
            v-bind:changePosi.sync="changePosi"></search-temp>
    </div>
    <template v-if="techvid">
        <div v-if="carList.length>0">
          <div class="result" style="margin-top: 1rem;">
            <ul>
              <li class="border-bottom-1px" @click="goQuote(item.carNo)" v-for="(item,index) in carList" :key="index">{{item.carNo}} <span class="fr name">{{item.uname}}</span></li>
            </ul>
          </div>
        </div>
        <div class="noData" v-else>
          <no-data-tip :tipData="{typeTipe:0,titleTip:'快速报价',conTip:'暂无车牌列表'}"></no-data-tip>
        </div>  
    </template>
    <template v-else>
        <div class="loginMsg">
          <img :src="defaultIcon" alt="">
          <a :href="'login.html?returnUrl='+returnUrl">登录/注册</a>
        </div>
    </template> 
  </div>
</template>

<script>
  import noDataTip from 'components/common/noDataTip';
  import searchTemp  from "components/common/searchTemp.vue"
  import {Toast} from "mint-ui"

  export default {
    data() {
      return {
        techvid:null,
        carList: [],
        defaultIcon: require("modules/images/isLoginIcon.png"),
        returnUrl: window.location.href,
        carno:'',
        isShow: false,
        changePosi: false
      }
    },
    created() {
      let gainTecherData = this.$store.getters.getStorage;
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
      }
    },
    mounted() {
      this.searchData();
    },
    components:{
      'no-data-tip': noDataTip,
      'search-temp':searchTemp
    },
    methods: {
      gainSearchValue(value){//监听完成
        this.searchData(value)
      },
      goQuote(carno) {
        window.location.href='./pickupOrder.html?carno='+carno+'#/quotation/quick-quote' 
      },
      searchData(value){

        this.$http.post('/api.php/TechReck/carNos',{carNo:value})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            this.carList = res.data
          }else{
            Toast(res.message)
          }
        })
        
       
      }
    }
  }  
</script>

<style lang="stylus">
  @import '~modules/css/variable.styl'
  .quoteWrap
    width: 100%
    font-size: .28rem
    .loginMsg
      text-align: center
      margin-top: 30%
      img
        display: inline-block
        width: 1.5rem
      a
        display: inline-block
        width: 100%
        line-height: .45rem
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
    .search-temp-wrap
      width:100%
      padding: .2rem
      box-sizing:border-box
      background: #ffffff  
      position: fixed
      top:0
      left:0
      z-index: 999
    .search-wrapper
      .search
        width: 94%
        height: .8rem
        padding-left: .8rem
        border: 1px solid #eee
        border-radius: 4px
        margin: .2rem
        background: url('../../modules/images/searchIcon.png') no-repeat
        background-size: 0.4rem
        background-position: .2rem
        box-sizing: border-box
      .add-btn
        width: 0.5rem
        height: 0.5rem
        float: right
        margin: 0.3rem 0.4rem 0 0
        background: url('../../modules/images/add-icon.png') no-repeat
        background-size: 100% 100%
    .result
      li
        height: .8rem
        line-height: .8rem 
        padding: 0 .2rem
        .name
          color: #009fff 
</style>
