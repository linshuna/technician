<template>
  <div class="item">
      <div class="name">{{item.name}}</div>
      <div class="code">编码: {{item.code}}</div>
      <div class="account">¥{{item.price}}</div>
      <div class="countBtn-wrapper" v-if="isEditor">
        <div class="reduce" @click.stop="reduceCount(item)">-</div>
        <input class="count-input" type="number" v-model.number="item.num"/>
        <div class="add" @click.stop="addCount(item)">+</div>
      </div>
      <div class="show-num" v-else>
        x {{item.num}}
      </div>
      <p v-show="tranType=='store-list'&&item.sku" class="setSku">库存量：{{item.sku}}</p>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  export default {
    data(){
      return {
      }
    },
    props:{
      item:{type: Object},
      isEditor: {type: Boolean},
      isDel: {type: Boolean},
      tranType: {type:String}
    },
    created: function(){

    },
    methods: {
      addSever() {
        this.$router.push('/addSever')
      },
      addCount(item) {
        item.num++;
        // this.$set(this.techReckList[index],'num',num)
        this.$emit('update:item',item)
      },
      reduceCount(item) {

        if(this.isDel&&item.num<=1){//item.num为0的话，就要删除
          this.$emit('deleteFn')
          return false;
        }
        if(!this.isDel&&item.num<=1){
          return false;
        }   
        item.num--;
        this.$emit('update:item',item)
        
      },
    }
  }
</script>
<style lang="stylus" scoped>
@import '~modules/css/variable.styl'
  .is_selected
    background: #ffe6c1!important
    box-shadow: 0 0 1px 0 rgba(250,158,21,.1)
    color: #fff 
    border-radius: 4px
    .item
      background: #ffe6c1!important
      .account
        color: $color-main!important
      .countBtn-wrapper
        color: $color-main!important
        .count-input
          color: $color-main!important
  .border-bottom-1px::after
    background: #ffffff    
  .item
    font-size: .28rem
    line-height: .5rem
    position: relative
    z-index: 5
    width: 100%
    padding: 0 .2rem
    box-sizing: border-box
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.10)
    margin-bottom: .24rem  
    border-radius: 4px
    background: #fff
    .name
      color: $gray-color3
      font-size: .32rem
    .code  
      color: $gray-color9
      font-size: .24rem
    .account
      color: $color-main
      font-size: .28rem
    .show-num
      position: absolute
      right: .2rem
      bottom: 0 
      color: $gray-color3
    .setSku
      font-size: .22rem  
      color: #bfbfbf
    .countBtn-wrapper
      position: absolute
      right: .2rem  
      bottom: .2rem
      height: .4rem
      line-height: .4rem
      z-index: 1000
      .reduce
        font-size: 0.32rem
        display: inline-block
        vertical-align: middle
      .count-input
        display: inline-block
        width: .48rem
        border: 1px solid #eee
        margin: 0 .2rem
        text-align: center
        padding: 0 .2rem
        font-size: .24rem
        line-height: .4rem
        border-radius: 100px
        vertical-align: middle
      .add
        font-size: 0.32rem
        display: inline-block
        vertical-align: middle
</style>