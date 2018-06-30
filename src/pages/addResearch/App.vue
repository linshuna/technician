<template>
  <div id="app">
    <div class="search">
      <input v-model="carno" class="search-input" placeholder="请输入车牌号" @click.prevent="showCarKeyCode" readonly/>
      <div class="add-wrapper" @click="addCar">
        <div class="iconfont">&#xe60c;</div>
        <div class="">新增车辆</div>
      </div>
    </div>
    <ul class="result">
      <li class="item border-bottom-1px" v-for="item in list" @click="hanleItemClick(item.clientvid,item.uname,item.carNo,item.carvid)">{{item.carNo}}<span class="name" v-show="item.clientvid!=='0'">{{item.uname}}</span></li>
    </ul>

    <car-key-code v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></car-key-code>
    
  </div>
</template>

<script>
  import carKeyCode from "components/common/carKeyCode"
  import { Toast} from 'mint-ui'
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
        timer: null,
        list: []
      }
    },
    methods: {
      addCar() {
        window.location.href='./carDetail.html#/addCarMsg'
      },
      gainCarno:function(value){//子组件传给当前组件（父组件）
        this.carno = value.carno
        this.tips = value.tips
        if(this.tips&&this.tips!=''){
            Toast(this.tips)
        }else{
          this.searchCarno(this.carno)
        }
      },
      showCarKeyCode() {
        this.isShow = true
      },
      searchCarno(carno) {
        console.log('carno'+carno)

      },
      hanleItemClick(id,name,carno,carvid) {
        if(id!=='0'){
          window.location.href = './editReservedOrder.html?type=add&clientvid='+id+'&name='+encodeURIComponent(name)+'&carno='+encodeURIComponent(carno)+'&carvid='+carvid//去新增
        }else{
          window.location.href = './searchCarno.html?carvid='+ carvid+'&carno='+encodeURIComponent(carno)
        }
      }
    },
    watch: {
      carno() {
        if(!this.carno){
          this.list = [];
          return;
        }
        this.$http.post('/api.php/TechOrder/carNo',{carNo: this.carno})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              console.log(res.data);
              this.list = res.data
            }else{
              Toast(res.message)
            }
          })
      }
    },
    components:{
      'car-key-code':carKeyCode,
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
        .name
          float: right
</style>
