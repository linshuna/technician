<template>
    <div class="pickup-order-wrap set-serverTab-default">
        <mt-navbar v-model="type">
        <mt-tab-item id="atServe" class="">
            <div>服务中({{firstnum}})</div>
            <div style="padding-top:.1rem;font-size:.26rem;">{{first | priceFilter}}</div>
        </mt-tab-item>
        <mt-tab-item id="waitPay">
            <div>待结账({{secondnum}})</div>
            <div style="padding-top:.1rem;font-size:.26rem;">{{second | priceFilter}}</div>
        </mt-tab-item>
        <mt-tab-item id="picked">
            <div>已提车</div>
        </mt-tab-item>
        </mt-navbar>

        <div class="search">
            <search-temp setWidthStyle="100" 
              setPlaceholder="请输入车牌号"
              v-on:getSearchValue="gainSearchValue"
              type="search-car"></search-temp>
        <!-- <input v-model="carno" class="search-input" placeholder="请输入车牌号" @click.prevent="showCarKeyCode" readonly/> -->
        </div>
        <!-- tab-container -->
        <mt-tab-container v-model="type">
        <mt-tab-container-item id="atServe">
            <div class="item" v-for="item in atServeOrder" @click="goOrderDetail(item.orderNo,item.carNo)" v-if="atServeOrder.length>0">
            <img class="carImg" :src="item.icon"/>
            <div class="main-c">
                <div class="carno">{{item.carNo}}</div>
                <div class="name">{{item.uname}}</div>
                <div class="itemName">{{item.project}}</div>
                <div class="deliveryTime">预计交车时间 <span>{{item.gettime}}</span></div>
            </div>
            <div class="main-r">
                <div class="type">服务中</div>
                <div class="account">¥{{item.price}}</div>
            </div>
            </div>
            <div class="noData" v-if="atServeOrder.length==0">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">暂无订单</div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="waitPay">
            <div class="item" v-for="item in waitPayOrder" @click="goOrderDetail(item.orderNo,item.carNo)" v-if="waitPayOrder.length>0">
            <img class="carImg" :src="item.icon"/>
            <div class="main-c">
                <div class="carno">{{item.carNo}}</div>
                <div class="name">{{item.uname}}</div>
                <div class="itemName">{{item.project}}</div>
                <div class="deliveryTime">预计交车时间 <span>{{item.gettime}}</span></div>
            </div>
            <div class="main-r">
                <div class="type">待结账</div>
                <div class="account">¥{{item.price}}</div>
            </div>
            </div>
            <div class="noData" v-if="waitPayOrder.length==0">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">暂无订单</div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="picked">
            <div class="item" v-for="item in pickedOrder" @click="goOrderDetail(item.orderNo,item.carNo)" v-if="pickedOrder.length>0">
            <img class="carImg" :src="item.icon"/>
            <div class="main-c">
                <div class="carno">{{item.carNo}}</div>
                <div class="name">{{item.uname}}</div>
                <div class="itemName">{{item.project}}</div>
                <div class="deliveryTime">预计交车时间 <span>{{item.gettime}}</span></div>
            </div>
            <div class="main-r">
                <div class="type grayColor">已提车</div>
                <div class="account">¥{{item.price}}</div>
            </div>
            </div>
            <div class="noData" v-if="pickedOrder.length==0">
            <img class="noDataImg" :src="noDataImg" />
            <div class="text">暂无订单</div>
            </div>
        </mt-tab-container-item>
        </mt-tab-container>
        <!-- <car-key-code v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></car-key-code> -->

    </div>
</template>
<script>
    import carKeyCode from "components/common/carKeyCode.vue"
    import { Toast} from 'mint-ui'
    import searchTemp  from "components/common/searchTemp.vue"
    export default {
        data () {
          return {
              noDataImg: require('modules/images/noData-order.png'),
              type:'atServe',
              carno: '',
              isShow: false,
              atServeOrder: [],
              waitPayOrder: [],
              pickedOrder: [],
              techvid: '',
              first:0,
              firstnum:0,
              second:0,
              secondnum:0
          }
        },
        filters:{
          priceFilter:function(value){
            if(!value) return "￥"+0;
              else return "￥"+value;
          }
        },
        methods:{
            gainSearchValue(value){
                this.carno = value;//回车
                this.getOrderList(value)
            },
            goOrderDetail(orderNo,carNo) {
                window.location.href = `./pickupOrder.html?orderNo=${orderNo}&carNo=${carNo}#/path`
                //this.$router.push('/path')
            },
            getOrderList() {
                this.$http.post('/api.php/TechService/index',{carNo: this.carno,techvid: this.techvid})
                .then((response)=>{
                    let res = response.data;
                    if(res.errorCode == 200){
                      let resData = res.data;
                      this.atServeOrder = resData.service
                      this.waitPayOrder = resData.pay
                      this.pickedOrder = resData.finish
                      this.first = resData.first;
                      this.firstnum = resData.firstnum
                      this.second = resData.seconde
                      this.secondnum = resData.secondnum
                    }
                })
            },
            gainCarno:function(value){//子组件传给当前组件（父组件）
                this.carno = value.carno
                this.tips = value.tips
                if(this.tips&&this.tips!=''){
                Toast(this.tips)
                }else{
                this.getOrderList(this.carno)
                }
            },
            showCarKeyCode() {
                this.isShow = true
            }
        },
        created() {
          let gainTecherData = this.$store.getters.getStorage
          if(!gainTecherData){
            let instance = Toast('请先登录')
            setTimeout(() => {
              instance.close()
              window.location.href = './login.html?returnUrl='+window.location.href
            }, 2000);
          }
          
          let key = 'techerData'
          this.$store.commit('_setName',key)
          let techerDataJson = this.$store.getters.getStorage
          this.techvid = techerDataJson.vid
          this.getOrderList();//调用初始数据
        },
        components:{
            'car-key-code':carKeyCode,
            'search-temp':searchTemp
        }
    }
</script>
<style lang="stylus">
  .mint-tab-container-wrap{
    width: 100%;
    padding: 0 .4rem;
    box-sizing: border-box; 
  }
  .mint-tab-container{
    padding-bottom: .2rem;
  } 
</style>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .grayColor
    color: $gray-color9
  .pickup-order-wrap >>>  .mint-tab-item-label
    font-size: .32rem

  .pickup-order-wrap
    font-family: PingFangSC-Regular
    color: #2c3e50
    .mint-navbar
      position: fixed
      top: 0
      width: 100%
      z-index: 9
      box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
    .search
      font-size: .24rem
      margin:1.6rem .4rem 0
    .item
      overflow: hidden
      font-size: 0.28rem
      padding: 0.2rem
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.10)
      margin-top: .2rem
      .carImg
        width: 1rem
        height: 1rem
        float: left
        padding: .2rem
        box-sizing: border-box  
      .main-c
        float: left
        margin-left: .4rem
        color: #a9a9a9
        line-height: .45rem
        font-size: .26rem
        .carno
          font-size: .28rem
          line-height: .54rem
          color: #2c3e50
      .main-r
        float: right 
        .type
          color: $color-main
          font-size: .28rem
          margin-bottom: .8rem
        .account
          color: #82A0FA
          font-size: 0.28rem
          text-align: right
    .noData
      margin: 2rem
      text-align: center
      .noDataImg
        width: 2rem
      .text
        font-size: .32rem
        color: $color-main      
</style>
