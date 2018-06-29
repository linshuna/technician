<template>
  <div class="addSever">
    <form action="javascript:return true">
        <input class="search" type="search" placeholder="搜索服务名称/编码" v-model="searchCon" @keyup.13="init(searchCon)"/>
    </form>
    <div class="item-wrapper">
      <div :class="{'is_selected':item.bol}"  @click.stop="item.bol=!item.bol" v-for="(item,index) in techReckList" :key="index">
        <!-- <div class="name">{{item.name}}</div>
        <div class="code">编码: {{item.code}}</div>
        <div class="account">¥{{item.price}}</div>
        <div class="countBtn-wrapper">
          <div class="reduce" @click.stop="reduceCount(index,item.num)">-</div>
          <input class="count-input" type="number" v-model.number="item.num"/>
          <div class="add" @click.stop="addCount(index,item.num)">+</div>
        </div> -->
        <server-temp v-bind:item.sync="item" v-bind:isEditor="true" class="border-bottom-1px"></server-temp>
      </div>
    </div>

    <div class="btn-wrapper">
      <div class="btn border-right-1px" @click="newSever">新增</div>
      <div class="btn" @click="saveProList">保存</div>
    </div>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  import {GetQueryString} from 'modules/js/config.js'
  import serverTemp from './serverTemp.vue'
  export default {
    data() {
      return {
        sevQty:'1',
        techReckList:[],
        searchCon:'',
        techvid:'',
        carno:''
      }
    },
    components:{
      'server-temp':serverTemp
    },
    created:function(){
      this.$store.state.key = "techerData"
      let getTechStorage = this.$store.getters.getStorage;
      this.techvid = getTechStorage?getTechStorage.vid:'';
      this.carno = decodeURI(GetQueryString("carno"))||''; 
      
      this.init('');//初始获取服务项目的数据

    },
    methods: {
      init(con){
        this.$http.post('/api.php/TechReck/lists',{search:con})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            let gainData = res.data
            this.techReckList = gainData;
            
            let len = this.techReckList.length;
            //获取本地是否存在自己新增的服务项目,把自己添加的项目最佳在后面
            let key = 'addTempProData'
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
      newSever() {
        this.$router.push('/newSever')
      },
      saveProList(){
          let project = []
          this.techReckList.map((item,index)=>{
            if(item.bol){
              //要push item的内容
              project.push({
                projectid: item.id,
                num: item.num,
                types: item.types,
                pprice: item.pprice,
                price: item.price,
                code: item.code
              })
            }
          })
          if(project.length<=0){
            Toast('请选择服务类型');
            return false;
          }

          let gainListsData = {};
          gainListsData.carNo = this.carno
          gainListsData.techvid = this.techvid
          gainListsData.project = project
          
          gainListsData = JSON.stringify(gainListsData)
          let _this = this;
          this.$http.post('/api.php/TechReck/saves',{lists:gainListsData})
          .then((response)=>{
            let res = response.data;
            Toast(res.message)
            if(res.errorCode == 200){
                let reckorderNo = res.data.reckorderNo
                setTimeout(function(){
                  window.location.href = "pickupOrder.html?carno="+_this.carno+"&reckorderNo="+reckorderNo+"#/quotation/"
                },500)
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
    .search
      width: 90%
      height: .8rem
      padding: .1rem
      padding-left: .8rem
      box-sizing: border-box
      border: 1px solid #eee
      position: absolute
      left: .3rem
      top: .2rem
      background: url('../../../modules/images/searchIcon.png') no-repeat
      background-size: .5rem .5rem
      background-position: .2rem
    .item-wrapper
      margin-top: 1.4rem 
      padding-bottom: 2rem
      >div
        .border-bottom-1px::after
          background: #eae7e7 
      .is_selected
        background: #ffe6c1!important
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
      background: $color-main
      z-index: 100
      .btn
        width: 50%
        float: left  
        color: #fff
        text-align: center        
</style>