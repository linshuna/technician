<template>
  <div id="app">
    <div class="search-wrapper">
      <input class="search" type="text" v-model="carno" placeholder="请输入车牌" readonly @focus="isShow=true"/>
      <div class="add-btn"></div>
    </div>

    <car-key-code v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></car-key-code>

    <template v-if="getStorage">
        <div v-if="customerList.length>0">
          <div class="result">
            <ul>
              <li class="border-bottom-1px" @click="goQuote" v-for="(item,index) in customerList" :key="index">云A11111 <span class="fr name">周 会员</span></li>
              <li class="border-bottom-1px">云A22222</li>
            </ul>
          </div>
        </div>
      <div class="noData" v-else>
        <no-data-tip :tipData="{typeTipe:0,titleTip:'客户',conTip:'暂无客户'}"></no-data-tip>
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

  import noDataTip from 'components/noDataTip';

  export default {
    data() {
      return {
        techvid:null,
        customerList: [],
        defaultIcon: require("modules/images/isLoginIcon.png"),
        returnUrl: window.location.href,
        carno:''
      }
    },
    components:{
      'car-key-code':carKeyCode,
      'no-data-tip': noDataTip
    },
    methods: {
      
      goQuote() {
        window.location.href='./pickupOrder.html#/quotation'
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
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      }
    },
    created() {
      let gainTecherData = JSON.parse(this.getStorage);
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
      }
    },
    mounted() {
      this.searchData();
    }
  }  
</script>

<style lang="stylus">
  @import '~modules/css/variable.styl'

  #app
    font-family: PingFangSC-Regular
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
    .search-wrapper
      .search
        width: 80%
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
