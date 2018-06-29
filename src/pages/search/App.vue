<template>
  <div id="app">
    <div class="search">
      <input v-model="carno" class="search-input" placeholder="请输入车牌号" @click.prevent="showCarKeyCode"/>
      <div class="add-wrapper" @click="addCar">
        <div class="iconfont">&#xe60c;</div>
        <div class="">新增车辆</div>
      </div>
    </div>
    <ul class="result">
      <li class="item border-bottom-1px" v-for="item in list">
        <div v-if="item.clientvid!=='0'&&item.orderNo==='0'" @click="goDetail(item.carvid,item.clientvid)">{{item.carNo}}<div class="name-wrapper">{{item.uname}}<img class="typeImg" src="../../modules/images/stystem-icon.png" /></div></div>
        <div v-else-if="item.clientvid!=='0'&&item.orderNo!=='0'" @click="goPath(item.carvid,item.clientvid,item.orderNo)">{{item.carNo}}<div class="name-wrapper" v-if="item.clientvid!=='0'&&item.orderNo!=='0'">{{item.uname}}<img class="typeImg" src="../../modules/images/reserve-icon.png" /></div></div>
        <div v-else-if="item.clientvid==='0'" @click="goAdd(item.carvid)">{{item.carNo}}</div>
      </li>
    </ul>

    <div v-if="this.list.length==0&&this.carno!==''" class="no-result">系统不存在该车</div>

    <carKeyCode v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></carKeyCode>
    
  </div>
</template>

<script>
  import carKeyCode from "components/carKeyCode"
  import { Toast} from 'mint-ui'
  import {GetQueryString} from 'modules/js/config.js'
  import Vue from 'vue'
  import vueAxiosPlugin from "modules/js/axiosPrototype.js"
  Vue.use(vueAxiosPlugin)

  export default {
    name: 'App',
    data () {
      return {
        carno: '',
        isShow: false,
        tip: '',
        list: []
      }
    },
    methods: {
      goDetail(carvid,clientvid) { //有客户id 无预约
        window.location.href=`./pickupInfo.html?carvid=${carvid}&clientvid=${clientvid}#/type3`
      },
      goPath(carvid,clientvid,orderNo) { //有客户id有预约
        //接车
        this.$http.post('/api.php/TechMeet/hasOrder',{carvid:carvid,clientvid:clientvid,serviceorder:orderNo,techvid:this.techvid})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              let instance = Toast(res.message)
              setTimeout(() => {
                instance.close()
                window.location.href= `./pickupOrder.html?carvid=${carvid}&clientvid=${clientvid}&orderNo=${orderNo}#/path`
              }, 2000)
            }else{
              Toast(res.message)
            }
          })
      },
      goAdd(carvid) {
        window.location.href= `./pickupInfo.html?carvid=${carvid}#/type2`
      },
      addCar() {
        window.location.href='pickupInfo.html#/type1'
      },
      gainCarno:function(value){//子组件传给当前组件（父组件）
        this.carno = value.carno
        this.tips = value.tips
        if(this.tips&&this.tips!=''){
            Toast(this.tips)
        }
      },
      showCarKeyCode() {
        this.isShow = true
      },
      handleSearchCarno(keyword) {
        this.$http.post('/api.php/TechMeet/search',{carNo:keyword})
          .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            this.list = res.data
          }else{
            Toast(res.message)
          }
        })
      }
    },
    watch: {
      'carno'() {
        this.handleSearchCarno(this.carno)
      }
    },
    components:{
      carKeyCode
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      }
    },
    created() {
      this.carno = decodeURIComponent(GetQueryString('carno')||'')
      this.handleSearchCarno(this.carno)

      let gainTecherData = JSON.parse(this.getStorage);
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  #app >>> .mintui-search
    font-size: .36rem
  #app >>> .mint-searchbar-core
    padding: .2rem
  #app >>> .mint-searchbar
    width: 80%
  #app >>> .mint-searchbar  
    background: none
  #app >>> .mint-searchbar-inner
    border: 1px solid #d9d9d9;
  #app >>> .mint-searchbar-cancel
    display: none  

  #app
    color: #2c3e50
    font-size: .28rem
    .search
      .search-input
        width: 74%
        border: 1px solid #eee
        padding: 0 .8rem
        margin: .2rem
        height: .8rem
        line-height: .8rem
        box-sizing: border-box
        background: url('../../modules/images/searchIcon.png') no-repeat
        background-size: .5rem
        background-position: .2rem
      .add-wrapper
        position: absolute
        right: .2rem
        top: .2rem
        color: $color-main
        text-align: center
    .result
      .item
        padding: 0 .2rem
        height: .8rem
        line-height: .8rem
        .name-wrapper
          float: right
          margin-right: .2rem
          .typeImg
            width: .3rem
            height: .4rem  
            vertical-align: middle
            margin-left: .2rem
    .no-result
      text-align: center
      margin-top: .4rem
      color: $color-main      
</style>
