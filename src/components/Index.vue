<template>
  <div class="index">
    <div class="swiper-wrapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img class="swiper-img" :src="bannerImg" >
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="data">
      <ul>
        <li class="item">
          <div class="num">{{money | priceFilter}}</div>
          <div class="desc">今日收入</div>
        </li>
        <li class="item">
          <div class="num">{{order}}</div>
          <div class="desc">今日预约</div>
        </li>
        <li class="item">
          <div class="num">{{num}}</div>
          <div class="desc">未交车辆</div>
        </li>
        <li class="item">
          <div class="num">{{numtwo}}</div>
          <div class="desc">今日订单</div>
        </li>
      </ul>
    </div>

    <div class="nav-section commen-width">
      <ul class="nav-section-list">
        <li v-for="(nav,index) in navData" :key="index">
          <a :href="nav.link">
            <div class="nav-icon" :class="nav.className"></div>
            <p>{{nav.name}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        bannerImg: require('modules/images/banner.jpg'),
        navData: [
          {
            link: './reservedOrder.html',
            className:'nav-icon-reserve',
            name:'预约单'
          },
          {
            link:'./pickupOrder.html',
            className:'nav-icon-pickup',
            name:'接车单'
          },
          {
            link:'./quote.html',
            className:'nav-icon-quote',
            name:'快速报价'
          },
          {
            link:'',
            className:'nav-icon-recharge',
            name:'充值优惠'
          },
          {
            link:'./index.html#/customer',
            // link:'/customer',
            className:'nav-icon-customer',
            name:'我的客户'
          },
          {
            link:'./carDetail.html',
            className:'nav-icon-carManage',
            name:'车辆管理'
          },
          {
            link:'./store.html',
            className:'nav-icon-storeManage',
            name:'仓库管理'
          },
          {
            link:'',
            className:'nav-icon-bill',
            name:'我的账单'
          }
        ],
        techvid:0,
        money: 0,
        num: 0,
        numtwo: 0,
        order: 0
      }
    },
    filters:{
      priceFilter: function(value){
        if(!value) return 0
          else return (value-0).toFixed(1)
      }
    },
    created: function(){
      let key = 'techerData'
      this.$store.commit('_setName',key)
      let techerDataJson = this.$store.getters.getStorage
      if(techerDataJson){
        this.techvid = techerDataJson.vid
        this.init();//初始数据
      }
      
    },
    methods: {
      init: function(){
        this.$http.post('/api.php/Tech/indexs',{techvid: this.techvid})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
              let resData = res.data;
              this.money = resData.money;
              this.num = resData.num;
              this.numtwo = resData.numtwo;
              this.order = resData.order;
          }
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .index
    .swiper-wrapper
      height: 3.7rem
      .swiper-img
        width: 100%
        height: 3.7rem
    .data
      display: flex
      border-bottom: 1px solid #eee
      ul
        align-items: center
        display: flex
        flex-direction: row 
        width: 100%;
        height: 1.74rem
        .item:not(:nth-last-child(1))
          border-right 1px solid #eee 
        .item
          flex: 1
          .num
            font-family: PingFangSC-Light
            font-size: .6rem
            color: rgba(30,30,30,0.90)
            letter-spacing: 0.9px
            margin-bottom: .1rem
          .desc
            font-family: PingFangSC-Regular
            font-size: .22rem
            color: rgba(30,30,30,0.50)
            letter-spacing: 0.33px
    .nav-section
      padding: .6rem 0
      .nav-section-list
        padding: 0 .3rem
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
          width:.84rem
          height:.84rem
          margin:.2rem auto
          background-repeat: no-repeat
          background-size: 100% 100%
          background-position: center
        p
          font-size: 0.28rem
        .nav-icon-reserve
          background-image: url('../modules/images/nav-icon-reserve.png')
        .nav-icon-pickup
          background-image: url('../modules/images/nav-icon-pickup.png') 
        .nav-icon-quote
          background-image: url('../modules/images/nav-icon-quote.png')
        .nav-icon-recharge
          background-image: url('../modules/images/nav-icon-recharge.png')
        .nav-icon-customer
          background-image: url('../modules/images/nav-icon-customer.png')
        .nav-icon-carManage
          background-image: url('../modules/images/nav-icon-carManage.png') 
        .nav-icon-storeManage
          background-image: url('../modules/images/nav-icon-storeManage.png')
        .nav-icon-bill
          background-image: url('../modules/images/nav-icon-bill.png')                        
</style>