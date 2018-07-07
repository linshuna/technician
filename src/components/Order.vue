<template>
  <div id="carDetailMsgWrap" class="set-tab-default">
    <div class="carDetailMsg">
      <mt-tabbar v-model="selected" fixed>  
        <mt-tab-item id="全部">  
          全部  
        </mt-tab-item>  
        <mt-tab-item id="待接单">  
          待接单  
        </mt-tab-item>  
        <mt-tab-item id="待服务">  
          待服务  
        </mt-tab-item>  
        <mt-tab-item id="待结账">  
          待结账  
        </mt-tab-item>  
        <mt-tab-item id="已提车">  
          已提车  
        </mt-tab-item>  
        <mt-tab-item id="待访问">  
          待访问  
        </mt-tab-item>  
      </mt-tabbar>  
      <div class="tabCon" v-if="getStorage">
        <mt-tab-container class="page-tabbar-container" v-model="selected">  
          <mt-tab-container-item id="全部"> 
            <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl setCarnoFont">粤A55555</span>
                      <span class="orangeColor fr setTitleFont">服务中</span>
                    </p>
                    <p class="grayColor">李小姐</p>
                    <p class="clearFloat">
                      <span class="grayColor fl">维修、美容服务</span> 
                      <span class="blueColor fr">￥1200</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
          </mt-tab-container-item>  
          <mt-tab-container-item id="待接单">
            <template v-if="!nodealList||nodealList.length==0">
               <no-data-tip :tipData="{typeTipe:0,titleTip:'订单',conTip:'暂无接单记录'}"></no-data-tip>
            </template>  
            <template v-else>
              <div class="carStatelist">
                <ul>
                  <li class="border-bottom-1px" v-for="(item,index) in nodealList">
                    <img :src="item.icon" alt="" class="leftIconList">
                    <div class="rightList">
                      <p class="clearFloat">
                        <span class="fl setCarnoFont">{{item.carNo}}</span>
                        <span class="grayColor fr setTitleFont">待接车</span>
                      </p>
                      <p class="grayColor">{{item.uname}}</p>
                      <p class="clearFloat">
                        <span class="grayColor fl">{{item.project | noDataTipFilter}}</span> 
                        <span class="changeDrive fr">
                          <button>立即接单</button>
                          <button>取消预约</button>
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
            
          </mt-tab-container-item>  
          <mt-tab-container-item id="待服务"> 
            <template v-if="!serviceList||serviceList.length==0">
               <no-data-tip :tipData="{typeTipe:0,titleTip:'订单',conTip:'暂无服务记录'}"></no-data-tip>
            </template> 
            <template v-else>
              <div class="carStatelist">
                <ul>
                  <li class="border-bottom-1px" v-for="(item,index) in serviceList">
                    <img :src="item.icon" alt="" class="leftIconList">
                    <div class="rightList">
                      <p class="clearFloat">
                        <span class="fl setCarnoFont">{{item.carNo}}</span>
                        <span class="orangeColor fr setTitleFont">服务中</span>
                      </p>
                      <p class="grayColor">{{item.uname}}</p>
                      <p class="clearFloat">
                        <span class="grayColor fl">{{item.project | noDataTipFilter}}</span> 
                        <span class="blueColor fr">{{item.money | priceFilter}}</span>
                      </p>
                      <p class="grayColor">预计提车日期：{{item.gettime}}</p>
                    </div>
                  </li>
                
                </ul>
              </div>
            </template>
            
          </mt-tab-container-item>  
          <mt-tab-container-item id="待结账"> 
            <template v-if="!payList||payList.length==0">
               <no-data-tip :tipData="{typeTipe:0,titleTip:'订单',conTip:'暂无结账记录'}"></no-data-tip>
            </template> 
            <template v-else>
              <div class="carStatelist">
                <ul>
                  <li class="border-bottom-1px" v-for="(item,index) in payList">
                    <img :src="item.icon" alt="" class="leftIconList">
                    <div class="rightList">
                      <p class="clearFloat">
                        <span class="fl setCarnoFont">{{item.carNo}}</span>
                        <span class="orangeColor fr setTitleFont">待结账</span>
                      </p>
                      <p class="grayColor">{{item.uname}}</p>
                      <p class="clearFloat">
                        <span class="grayColor fl">{{item.project | noDataTipFilter}}</span> 
                        <span class="blueColor fr">{{item.money | priceFilter}}</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
             
          </mt-tab-container-item>  
          <mt-tab-container-item id="已提车">  
            <template v-if="!finishList||finishList.length==0">
               <no-data-tip :tipData="{typeTipe:0,titleTip:'订单',conTip:'暂无提车记录'}"></no-data-tip>
            </template> 
            <template v-else>
              <div class="carStatelist">
                <ul>
                  <li class="border-bottom-1px" v-for="(item,index) in finishList">
                    <img :src="item.icon" alt="" class="leftIconList">
                    <div class="rightList">
                      <p class="clearFloat">
                        <span class="fl setCarnoFont">{{item.carNo}}</span>
                        <span class="grayColor fr setTitleFont">已提车</span>
                      </p>
                      <p class="grayColor">{{item.uname}}</p>
                      <p class="clearFloat">
                        <span class="grayColor fl">{{item.project | noDataTipFilter}}</span> 
                        <span class="blueColor fr">{{item.money | priceFilter}}</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
             
          </mt-tab-container-item>  
          <mt-tab-container-item id="待访问">  
            <template v-if="!visitList||visitList.length==0">
               <no-data-tip :tipData="{typeTipe:0,titleTip:'订单',conTip:'暂无访问记录'}"></no-data-tip>
            </template> 
            <template v-else>
              <div class="carStatelist">
                <ul>
                  <li class="border-bottom-1px" v-for="(item,index) in visitList">
                    <img :src="item.icon" alt="" class="leftIconList">
                    <div class="rightList">
                      <p class="clearFloat">
                        <span class="fl setCarnoFont">{{item.carNo}}</span>
                        <span class="grayColor fr setTitleFont">待访问</span>
                      </p>
                      <p class="grayColor">{{item.uname}}</p>
                      <p class="clearFloat">
                        <span class="grayColor fl">{{item.project | noDataTipFilter}}</span> 
                        <span class="blueColor fr">{{item.money | priceFilter}}</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
             
          </mt-tab-container-item>  
        </mt-tab-container>  
      </div>
      <div class="tabCon" v-else>
        <no-login-tip></no-login-tip>
      </div>
    </div>
     

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabItem,TabContainer, TabContainerItem,Cell  } from 'mint-ui';
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Cell.name, Cell);
  import noLoginTip from 'components/common/NoLoginTip';
  import noDataTip from 'components/common/noDataTip'
