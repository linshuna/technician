<template>
  <div class="item">
      <div>{{item.checkname}}</div>
        <div class="main-c">{{item.descs}}</div>
        <div class="main-r">
          <span :class="{'active':!item.bol}" class="bad" @click="changeBol">不良</span>
          <span :class="{'active':item.bol}" class="normal" @click="changeBol">正常</span>
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
    },
    created:function(){
      // console.log(this.item)
    },
    methods:{
      changeBol: function(){
          this.item.bol = !this.item.bol
          this.$emit('setChangeItem',this.item)
      }
    }
  }  
</script>
<style lang="stylus" scoped>
@import '~modules/css/variable.styl'
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
      color: $gray-color9
    .normal
      border-radius: 0 2px 2px 0!important
    span
      padding: .05rem 0.1rem
      font-size: .24rem
      border: 1px solid #eee
      &.active
        color: #ffffff
        background: $color-main
</style>