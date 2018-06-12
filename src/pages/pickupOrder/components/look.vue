<template>
  <div class="check">
    <ul>
      <li class="border-bottom-1px lineH">进店时间
        <div class="fr">2018-06-04 12:30</div>
      </li>
      <li class="border-bottom-1px km">进店里程
        <div class="fr">1</div>
        <div class="last">上次里程: 0</div>
      </li>
      <li class="border-bottom-1px lineH">进店油表
        <div class="fr">1/4</div>
      </li>
      <li class="border-bottom-1px lineH">预计交车
        <div class="fr">2018-06-09 12:08</div>
      </li>
      <li class="border-bottom-1px lineH">车主嘱咐
      </li>
    </ul>
  </div>
</template>
<script>
  
</script>
<style lang="stylus" scoped>
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
    li
      padding: 0 .2rem
    .lineH
      height: .8rem
      line-height: .8rem
    .km
      height: 1.6rem
      line-height: .8rem
    .last
      text-align: right    
</style>