<template>
  <div id="carDetailMsgWrap">
    <div class="carDetailMsg">
      <mt-tabbar v-model="selected" fixed>  
        <mt-tab-item id="车辆信息">  
          车辆信息  
        </mt-tab-item>  
        <mt-tab-item id="消息记录">  
          消费记录  
        </mt-tab-item>  
        <mt-tab-item id="检车记录">  
          检车记录  
        </mt-tab-item>  
        <mt-tab-item id="报价记录">  
          报价记录  
        </mt-tab-item>  
      </mt-tabbar>  
      <div class="tabCon">
        <mt-tab-container class="page-tabbar-container" v-model="selected">  
          <mt-tab-container-item id="车辆信息"> 
             <!--车辆信息内容  -->

            <div id="carMsg">
              <div class="carBaseMsg setMsg">
                <p>
                  <img :src="defaultIcon" alt="" class="carLogo">
                  <span>本田</span>
                </p>
                <p class="setPadding">车架号：xxx</p>
                <img :src="editorIcon" alt="" class="editIcon">  
              </div>
              <ul class="carMsgList setMsg">
                <li class="clearFloat border-bottom-1px">
                  <span class="fl">注册时间</span>
                  <span class="fr">xxxx-xx-xx</span>
                </li>
                <li class="clearFloat border-bottom-1px">
                  <span class="fl">车价</span>
                  <span class="fr">xxxx-xx-xx</span>
                </li>
                <li class="clearFloat border-bottom-1px">
                  <span class="fl">商业险到期</span>
                  <span class="fr">xxxx-xx-xx</span>
                </li>
                <li class="clearFloat">
                  <span class="fl">交强险到期</span>
                  <span class="fr">xxxx-xx-xx</span>
                </li>
              </ul>    
              <div class="carByCustom setMsg">
                <ul>
                  <li class="border-bottom-1px clearFloat">
                    <span class="fl">所属客户</span>
                    <button class="fr">解绑</button>
                  </li>
                  <li>
                    <p>
                      <span>李小姐</span>
                      <img :src="girlIcon" alt="">
                    </p>
                    <p class="orangeColor">15217117111</p>
                  </li>
                </ul>
                
              </div>
            </div>

          </mt-tab-container-item>  
          <mt-tab-container-item id="消息记录">  
            <!--消息记录  -->
            <div id="msgRemard">
                <ul class="consume">
                  <li class="consumeTitle">
                    <span>进店次数</span>
                    <span class="setCenter">消费金额</span>
                  </li>
                  <li>
                    <span class="grayColor">本年</span>
                    <span>0</span>
                    <span>0.00</span>
                  </li>
                  <li>
                    <span class="grayColor">累计</span>
                    <span>2</span>
                    <span>100.00</span>
                  </li>
                </ul>
                <div class="searchWrap">
                    <img :src="searchIcon" alt="">
                    <input type="text" v-model="searchValue" placeholder="搜索项目">
                </div> 
                <div class="searchResult">
                    <ul>
                      <li>
                        <div class="searchLeft">
                          <span class="searchTime">xxx-xx-xx</span>
                          <span class="ring"></span>
                          <span class="line"></span>
                        </div>
                        <div class="searchRight">
                          <p>￥50</p>
                          <p class="grayColor">1、蜡水快洗</p>
                        </div>
                      </li>
                      <li>
                        <div class="searchLeft">
                          <span class="searchTime">xxx-xx-xx</span>
                          <span class="ring"></span>
                          <span class="line"></span>
                        </div>
                        <div class="searchRight">
                          <p>￥50</p>
                          <p class="grayColor">1、蜡水快洗</p>
                        </div>
                      </li>
                    </ul>
                </div>
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="检车记录">  
            <div id="checkedRemark">
              <ul class="checkedRemarkList">
                <li>
                  <p class="checkedTitle border-bottom-1px">
                    <span class="checkedTime">2018.06.04</span>
                    <img :src="rightArrowIcon">  
                  </p>
                  <p class="clearFloat">
                    <span class="fl">项目名称</span>
                    <span class="fr">检测备注</span>
                  </p>
                  <ul class="projectList">
                    <li class="checkedCon clearFloat">
                      <span class="fl">项目名称</span>
                      <span class="fr">无</span>
                    </li>
                    <li class="checkedCon clearFloat">
                      <span class="fl">项目名称</span>
                      <span class="fr">无</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <p class="checkedTitle border-bottom-1px">
                    <span class="checkedTime">2018.06.04</span>
                    <img :src="rightArrowIcon">  
                  </p>
                  <p class="clearFloat">
                    <span class="fl">项目名称</span>
                    <span class="fr">检测备注</span>
                  </p>
                  <ul class="projectList">
                    <li class="checkedCon clearFloat">
                      <span class="fl">项目名称</span>
                      <span class="fr">无</span>
                    </li>
                    <li class="checkedCon clearFloat">
                      <span class="fl">项目名称</span>
                      <span class="fr">无</span>
                    </li>
                  </ul>
                  
                </li>
              </ul>
            </div>
          </mt-tab-container-item>  
          <mt-tab-container-item id="报价记录">  
            <!-- 报价记录 -->
            <div id="quotedRemark">  
              <ul class="checkedRemarkList">
                <li>
                  <p class="checkedTitle border-bottom-1px">
                    <span class="checkedTime">2018.06.04</span>
                    <img :src="rightArrowIcon">  
                  </p>
                  <p class="clearFloat">
                    <span class="fl">服务名称</span>
                  </p>
                  <ul class="projectList">
                    <li class="checkedCon clearFloat">
                      <span class="fl">服务名称</span>
                      <span class="fr quotedMsg">
                        <span class="smallFont">x1</span>
                        <span class="orangeColor">￥250</span>
                      </span>
                    </li>
                    <li class="checkedCon clearFloat">
                      <span class="fl">服务名称</span>
                      <span class="fr quotedMsg">
                        <span class="smallFont">x1</span>
                        <span class="orangeColor">￥250</span>
                      </span>
                    </li>
                  </ul>
                </li>
                <li>
                  <p class="checkedTitle border-bottom-1px">
                    <span class="checkedTime">2018.06.04</span>
                    <img :src="rightArrowIcon">  
                  </p>
                  <p class="clearFloat">
                    <span class="fl">服务名称</span>
                  </p>
                  <ul class="projectList">
                    <li class="checkedCon clearFloat">
                      <span class="fl">服务名称</span>
                      <span class="fr quotedMsg">
                        <span class="smallFont">x1</span>
                        <span class="orangeColor">￥250</span>
                      </span>
                    </li>
                    <li class="checkedCon clearFloat">
                      <span class="fl">服务名称</span>
                      <span class="fr quotedMsg">
                        <span class="smallFont">x1</span>
                        <span class="orangeColor">￥250</span>
                      </span>
                    </li>
                  </ul>
                  
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
      selected: '车辆信息',
      searchValue:'',
      editorIcon:require("modules/images/editorIcon.png"),
      defaultIcon:require("modules/images/defaultLogo.png"),
      girlIcon: require("modules/images/girlIcon.png"),
      searchIcon:require("modules/images/searchIcon.png"),
      rightArrowIcon:require("modules/images/rightArrow.png")
    }
  },
  mounted: function(){
    this.$nextTick(function(){
      document.title = '车辆详情'
    })
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
  .setMsg
    width: 100%
    margin-top: .2rem
    padding: 0 .32rem
    box-sizing: border-box
    background: #ffffff     
  #carDetailMsgWrap
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #f4f4f4
    .mint-tabbar
      height: .6rem
      top: 0
      backgound-image: none
      background:#ffffff
    .is-selected
      background: transparent
      border-bottom: 1px solid #FA9E15
      color: #FA9E15
    .mint-tab-item
      height: .6rem
      line-height: .6rem
      padding: 0  
      .mint-tab-item-label
        line-height: .6rem
    .tabCon
      margin-top: .7rem
      #carMsg
        width: 100%  
        position: relative
        .carBaseMsg
          width: 100%
          padding: .2rem .32rem;
          .setPadding
            padding-top: .2rem
          .carLogo
            display: inline-block
            width: .8rem
            width: .8rem
            vertical-align: middle
          span 
            vertical-align: middle 
          .editIcon
            display: inline-block
            width: .4rem
            heigh: .4rem
            position: absolute
            right: .32rem
            top: .2rem
        .carMsgList   
          width: 100%
          padding-left: .32rem
          box-sizing: border-box
          li
            padding: .4rem 0 
        .carByCustom
            width: 100%
            li
              padding: .2rem 0
              button
                width: 1.5rem
                height: .6rem
                color: #FA9E15
                font-size: .28rem
                border: 1px solid #FA9E15
                border-radius: 100px 
                background: transparent
              .orangeColor
                color: #FA9E15
              p
                line-height: .45rem    
              span 
                vertical-align: middle 
                line-height: .7rem
              img 
                display: inline-block
                width: .35rem
                height: .35rem
                vertical-align: middle
      #msgRemard
        width: 100%
        margin-top: .2rem
        background: #ffffff
        ul
          width: 100%
          .consumeTitle
            width: 100%
            font-size: 0
            span 
              display: inline-block
              width: 49%
              text-align: right   
              font-size: .28rem
              color: #333
            .setCenter
              text-align: center      
          li 
            width: 100%
            font-size: 0
            padding: .2rem 0
            .grayColor
              display: inline-block
              color: gray 
              width: 23%
            span
              display: inline-block
              font-size: .26rem
              width: 34%
              text-align: center
        .searchWrap
          display: inline-block
          font-size: .28rem
          width: 85%
          vertical-align: middle
          text-align: left
          border: 1px solid #f4f4f4
          border-radius: 5px
          padding: .15rem .2rem
          box-sizing: border-box
          margin:.2rem 0 .2rem .32rem
          img 
            display: inline-block
            width: .35rem
            vertical-align: middle
          input 
            display: inline-block
            width: 90%
            vertical-align: middle   
        .searchResult
          width: 100%
          font-size: 0
          background: #f4f4f4
          ul
            width: 100%
            padding: .2rem .2rem 0
            box-sizing: border-box 
          li
            font-size: 0
            text-align: right
            width: 100%
            padding: 0
            .searchLeft
              display: inline-block
              width: 25%
              vertical-align: top
              font-size: .28rem
              padding-right: 0.15rem
              box-sizing: border-box
              .searchTime
                display: inline-block
                width: 75%
                color: #ffffff
                font-size: .24rem
                vertical-align: middle
                text-align: right
                box-sizing: border-box
              .ring
                display: inline-block
                width: 0.25rem
                height: 0.25rem
                background: #FA9E15
                border-radius: 50% 
                vertical-align: middle
              .line
                display: inline-block
                width: .02rem
                height: 1.2rem
                background: #d4d4d4
                margin-right: .1rem
            .searchRight
              display: inline-block
              width: 75%  
              height: 1.3rem
              vertical-align: top
              padding: .2rem
              box-sizing: border-box
              text-align: left
              font-size: .28rem
              background: #ffffff
              margin-top: .08rem
              p
                width: 100%
                line-height: .45rem
              .grayColor
                color: gray
      #checkedRemark,#quotedRemark
        width: 100%  
        .checkedRemarkList
          width: 100%
          li
            width: 100%
            padding: 0 .32rem
            box-sizing: border-box
            background: #ffffff
            margin-top: .2rem
            p
              line-height .7rem
            .checkedTitle
              line-height .7rem
              position: relative
              img 
                display: inline-block
                width: .15rem
                line-height .7rem
                position: absolute
                right: 0
                top: 50%
                transform: translate(0,-50%)
            .projectList
              width: 100%
              color: gray
              li
                line-height: .7rem
                margin-top: 0
                padding: 0
                .quotedMsg
                  .smallFont
                    font-size: .2rem
                    padding:0 .2rem
                  .orangeColor
                    font-size: .28rem
                    color: #FA9E15


</style>



