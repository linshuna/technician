<template>
  <div class="check">
    <ul>
      <li class="border-bottom-1px lineH">
        <span class="fl">进店时间</span>  
        <div class="fr">{{gettime | noTipData}}</div>
      </li>
      <li class="border-bottom-1px km">
        <span class="fl">进店里程</span>
        <div class="fr">{{distance | noTipData}}</div>
      </li>
      <li class="border-bottom-1px">
        <div class="fr">上次里程: 0</div>
      </li>
      <li class="border-bottom-1px lineH">
        <span class="fl"> 进店油表</span>
        <div class="fr">{{oil | noTipData}}</div>
      </li>
      <li class="border-bottom-1px lineH">
        <span class="fl"> 预计交车</span>
        <div class="fr">{{gettime | noTipData}}</div>
      </li>
      <li class="border-bottom-1px lineH">
        <span class="fl">车主嘱咐</span>
        <div class="fr">{{remark | noTipData}}</div>
      </li>
    </ul>
  </div>
</template> 
<script>
    export default{
      data(){
        return {
          gettime: '',
          distance: '',
          oil:'',
          remark: '',
          visitime: ''
        }
      },
      filters:{
        noTipData: function(value){
          if(!value) return '暂无';
            else return value;
        }
      },
      methods:{
        init: function(){
          this.$http.get('/api.php/TechService/editsorder?orderNo='+this.orderNo)
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              let resData = res.data;
              this.gettime = resData.gettime;
              this.distance = resData.distance;
              this.oil = resData.oid;
              this.remark = resData.remark;
              this.visitime = resData.visitime;
            }
          })
        }
      }
    }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
  .check
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
    ul 
      width: 100%
      padding-left: .2rem
      box-sizing: border-box
      background: #ffffff
      li
        width: 100%;
        padding: 0.2rem 0
        padding-right: .2rem
        box-sizing: border-box
        overflow: hidden
        line-height: .8rem
      .last
        text-align: right    
        overflow: hidden
      .fr 
        color: $gray-color9 
</style>