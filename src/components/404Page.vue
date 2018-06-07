<template>
  <div class="notFound">
    
    <div class="empty-img">
      <div class="iconfont icon-yemianbucunzai">
      </div>
    </div>
    <div class="desc">您访问的页面走丢了...</div>
    <p class="toIndex-btn"><a href="/">返回首页</a></p>
  </div>
</template>
<script>
  import {changeTitle} from 'modules/js/config'

  export default{
    created(){
    	changeTitle('404');
    }
  }
</script>
<style lang="stylus">
  .notFound
    position: absolute
    top: 10%
    width:  100%
    .empty-img
      line-height: 4rem
      height: 4rem
      color:  #999
      .icon-yemianbucunzai
        font-size: 2rem
    .desc
      font-size: .34rem;
      margin-bottom: .6rem;
      color: #7e8c8d;    
    .toIndex-btn
      width:  90%;
      margin: 0 auto
      font-size: .36rem
      border: 1px solid #eee
      border-radius: 2px
      padding: .2rem 0
</style>
