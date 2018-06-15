<template>
  <div class="newCar">
    <new-car v-on:gainCarMsg="gainNewCarMsg"></new-car>
    <button class="saveBtn" @click="saveMsg">保存</button>
  </div>
</template>

<script>
import newCar from "components/carPublic/bindNewCar"
export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components:{
    'new-car':newCar
  },
  methods:{
    gainNewCarMsg(value){//获取传回来的车辆信息,是一个对象
        console.log(value)
    },
    
    saveMsg:function(){
      console.log(this.cusNameVaule)
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
