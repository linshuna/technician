<template>
  <div id="carDetailMsgWrap">
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
      <div class="tabCon">
        <mt-tab-container class="page-tabbar-container" v-model="selected">  
          <mt-tab-container-item id="全部"> 
            <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="orangeColor fr">服务中</span>
                    </p>
                    <p class="grayColor">李小姐</p>
                    <p class="clearFloat">
                      <span class="grayColor fl">维修、美容服务</span> 
                      <span class="blueColor fr">￥1200</span>
                    </p>
                  </div>
                </li>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="grayColor fr">待接车</span>
                    </p>
                    <p class="grayColor">李小姐</p>
                    <p class="clearFloat">
                      <span class="grayColor fl">维修、美容服务</span> 
                      <span class="changeDrive fr">
                        <button>立即接单</button>
                        <button>取消预约</button>
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
          </mt-tab-container-item>  
          <mt-tab-container-item id="待接单">  
            <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="grayColor fr">待接车</span>
                    </p>
                    <p class="grayColor">李小姐</p>
                    <p class="clearFloat">
                      <span class="grayColor fl">维修、美容服务</span> 
                      <span class="changeDrive fr">
                        <button>立即接单</button>
                        <button>取消预约</button>
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="待服务">  
            <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="orangeColor fr">服务中</span>
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
          <mt-tab-container-item id="待结账">  
             <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="orangeColor fr">待结账</span>
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
          <mt-tab-container-item id="已提车">  
             <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="grayColor fr">已提车</span>
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
          <mt-tab-container-item id="待访问">  
             <div class="carStatelist">
              <ul>
                <li class="border-bottom-1px">
                  <img :src="defaultIcon" alt="" class="leftIconList">
                  <div class="rightList">
                    <p class="clearFloat">
                      <span class="fl">粤A55555</span>
                      <span class="grayColor fr">待访问</span>
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
        </mt-tab-container>  
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
  // import {format} from 'modules/js/date.js'
export default {
  name: 'App',
  data(){
    return {
      selected: '全部',
      searchValue:'',
      defaultIcon:require("modules/images/defaultLogo.png"),
      rightArrowIcon:require("modules/images/rightArrow.png")
    }
  },
  mounted: function(){
  },
  methods:{

    
  }
}
</script>

<style lang="stylus">
  .fl
    float: left
  .fr
    float: right 
  .clearFloat
    overflow: hidden
  .grayColor 
    font-size: .24rem
    color: #bfbfbf  

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
                  font-size: .24rem
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



