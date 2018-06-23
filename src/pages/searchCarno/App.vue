<template>
  <div id="app">
    <div class="search">
      <input v-model="keyword" class="search-input" placeholder="搜索姓名/手机号" @keyup="search"/>
      <div class="add-wrapper" @click="addCar">
        <div class="iconfont">&#xe60c;</div>
        <div class="">新增车辆</div>
      </div>
    </div>
    <ul class="result">
      <li class="item border-bottom-1px" v-for="item in list" @click="hanleItemClick(item.clientvid)">{{item.uname}}<span class="phone">{{item.phone}}</span></li>
    </ul>

    
  </div>
</template>

<script>
  import { Toast, MessageBox} from 'mint-ui';
  import Vue from 'vue'
  import vueAxiosPlugin from "modules/js/axiosPrototype.js"
  Vue.use(vueAxiosPlugin)
  import {GetQueryString} from 'modules/js/config.js'

  export default {
    name: 'App',
    data () {
      return {
        keyword: '',
        carvid: '',
        clientvid:'',
        techvid: null,
        timer: null,
        list: []
      }
    },
    methods: {
      addCar() {
        window.location.href='./carDetail.html#/addCarMsg'
      },
      search() {
        this.$http.post('/api.php/TechOrder/orderAddUser',{search: this.keyword})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              console.log(res.data);
              this.list = res.data
            }else{
              Toast(res.message)
            }
          })
      },
      hanleItemClick(clientvid) {
        this.clientvid = clientvid
        MessageBox.confirm('确定绑定该客户吗?').then(action => {
        this.$http.post('/api.php/TechOrder/carAddClient',{clientvid: this.clientvid,carvid:this.carvid,techvid:this.techvid})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              console.log(res.data);
              Toast(res.message)
            }else{
              Toast(res.message)
            }
          })
        },()=>{
          
        });
      }
    },
    computed:{
      getStorage(){
        return this.$store.getters.getStorage;
      }
    },
    created() {
      this.search()
      this.carvid = GetQueryString('carvid')
      let gainTecherData = JSON.parse(this.getStorage);
      if(gainTecherData){
        this.techvid = gainTecherData.vid;
      }else{
        
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
        .phone
          float: right
          color: #b3b3b3
</style>
