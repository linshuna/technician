<template>
  <div class="addSever">
    <div class="set-search-padding">
      <search-temp setWidthStyle="100" 
          :setPlaceholder="setPlaceholder"
          v-on:getSearchValue="gainSearchValue" ></search-temp>
    </div>
    
    <div class="item-wrapper">
      <div :class="{'is_selected':item.bol}"  @click.stop="item.bol=!item.bol" v-for="(item,index) in techReckList" :key="index">
        <server-temp v-bind:item.sync="item" v-bind:isEditor="true" :tranType="type" class="border-bottom-1px"></server-temp>
      </div>
    </div>

    <div class="btn-wrapper">
      <div class="btn border-right-1px setBtnLightColor" @click="newSever">新增</div>
      <div class="btn setColor setBtnMainColor" @click="saveProList">保存</div>
    </div>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  import serverTemp from './serverTemp.vue' 
  import searchTemp  from "components/common/searchTemp.vue"
  export default {
    data() {
      return {
        type:'',
        sevQty:'1',
        techReckList:[],
        searchCon:'',
        techvid:'',
        setPlaceholder:''
      }
    },
    components:{
      'server-temp':serverTemp,
      'search-temp':searchTemp
    },
    created:function(){
      this.type = this.$route.params.type;
      this.$store.state.key = "techerData"
      let getTechStorage = this.$store.getters.getStorage;
      this.techvid = getTechStorage?getTechStorage.vid:'';
      if(this.type == this.storeList) this.setPlaceholder='搜索材料名称'
        else if(this.type == this.pickUpList) this.setPlaceholder='搜索商品名称/编码'
        else if(this.type == this.quickQuote) this.setPlaceholder='搜索服务名称/编码'
      this.init('');//初始获取服务项目的数据

    },
    methods: {
      init(con){
        // reqHttp = '/api.php/TechService/lists';
        let reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/lists';
        let key = '';
        if(this.type == this.pickUpList) key='addTempSerData'
        else if(this.type == this.storeList) key='addTechScience'
        else key='addTempProData'
        
        this.$http.post(reqHttp,{search:con})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            let gainData = res.data
            this.techReckList = gainData;
            
            let len = this.techReckList.length;

            //获取本地是否存在自己新增的服务项目,把自己添加的项目最佳在后面
            this.$store.commit('_setName',key)
            let getStorage = this.$store.getters.getStorage;
            this.techReckList.map((item,index)=>{
              this.$set(item,'num',1)
              this.$set(item,'bol',!getStorage&&index==0?true:false)
            })
            if(getStorage){
              for(var index in getStorage){//json的循环
                this.$set(this.techReckList,len+(index-0),getStorage[index])
                this.$set(this.techReckList[len+(index-0)],'num',1);//添加默认数量
                this.$set(this.techReckList[len+(index-0)],'bol',true);//如果是本地存储，进到这个页面是选中状态
              }
            }

          }else{
            Toast(res.message)
          }
        })
      },
      gainSearchValue(value){
        this.init(value)
      },
      newSever() {
        this.$router.push("/newSever/"+this.type)
        
      },
      saveProList(){
        // reqHttp = '/api.php/TechService/saves';
        let reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/saves';
        let project = []
        console.log(this.techReckList)
        this.techReckList.map((item,index)=>{
          if(item.bol){
            //要push item的内容
            if(this.type==this.storeList){
              project.push({
                scienceid: item.id,
                num: item.num,
                types: item.types,
                pprice: item.pprice,
                price: item.price,
                code: item.code
              })
            }else{
              project.push({
                projectid: item.id,
                num: item.num,
                types: item.types,
                pprice: item.pprice,
                price: item.price,
                code: item.code
              })  
            }

          }
        })
        if(project.length<=0){
          Toast('请选择服务类型');
          return false;
        }

        let gainListsData = {};
        gainListsData.carNo = this.carno
        gainListsData.techvid = this.techvid
        
        if(this.type==this.storeList){
          gainListsData.orderNo = this.orderNo
          gainListsData.science = project
        }else if(this.type==this.pickUpList){
          gainListsData.orderNo = this.orderNo
          gainListsData.project = project
        }else{
          gainListsData.project = project
        }
        
        gainListsData = JSON.stringify(gainListsData)
        let _this = this;
        this.$http.post(reqHttp, {lists:gainListsData})
        .then((response)=>{
          let res = response.data;
          Toast(res.message)
          let gainUrl = '';
          let gainNo = ''
          if(res.errorCode == 200){
            if(this.type==this.storeList){
              gainNo = res.data.scienceorderNo
            }else{
              gainNo = res.data.reckorderNo
            }
            if(this.type==this.pickUpList){
              gainUrl = "pickupOrder.html?carno="+this.carno+"&orderNo="+this.orderNo+"&reckorderNo="+gainNo+"#/quotation/"+this.type;
            }else if(this.type=='store-list'){
              gainUrl = "pickupOrder.html?carno="+this.carno+"&orderNo="+this.orderNo+"&scienceorderNo="+gainNo+"#/quotation/"+this.type;
            }else{
              gainUrl = "pickupOrder.html?carno="+this.carno+"&reckorderNo="+gainNo+"#/quotation/"+this.type;
            }
            setTimeout(function(){
              window.location.href = gainUrl
            },500)
          }else{
            Toast(res.message)
          }
          
          
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  .addSever
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 11
    font-size: .28rem
    min-height: 100% 
    background: #fff
    .set-search-padding
      width: 100%
      padding: 0 .2rem
      box-sizing: border-box  
      margin-top: .2rem
    .item-wrapper
      width: 100%
      padding: 0 .2rem
      box-sizing: border-box
      margin-top: .4rem 
      padding-bottom: 2rem
      >div
        .border-bottom-1px::after
          background: #eae7e7 
      .is_selected
        background: #ffecd1!important
        color: #fff 
        .item
          .account
            color: #fa9e15!important
          .countBtn-wrapper
            color: #fa9e15!important
            .count-input
              color: #fa9e15!important
        >.border-bottom-1px::after
          background: #ffffff    
    .btn-wrapper
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      z-index: 100
      .btn
        width: 50%
        float: left  
        color: #fff
        text-align: center        
</style>