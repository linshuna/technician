<template>
  <div class="dispath">
    <template v-if="options">
      <mt-radio
        align="right"
        v-model="value"
        :options="options"
        :valye.sync="value">
      </mt-radio>
    </template>
    <template v-else>暂无技师数据>_< </template>
    
    <div class="btn" @click="save">确定</div>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  export default {
    data() {
      return {
        options: [],
        value:'0'
      }
    },
    mounted: function() {
      this.$nextTick(function(){
        this.init()
      })
    },
    methods:{
      init: function(){
        this.$http.get('/api.php/TechService/techs')
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
              if(!res.data) return false;
              this.value = res.data[0].vid
              res.data.map((item,index)=>{
                this.$set(this.options,index,{'label':item.nickname,'value':item.vid})
              })
              console.log(this.options)
          }
        })
      },
      save: function(){
        this.$http.post('/api.php/TechService/techs',{orderNo: this.orderNo,servicevid:this.value})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            Toast('成功派单给技师')
            let url='pickupOrder.html?orderNo='+this.orderNo+'&carNo='+this.carno+'#/path'
            setTimeout(function(){
              window.location.href = url
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
  .dispath >>>.mint-radiolist-title
    margin: 0

  .dispath
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 10
    font-size: .28rem
    background: #f9f9f9
    overflow: scroll
    padding-bottom: .2rem
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