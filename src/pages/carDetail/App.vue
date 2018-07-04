<template>
  <div class="customerWrap">
    <div class="setBg">
      <div class="searchWrap">
        <div class="searchLeft">
            <search-temp setWidthStyle="100" 
              setPlaceholder="搜索车牌号"
              v-on:getSearchValue="gainSearchValue" type="search-car"></search-temp>
        </div> 

        <div class="searchRight">
          <img :src="addIcon" alt="" class="addIcon" @click="addNewCustom">
        </div>
      </div>
      <ul class="searchResult" v-if="carList">
        <li class="border-bottom-1px" v-for="(item,index) in carList" :key="index" @click="linkCusDetial(item.carvid)" >
            <div class="resultLeft">
              <img :src="item.icon||defaultLogo" alt="">
            </div>
            <div class="resultRight">
              <p class="customMsg">{{item.carNo}}</p>
              <p class="remark clearFloat">
                <span class="fl">{{item.carmodel}}</span> 
                <img :src="rightArrowIcon" alt="" class="fr"> 
              </p>
              <a :href="'tel:'+item.phone">
                <span>{{item.uname}}</span>
                <img :src="telIcon" alt="" class="telIcon">
              </a>
            </div>
        </li>
      </ul>      
      <div class="noData" v-else>
        <no-data-tip :tipData="{typeTipe:0,titleTip:'车辆管理',conTip:'暂无车辆'}"></no-data-tip>
      </div>
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import searchTemp  from "components/common/searchTemp.vue"
  import noDataTip  from "components/common/noDataTip"
  export default {
    data(){
      return{
          searchValue:'',
          searchIcon: require("modules/images/searchIcon.png"),
          defaultLogo: require("modules/images/defaultLogo.png"),
          addIcon: require("modules/images/add-icon.png"),
          telIcon: require("modules/images/telIcon.png"),
          rightArrowIcon: require("modules/images/rightArrow.png"),
          carList: [],
          techvid: ''
      }
    },
    created: function(){
      let gainTecherData = this.$store.getters.getStorage;
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
      }
    },
    mounted: function(){
      this.$nextTick(function(){
        this.init()
      })
      
    },
    components:{
      'search-temp':searchTemp,
      'no-data-tip': noDataTip,    
    },
    methods:{
      init(searchValue){
        let value = searchValue?searchValue:''
        this.$http.post('/api.php/TechCar/index',{carNo:value})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            this.carList = res.data
          }else{
            Toast(res.message) 
          }
        })
      },
      addNewCustom(){
        this.$router.push({path:"/addCarMsg"})
      },
      linkCusDetial(id){
        this.$router.push({path:"/carDetailMsg/"+id})
      },
      gainSearchValue(value){//就是触发回车的请求
        if(!this.techvid){
          Toast("请先登录");
          return false;
        }
        if(value == ''){
          Toast("请输入您要搜索车牌号");
          return false;
        }
        this.init(value)
      },
    }
  }
</script>
<style lang="stylus">
  .customerWrap
    width: 100%
    height 100vh
    position fixed
    top 0
    left 0
    background #f4f4f4
    .setBg
      width: 100%
      .searchWrap 
        width:100%
        padding: .2rem
        box-sizing: border-box
        font-size: 0
        background #ffffff
        .searchLeft,.searchRight
          display: inline-block
          font-size: .28rem
        .searchLeft
          width: 85%
          vertical-align: middle
          text-align: left
          // border: 1px solid #f4f4f4
          // border-radius: 5px
          // padding: .15rem .2rem
          // box-sizing: border-box
          // img 
          //   display: inline-block
          //   width: .35rem
          //   vertical-align: middle
          // input 
          //   display: inline-block
          //   width: 90%
          //   vertical-align: middle
        .searchRight
          width: 15%  
          vertical-align: middle
          text-align: center
          img 
            width: .6rem
            height: .6rem
      .searchResult
        width: 100%
        width:100%
        padding-left:.32rem
        box-sizing: border-box
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
              color: #FA9E15
              margin-top: .3rem
              width:100%
              padding-right: .2rem
              box-sizing: border-box
              img
                display: inline-block
                width: .15rem
                vertical-align: middle
            a
              position: absolute
              top: -.1rem
              right: .32rem
              img.telIcon
                display: inline-block
                width: .35rem
                height: .35rem
                vertical-align: middle 
              span 
                vertical-align: middle    






</style>