export default {
  name: 'App',
  data(){
    return {
      selected: '全部',
      searchValue:'',
      defaultIcon:require("modules/images/defaultLogo.png"),
      rightArrowIcon:require("modules/images/rightArrow.png"),
      techvid: null,
      nodealList: null,//待接单
      serviceList: null,//服务中
      payList: null,//待结账
      finishList: null,//已结账
      visitList: null //回访录
    }
  },
  mounted: function(){
    this.$nextTick(function(){
      let gainTecherData = this.getStorage;
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
        this.init();//初始输入
      }
    })
  },
  filters:{
    noDataTipFilter:function(value){
      if(!value) return '暂无';
        else return value;
    },
    priceFilter:function(value){
      if(!value||value==0) return '￥0';
        else return '￥'+value;
    }
  },
  components:{
    'no-login-tip': noLoginTip,
    'no-data-tip':noDataTip
  },
  computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      }
  },
  methods:{
    init:function(){
      this.$http.post('/api.php/TechRecord/index',{techvid:this.techvid})
      .then((response)=>{
        let res = response.data;
        if(res.errorCode == 200){
          let resData = res.data;
          this.nodealList = resData.nodeal;//待接单
          this.serviceList = resData.service;//服务中
          this.payList = resData.pay;//待结账
          this.finishList = resData.finish;//已结账
          this.visitList = resData.visit;//回访录
        }
      })
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
  .grayColor 
    font-size: .26rem
    color: #bfbfbf  
  .setTitleFont
    font-size: .28rem  
  #carDetailMsgWrap
    width:100%
    font-size: .28rem
    .mint-tabbar
      height: .7rem
      top: 0
      backgound-image: none
      background:#ffffff
      border-bottom: 1px solid #efefef
    .is-selected
      background: transparent
      border-bottom: 1px solid #FA9E15
      color: #FA9E15
    .mint-tab-item
      height: .7rem
      line-height: .7rem
      padding: 0  
      .mint-tab-item-label
        line-height: .7rem
    .tabCon  
      width: 100%
      .carStatelist
        margin-top: .7rem   
        ul
          width: 100%
          padding-left: .32rem
          box-sizing: border-box
          background: #ffffff
          li
            width: 100%
            padding: .32rem 0
            .leftIconList
              display: inline-block
              width: .8rem
              height: .8rem
              vertical-align: middle
              padding-right: .32rem
            .rightList >>> .setCarnoFont
              font-size: .28rem 
            .rightList
              display: inline-block
              padding-right: .32rem
              width: 80%
              box-sizing: border-box
              vertical-align: middle
              p
                width: 100%
                line-height .45rem
                text-align: left 
                .orangeColor
                  font-size: .28rem
                  color: #FA9E15
                .blueColor
                  font-size: .28rem
                  color: skyblue
                .changeDrive
                  button 
                    display: inline-block
                    background: transparent 
                    color: #FA9E15
                    border: none
                    font-size: .28rem
                    padding: 0 0 0 .1rem;


</style>



