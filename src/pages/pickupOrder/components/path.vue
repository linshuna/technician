<template>
  <div id="path">
      <div class="nav-section commen-width">
        <ul class="nav-section-list">
          <li v-for="(nav,index) in navData" :key="index" @click="handleNavClick(nav.tag)">
            <div class="nav-icon" :class="nav.className"></div>
            <p>{{nav.name}}</p>
          </li>
        </ul>
      </div>
      <div class="arrow"></div>
      <div class="path-wrapper">
        <ul>
          <li>
            <div class="searchLeft">
              <span class="searchTime">接车</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">名字 2018-09-09 15:15</p>
              <p class="grayColor">预计交车时间:2018-09-9</p>
              <p class="grayColor">嘱咐: 无</p>
              <div class="btn-wrapper">
                <div class="btn check" @click="look">查看</div>
                <div class="btn" @click="edit">编辑</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">检车</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">检测时间 2018-09-09 15:15</p>
              <p class="grayColor">结论: 无</p>
              <div class="btn-wrapper">
                <div class="btn check" @click="check">检测</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">报价</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">项目: 维修、美容</p>
              <p class="grayColor">金额: ¥22</p>
              <div class="btn-wrapper">
                <div class="btn check" @click="addSever">添加服务</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">材料</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">刹车片<span>×2</span></p>
              <div class="btn-wrapper">
                <div class="btn check" @click="addPro">添加材料</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">派工</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">技师: 名字</p>
              <div class="btn-wrapper">
                <div class="btn check" @click="dispath">派工</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">确认</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <div class="btn-wrapper">
                <div class="btn check" @click="bill">提交结账</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">结账</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight">
              <p class="grayColor">实收:¥22 </p>
              <div class="btn-wrapper">
                <div class="btn check">结账</div>
              </div>
            </div>
          </li>
          <li>
            <div class="searchLeft">
              <span class="searchTime">提车</span>
              <span class="ring"></span>
              <span class="line"></span>
            </div>
            <div class="searchRight" style="border: none;
      padding: 1rem 0;">
              
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
  import {GetQueryString} from 'modules/js/config.js'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        navData: [
          {
            className:'nav-icon-report',
            name:'检测单',
            tag: 'check'
          },
          {
            className:'nav-icon-quotation',
            name:'报价',
            tag: 'quotation'
          },
          {
            className:'nav-icon-material',
            name:'材料单',
            tag: 'addPro'
          },
          {
            className:'nav-icon-history',
            name:'进店历史'
          },
          {
            className:'nav-icon-file',
            name:'客户档案'
          },
          {
            className:'nav-icon-carMsg',
            name:'车辆信息'
          }
        ],
        carvid: '',
        clientvid: '',
        orderNo: '',
        techvid: null
      }
    },
    methods: {
      look() {
        this.$router.push('/look')
      },
      edit() {
        this.$router.push('/edit')
      },
      check() {
        this.$router.push('/check')
      },
      addSever() {
        this.$router.push('/quotation')
      },
      addPro() {
        this.$router.push('/addPro')
      },
      dispath() {
        this.$router.push('/dispath')
      },
      bill() {
        this.$router.push('/bill')
      },
      handleNavClick(val) {
        this.$router.push('/'+val)
      }
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage
      }
    },
    created() {
      let gainTecherData = this.getStorage
      if(gainTecherData){
        this.techvid = gainTecherData.vid
      }

      // this.carvid = GetQueryString('carvid')
      // this.clientvid = GetQueryString('clientvid')
      // this.orderNo = GetQueryString('orderNo')

    }
  }
</script>
<style lang="stylus">
  #path
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    text-align: center
    font-size: .28rem
    background: #f9f9f9
    overflow: scroll
    padding-bottom: .2rem
    .nav-section
      padding: .6rem 0
      background: #fff
      .nav-section-list:after
        content:''
        display:block
        clear:both
      li
        display:inline-block
        float:left
        width:25%
        padding-bottom: .3rem
        .nav-icon
          width:.64rem
          height:.64rem
          margin:.2rem auto
          background-repeat: no-repeat
          background-size: 100% 100%
          background-position: center
        .nav-icon-report
          background-image: url('../../../modules/images/nav-icon-report.png')
        .nav-icon-quotation
          background-image: url('../../../modules/images/nav-icon-quotation.png') 
        .nav-icon-material
          background-image: url('../../../modules/images/nav-icon-material.png')
        .nav-icon-history
          background-image: url('../../../modules/images/nav-icon-history.png')
        .nav-icon-file
          background-image: url('../../../modules/images/nav-icon-file.png')
        .nav-icon-carMsg
          background-image: url('../../../modules/images/nav-icon-carMsg.png')    
    .arrow
      width: 100%
      height: .5rem
      margin: .2rem 0
      background: url('../../../modules/images/path.png') no-repeat  
      background-size: contain
      background-position: center
    .path-wrapper
      width: 100%
      font-size: 0
      background: #fff
      ul
        width: 100%
        padding: .2rem .2rem 0
        box-sizing: border-box 
      li
        font-size: 0
        text-align: right
        width: 100%
        padding: 0
        position: relative
        overflow: hidden
        .searchLeft
          display: inline-block
          width: 25%
          vertical-align: top
          font-size: .28rem
          padding-right: 0.15rem
          box-sizing: border-box
          position: absolute
          left: -.7rem
          .searchTime
            display: inline-block
            width: 75%
            color: #a9a9a9
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
          //display: inline-block
          width: 75%  
          vertical-align: top
          padding: .2rem
          box-sizing: border-box
          text-align: left
          font-size: .28rem
          background: #ffffff
          margin-top: .08rem
          border: 1px solid #e6e6e6
          border-radius: 4px
          float: left
          margin-left: 1rem
          p
            width: 100%
            line-height: .45rem
          .grayColor
            color: gray
          .btn
            float: right
            width: 2rem
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            color: #fff
            background: url('../../../modules/images/path-btn-bg.png') no-repeat
            background-size: 100% 100%;
</style>   