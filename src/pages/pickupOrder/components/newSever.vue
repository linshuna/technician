<template>
  <div class="newSever">
    <template v-if="techvid">
      <ul>
        <template v-if="type=='store-list'">
          <li class="item">
            <span class="title">
              <span>商品名称</span>
            </span>
            <input class="text" type="text" placeholder="请输入商品名称" v-model="goodname"/>
          </li>
          <li class="item">
            <span class="title">
              <span>商品别称</span>
              <span class="star">*</span>
            </span>  
            <input class="text" type="text" placeholder="商品别称,车主报价时显示" v-model="name"/>
          </li>
          <li class="item">
            <span class="title">
              <span>厂商类型</span>
              <span class="star">*</span>
            </span>  
            <input @click="cusLabel('storeClassic')" class="inp" placeholder="请选择厂商类型" readonly v-model="checkedStoreClassicName">
            <mt-popup v-model="popupVisible" position="bottom">
              <div class="picker-toolbar">  
                  <span class="mint-datetime-cancel" @click="cancle">取消</span>  
                  <span class="mint-datetime-confirm" @click="select">确定</span>  
              </div>  
              <mt-picker ref='pickerObj' :slots="slots" valueKey="name"></mt-picker>
            </mt-popup>
          </li>
          <li class="item">
            <span class="title">
              <span>商品编码</span>
              <span class="star">*</span>
            </span>  
            <input class="text" type="text" placeholder="请输入商品编码" v-model="code"/>
          </li>
        </template>
        <template v-else>
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
        </template>
        
        <li class="item">
          <span class="title">
            <span>分类</span>
            <span class="star">*</span>
          </span>  
          <input @click="cusLabel('classic')" class="text" type="text" placeholder="请选择分类" v-model="checkedClassicName" readonly/>
          <mt-popup v-model="popupVisible" position="bottom">
              <div class="picker-toolbar">  
                  <span class="mint-datetime-cancel" @click="cancle">取消</span>  
                  <span class="mint-datetime-confirm" @click="select">确定</span>  
              </div>  
              <mt-picker ref='pickerObj' :slots="slots" valueKey="name" @change="onValuesChange"></mt-picker>
          </mt-popup>
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
        <li class="item" v-show="type=='store-list'">
          <span class="title">
            <span>单位</span>
          </span>  
          <input class="text" type="text" placeholder="请输入单位"/>
        </li>
        <li class="item" v-show="type=='store-list'">
          <span class="title">
            <span>库存</span>
          </span>  
          <input class="text" type="text" placeholder="请输入库存"/>
        </li>
        <li class="item">
          <span>状态(启用服务)</span>
          <mt-switch :value.sync="value" @change="changeSwitch"></mt-switch> 
        </li>
      </ul> 
      <div class="btn" @click="addServer">确定</div>
    </template>
    <template v-else>
      <no-login-tip></no-login-tip>
    </template>

    
  </div>
