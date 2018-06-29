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
      isDel: {type: Boolean}
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
        item.num--;
        if(this.isDel&&item.num<=0){//item.num为0的话，就要删除
          this.$emit('deleteFn')
          return false;
        }
        if(!this.isDel&&item.num<1){
          return false;
        }   

        this.$emit('update:item',item)
        
      },
    }
  }
</script>
<style lang="stylus" scoped>
  .is_selected
    background: #ffe6c1!important
    color: #fff 
    .item
      .account
        color: #fa9e15!important
      .countBtn-wrapper
        color: #fa9e15!important
        .count-input
          color: #fa9e15!important
  .border-bottom-1px::after
    background: #ffffff    
  .item
    font-size: .28rem
    line-height: .6rem
    position: relative
    z-index: 5
    padding: 0 0.2rem  
    .name
      font-size: .32rem
    .account
      color: #0087ff
    .show-num
      position: absolute
      right: .2rem
      bottom: 0 
    .countBtn-wrapper
      position: absolute
      right: .2rem  
      bottom: .2rem
      height: .4rem
      line-height: .4rem
      z-index: 1000
      .reduce
        float: left
        font-size: .32rem
      .count-input
        float: left
        width: .48rem
        border: 1px solid #eee
        margin: 0 .2rem
        text-align: center
        padding: 0 .2rem
        font-size: .24rem
        line-height: .4rem
      .add
        float: left
        font-size: .32rem
</style>