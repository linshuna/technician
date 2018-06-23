<template>
  <div id="app">
    <div class="search-wrapper">
      <input class="search" type="text" v-model="carno" placeholder="请输入车牌" readonly @focus="isShow=true"/>
      <div class="add-btn"></div>
    </div>
    <div class="result">
      <ul>
        <li class="border-bottom-1px" @click="goQuote">云A11111 <span class="fr name">周 会员</span></li>
        <li class="border-bottom-1px">云A22222</li>
        <li class="border-bottom-1px">云A33333</li>
        <li class="border-bottom-1px">云A66666</li>
      </ul>
    </div>
    <car-key-code v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></car-key-code>
  </div>
</template>

<script>
  import carKeyCode from "components/carKeyCode.vue"
  export default {
    data() {
      return {
        goQuote() {
          window.location.href='./pickupOrder.html#/quotation'
        },
        carno:'',
        isShow: false,
        isLogin: false,
        techvid: ''
      }
    },
    components:{
      'car-key-code':carKeyCode
    },
    created:function(){
      let getStorage = this.$store.getters.getStorage
      if(getStorage){//处于登录状态
        this.isLogin = true
        getStorage = JSON.parse(getStorage)
        this.techvid = getStorage.vid;
      }

    },
    methods:{
      gainCarno:function(value){//子组件传给当前组件（父组件）
        this.carno = value.carno
        this.$http.post("/api.php/TechReck",{carNo:this.carno,vid:this.techvid})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            console.log(res)
          }else{

          }
        })
      }
    }
  }  
</script>

<style lang="stylus">
  @import '~modules/css/variable.styl'

  #app
    font-family: PingFangSC-Regular
    font-size: .28rem
    .search-wrapper
      .search
        width: 80%
        height: .8rem
        padding-left: .8rem
        border: 1px solid #eee
        border-radius: 4px
        margin: .2rem
        background: url('../../modules/images/searchIcon.png') no-repeat
        background-size: 0.4rem
        background-position: .2rem
        box-sizing: border-box
      .add-btn
        width: 0.5rem
        height: 0.5rem
        float: right
        margin: 0.3rem 0.4rem 0 0
        background: url('../../modules/images/add-icon.png') no-repeat
        background-size: 100% 100%
    .result
      li
        height: .8rem
        line-height: .8rem 
        padding: 0 .2rem
        .name
          color: #009fff
</style>
