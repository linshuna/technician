<template>
  <div class="item">
      <div>{{item.checkname}}</div>
        <div class="main-c">{{item.descs}}</div>
        <div class="main-r">
          <span class="bad">不良</span>
          <span class="normal active">正常</span>
        </div>
  </div>
</template>
<script>
  export default{
    props:{
      item:{type: Object},
    },
    data(){
      return {

      }
    }
  }  
</script>
<style lang="stylus">
.item
  display: flex
  height: .8rem
  line-height: .8rem
  div
    flex: 1
    text-align: center
  .setFlex
    flex: 2
    text-align: center  
  .main-c
    flex: 2
  .main-r
    text-align: left
    font-size: 0
    .bad
      border-radius:2px 0 0 2px!important
    .normal
      border-radius: 0 2px 2px 0!important
    span
      padding: .1rem
      font-size: .24rem
      border: 1px solid #eee
      &.active
        color: #315cda
        background: #6c95f74d
</style>