</template>
<script>
  import NoLoginTip from "components/common/NoLoginTip.vue"
  import Vue from "vue"
  import { Switch,Toast } from 'mint-ui';
  Vue.component(Switch.name, Switch);
  import {GetQueryString} from 'modules/js/config.js'
  export default{
    data(){
      return{
          techvid:'',          
          name: '',
          goodname:'',
          code: '',
          pid: '',
          price: '',
          pprice: '',
          descs:'',
          value: true,
          addTempProDataJson:{},
          checkedStoreClassicName:'',
          popupVisible: false,
          slots: [{defaultIndex:0}],//picker选择框数据
          storeClassicData:['原厂原装','国内品牌','国外品牌','副厂'],//厂商类型
          classicData:[],//分类
          checkedClassicName:'',
          currentPickerId:'',
          type:'',
          setName:'',
          errors:[]
      }
    },
    components:{
      'no-login-tip':NoLoginTip
    },
    created:function(){
      this.type = this.$route.params.type;
      //命名或者提示需要用到的差别
      if(this.type == 'store-list') this.setName='商品'
        else this.setName='服务'
      //获取分类的数据 storeTypeData
      //******获取请求接口类型的不同路径，不同数据表*******
      let reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/cats'
      this.$http.get(reqHttp)
      .then((response)=>{
        let res = response.data;
        if(res.errorCode == 200){
          res.data.map((item,index)=>{
            this.classicData.push({name:item.name,value:item.id})
          })
        }else{
          this.classicData.push({name:'暂无分类',value:''})
        }
      })
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
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      cusLabel(type){//职业类型选择框
        this.popupVisible=true;//激活picker组件
        this.currentPickerId = type;//选中的状态
        let gainData = null;
        if(type=='storeClassic') gainData=this.storeClassicData
          else gainData=this.classicData
        this.slots=[{
              defaultIndex:0,
              flex: 1,
              values: gainData,//职业类型
              textAlign: 'center'
        }];
      },
      cancle:function(){
        this.popupVisible=false;
      },
      select:function(type){
        let pickerVal = this.$refs.pickerObj.getValues();
        if(this.currentPickerId=='storeClassic'){
          this.checkedStoreClassicName = pickerVal[0];
        } else{
          this.checkedClassicName = pickerVal[0].name;
          this.pid = pickerVal[0].value;
        }
        this.popupVisible=false;
      },
      changeSwitch(){//改变switch的value值
        this.value = !this.value
      },
      addServer(e){
          this.$store.dispatch('delToast')
          if(!this.name){
            if(this.type=='store-list') Toast(this.setName+"别称是必填项");
              else Toast(this.setName+"名称是必填项")
            return false;
          } 
          if(this.type=='store-list'&&!this.checkedStoreClassicName) {Toast("厂商类型是必填项");return false;}
          if(!this.code) {Toast(this.setName+"编码是必填项"); return false;}
          if(!this.pid) {Toast("分类是必填项");return false;}
          if(!this.price) {Toast("售价是必填项");return false;}
          if(!this.pprice) {Toast("成本价是必填项");return false;}
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
          //******获取请求接口类型的不同路径，不同数据表*******
          let reqHttp =''
          if(this.type==this.storeList) reqHttp = '/api.php/TechScience/addTempScience'
            else reqHttp = '/api.php/'+this.getQuoteName(this.type)+'/addTempProject'

          let key = ''
          if(this.type=='pick-up-list'){
            key = 'addTempSerData';
          }else if(this.type=='store-list'){
            key = 'addTechScience';
            //如果是领料报价的话，得多加参数
            addTempProData.goodname = this.goodname
            addTempProData.classic = this.checkedStoreClassicName
          }else{
            key = 'addTempProData';
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
              if(res.errorCode == 200){
                Toast('成功添加'+this.setName)
                addTempProData.types = res.data.types;
                addTempProData.id = res.data.projectid;  
                addTempProData.num = 1;//默认是有一个数量
                this.$set(this.addTempProDataJson,objLen,addTempProData)//把数据追加到原来的数据里边
                this.$store.commit('_setStorage',this.addTempProDataJson)  
                setTimeout(function(){
                  if(_this.type=='quick-quote'){
                    window.location.href = "pickupOrder.html?carno="+_this.carno+"#/addSever/"+_this.type
                  }else{
                    window.location.href = "pickupOrder.html?carno="+_this.carno+"&orderNo="+_this.orderNo+"#/addSever/"+_this.type
                  }
                },500)
              }else{
                Toast(res.message)
              }
          })


      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .grayColor
    color: gray
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
        input
          display: inline-block
          width: 70%
          border:1px solid #f4f4f4
          border-radius: 5px 
          padding: .2rem 0 .2rem .1rem
          box-sizing:border-box     
        .title
          display: inline-block
          width: 1.8rem
          .star
            color: red
        .mint-popup
          width: 100%
          .picker-toolbar
            width: 100%
            padding: 0 10px
            box-sizing: border-box
            color: #26a2ff
          .picker
            width: 100%  
        .text
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