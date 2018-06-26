<template>
  <div class="addSever">
    <input class="search" placeholder="搜索服务名称/编码"/>
    <div class="item-wrapper">
      <div class="item border-bottom-1px" v-for="(item,index) in techReckList" :key="index" 
        :class="{'is_selected':item.bol}" @click="item.bol=!item.bol">
        <div class="name">{{item.name}}</div>
        <div class="code">编码: {{item.code}}</div>
        <div class="account">¥{{item.price}}</div>
        <div class="countBtn-wrapper">
          <div class="reduce" @click="reduceCount(index,item.num)">-</div>
          <input class="count-input" type="number" v-model.number="item.num"/>
          <div class="add" @click="addCount(index,item.num)">+</div>
        </div>
      </div>
    </div>

    <div class="btn-wrapper">
      <div class="btn border-right-1px" @click="newSever">新增</div>
      <div class="btn">保存</div>
    </div>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  export default {
    data() {
      return {
        sevQty:'1',
        techReckList:[],
        searchCon:''
      }
    },
    created:function(){
        this.init('')
    },
    methods: {
      init(con){
        this.$http.post('/api.php/TechReck/lists',{search:con})
        .then((response)=>{
          let res = response.data
          if(res.errorCode == 200){
            this.techReckList = res.data
            this.techReckList.map((item,index)=>{
              this.$set(item,'num',1)
              this.$set(item,'bol',false)
            })
            
          }else{
            Toast(res.message)
          }
        })
      },
      newSever() {
        this.$router.push('/newSever')
      },
      addCount(index,num) {
        num++;
        this.$set(this.techReckList[index],'num',num)
      },
      reduceCount(index,num) {
        num--;
        if(num<1){
          return false;
        }
        this.$set(this.techReckList[index],'num',num)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

  .addSever
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 11
    font-size: .28rem
    background: #fff
    .search
      width: 90%
      height: .8rem
      padding: .1rem
      padding-left: .8rem
      box-sizing: border-box
      border: 1px solid #eee
      position: absolute
      left: .3rem
      top: .2rem
      background: url('../../../modules/images/searchIcon.png') no-repeat
      background-size: .5rem .5rem
      background-position: .2rem
    .item-wrapper
      margin-top: 1.4rem 
      .is_selected
        background: #ffe6c1!important
        color: #fff 
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
        padding: 0 0.2rem  
        .name
          font-size: .32rem
        .account
          color: #0087ff
        .countBtn-wrapper
          position: absolute
          right: .2rem  
          bottom: .2rem
          height: .4rem
          line-height: .4rem
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
    .btn-wrapper
      position: fixed
      bottom: 0
      width: 100%
      height: .8rem
      line-height: .8rem
      background: $color-main
      .btn
        width: 50%
        float: left  
        color: #fff
        text-align: center        
</style>