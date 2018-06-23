<template>
  <div class="newCar">
    <new-car v-on:gainCarMsg="gainNewCarMsg" :routeCarId="carId"></new-car> 
    
    <button class="saveBtn" @click="saveMsg">保存</button>
  </div>
</template>

<script>
import newCar from "components/carPublic/bindNewCar"
import {GetQueryString} from 'modules/js/config.js'
import {Toast,MessageBox} from 'mint-ui' 
export default {
  name: 'App',
  data(){
    return {
      clientvid:'',
      gainData: null,
      carId:0,
      carNo: null
    }
  },
  components:{
    'new-car':newCar
  },
  created: function(){
    let clientvid = GetQueryString('cusId');
    this.clientvid = clientvid?clientvid:'';
    let carId = this.$route.params.carId;
    this.carId = carId?carId:''; 
    let carNo = this.$route.params.carNo;
    this.carNo = carNo?carNo:''; 
    console.log(carId)
  },
  mounted: function(){
    
    this.$nextTick(function(){

    })
    
  },
  computed:{
    
  },
  methods:{
    gainNewCarMsg(value){//获取传回来的车辆信息,是一个对象
      this.gainData = value
    },
    saveMsg:function(){
      if(!this.gainData){
        Toast("请输入车牌号");
        return false;
      }
      let carNo = this.gainData.carNo;
      let vin = this.gainData.vin;
      if(!carNo){
        Toast("请输入车牌号");
        return false;
      }
      if(this.gainData&&vin.length>0&&vin.length<17){
        Toast('请输入完整车架号');
        return false;
      }
      this.gainData.clientvid = this.clientvid;
      let httpUrl = '',
          tipMsg = '',
          message = '';
      if(this.carId&&this.carId!=0){//编辑修改车辆信息
          httpUrl = '/api.php/TechSysClient/editcar';
          tipMsg = '是否确定保存已修改的车辆信息?'
          this.gainData.carvid = this.carId;
          message = '成功修改车辆信息'
      }else{//新增车辆
          httpUrl = '/api.php/TechSysClient/addNewCar';
          tipMsg = '是否确定新增车辆?'
          message = '绑定成功'
      }
      MessageBox.confirm(tipMsg,'').then(action => {
        this.$http.post(httpUrl,this.gainData)
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            Toast(message);
            let clientvid = this.clientvid
            setTimeout(function(){
              window.location.href = "customerDetail.html?cusId="+clientvid
            },1000)
          }else{
            Toast(res.message)
          }
        })
      })
      
    }
    
  }
}
</script>

<style lang="stylus">
  .newCar
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #f4f4f4  
    .saveBtn
      width: 100%
      height: .7rem
      border: none
      position: fixed
      bottom:0
      left: 0
      width: 100%
      background: #FA9E15
      color: #ffffff
      font-size: .28rem

</style>
