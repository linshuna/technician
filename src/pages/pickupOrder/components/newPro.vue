<template>
  <div class="newSever">
    <ul>
      <li class="item">
        <span class="title">
          <span>商品名称</span>
          <span class="star">*</span>
        </span>
        <input class="text" type="text" placeholder="请输入服务名称"/>
      </li>
      <li class="item">
        <span class="title">
          <span>别称</span>
          <span class="star">*</span>
        </span>
        <input class="text" type="text" placeholder="商品别称,车主报价时显示"/>
      </li>
      <li class="item">
        <span class="title">
          <span>商品编码</span>
          <span class="star">*</span>
        </span>  
        <input class="text" type="text" placeholder="请输入商品编码"/>
      </li>
      <li class="item">
        <span class="title">
          <span>分类</span>
          <span class="star">*</span>
        </span>  
        <input class="text" type="text" placeholder="请选择分类"/>
      </li>
      <li class="item">
        <span class="title">
          <span>售价</span>
          <span class="star">*</span>
        </span>  
        <input class="text" type="text" placeholder="请输入服务价格"/>
      </li>
      <li class="item">
        <span class="title">
          <span>成本价</span>
          <span class="star">*</span>
        </span>  
        <input class="text" type="text" placeholder="请输入成本价"/>
      </li>
      <li class="item">
        <span class="title">
          <span>备注</span>
        </span>  
        <input class="text" type="text" placeholder="请输入备注"/>
      </li>
      <li class="item">
        <span class="title">
          <span>单位</span>
        </span>  
        <input class="text" type="text" placeholder="请输入单位"/>
      </li>
      <li class="item">
        <span class="title">
          <span>库存</span>
        </span>  
        <input class="text" type="text" placeholder="请输入库存"/>
      </li>
    </ul>

    <div class="btn">确定</div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        techvid:''
      }
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
      
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'

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
        .title
          display: inline-block
          width: 1.8rem
          .star
            color: red
        .text
          padding: .1rem
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