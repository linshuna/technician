<template>
  <div class="newSever">
    <template v-if="techvid">
      <ul>
        <li class="item">
          <span class="title">
            <span>服务名称</span>
            <span class="star">*</span>
          </span>
          <input class="text" type="text" placeholder="请输入服务名称" v-model="name"/>
        </li>
        <li class="item">
          <span class="title">
            <span>服务编码</span>
            <span class="star">*</span>
          </span>  
          <input class="text" type="text" placeholder="请输入服务编码" v-model="code"/>
        </li>
        <li class="item">
          <span class="title">
            <span>分类</span>
            <span class="star">*</span>
          </span>  
          <input class="text" type="text" placeholder="请选择分类" v-model="pid"/>
        </li>
        <li class="item">
          <span class="title">
            <span>售价</span>
            <span class="star">*</span>
          </span>  
          <input class="text" type="number" placeholder="请输入服务价格" v-model="price"/>
        </li>
        <li class="item">
          <span class="title">
            <span>成本价</span>
            <span class="star">*</span>
          </span>  
          <input class="text" type="number" placeholder="请输入成本价" v-model="pprice"/>
        </li>
        <li class="item">
          <span class="title">
            <span>备注</span>
          </span>  
          <input class="text" type="text" placeholder="请输入备注" v-model="descs"/>
        </li>
        <li class="item">
          <span>状态(启用服务)</span>
          <mt-switch :value.sync="value" @change="changeSwitch"></mt-switch>
        </li>
      </ul>  
    </template>
    <template v-else>
      <no-login-tip></no-login-tip>
    </template>

    <div class="btn" @click="addServer">确定</div>
  </div>
</template>
<script>
  import NoLoginTip from "components/NoLoginTip.vue"
  import Vue from "vue"
  import { Switch,Toast } from 'mint-ui';
  Vue.component(Switch.name, Switch);
  import {GetQueryString} from 'modules/js/config.js'
  export default{
    data(){
      return{
          techvid:'',          
          name: '',
          code: '',
          pid: '',
          price: '',
          pprice: '',
          descs:'',
          value: false,
          // carno:'',
          // reckorderNo:'',
          addTempProDataJson:{},
          // orderNo:''
      }
    },
    components:{
      'no-login-tip':NoLoginTip
    },
    created:function(){
      
    },
    mounted: function(){
      this.$nextTick(function(){
        let keys = 'techerData';
        this.$store.commit("_setName",keys);//重新设置获取自己想要的对象
        let getTechStorage = this.$store.getters.getStorage;
        this.techvid = getTechStorage?getTechStorage.vid:'';

      })
      
    },
    methods:{
      changeSwitch(){//改变switch的value值
        this.value = !this.value
      },
      addServer(){
          let _this = this;
          let addTempProDataArr = {};
          let addTempProData = {};
          addTempProData.techvid = this.techvid
          addTempProData.name = this.name
          addTempProData.code = this.code
          addTempProData.pid = this.pid
          addTempProData.price = this.price
          addTempProData.pprice = this.pprice
          addTempProData.descs = this.descs
          addTempProData.status = this.value?1:0;
          let reqHttp = '';
          let key = ''
          if(this.orderNo){
            key = 'addTempSerData';
            reqHttp = '/api.php/TechService/addTempProject';
          }else{
            key = 'addTempProData';
            reqHttp = '/api.php/TechReck/addTempProject';
          }
          this.$store.commit('_setName',key)
          let getStorage = this.$store.getters.getStorage;
          if(getStorage){//如果本地是存在这个数据的话，就得累加
              this.addTempProDataJson = getStorage
          }
          let objLen = Object.keys(this.addTempProDataJson).length
          this.$http.post(reqHttp,addTempProData)
          .then((response)=>{
              let res = response.data
              Toast(res.message)
              if(res.errorCode == 200){
                addTempProData.types = res.data.types;
                addTempProData.id = res.data.projectid;
                addTempProData.num = 1;//默认是有一个数量
                this.$set(this.addTempProDataJson,objLen,addTempProData)//把数据追加到原来的数据里边
                this.$store.commit('_setStorage',this.addTempProDataJson)  
                setTimeout(function(){
                  if(_this.orderNo){
                    window.location.href = "pickupOrder.html?carno="+_this.carno+"&orderNo="+_this.orderNo+"&reckorderNo="+_this.reckorderNo+"#/addSever"
                  }else{
                    window.location.href = "pickupOrder.html?carno="+_this.carno+"&reckorderNo="+_this.reckorderNo+"#/addSever"
                  }
                  
                },500)

              }
          })


      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .newSever
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 12
    font-size: .28rem
    background: #f9f9f9
    ul
      background: #fff
      padding: 0 .2rem
      .item
        height: 1rem
        line-height: 1rem
        .title
          display: inline-block
          width: 1.8rem
          .star
            color: red
        .text
          width: 60%
          padding: .15rem 0.1rem
          border: 1px solid #eee
        .mint-switch
          display: inline-block
          float: right
          margin-top: .2rem
     .btn
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main             
</style>