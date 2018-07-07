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
        <li :class="{'border-bottom-1px': (index+1)!==carList.length}" v-for="(item,index) in carList" :key="index" @click="linkCusDetial(item.carvid)" >
            <div class="resultLeft">
              <img :src="item.icon||defaultLogo" alt="">
            </div>
            <div class="resultRight">
              <p class="customMsg">{{item.carNo}}</p>
              <p class="remark clearFloat">
                <span class="fl" :class="{'orangeColor': item.carplate,'grayColor': !item.carplate}">
                  {{item.carplate | noDataTipFilter}}
                </span> 
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
          addIcon: require("modules/images/add-icon-bg.png"),
          telIcon: require("modules/images/telIcon.png"),
          rightArrowIcon: require("modules/images/rightArrow.png"),
          carList: [],
          techvid: ''
      }
    },
    created: function(){
      let gainTecherData = this.$store.getters.getStorage;
      if(!gainTecherData){
        let instance = Toast('请先登录')
        setTimeout(() => {
          instance.close()
          window.location.href = './login.html?returnUrl='+window.location.href
        }, 2000);
      }else{
        this.techvid = gainTecherData.vid;
      }
    },
    mounted: function(){
      this.$nextTick(function(){
        this.init();//初始数据
      })
    },
    filters:{
      noDataTipFilter:function(value){
        if(!value) 
          return '暂无';
        else
          return value;
        
      }
    },
    components:{
      'search-temp':searchTemp,
      'no-data-tip': noDataTip,    
    },
    methods:{
      init(searchValue){
        let value = searchValue?searchValue:''
        this.$http.post('/api.php/TechCar/index',{carNo:value,techvid: this.techvid})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            let resData = res.data;
            this.carList = []
            resData.map((item,index)=>{
              this.$set(this.carList,index,item)
            })
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
        console.log(value)
        this.init(value)
      },
    }
  }
</script>
<style lang="stylus" scoped>
   @import '~modules/css/variable.styl'
  .grayColor
    color: $gray-color9
  .customerWrap
    width: 100%
    min-height 100vh
    position: absolute
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
        background: #fff
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
