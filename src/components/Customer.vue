<template>
  <div class="customerWrap">
    <div class="setBg">
      <div class="searchWrap">
      <div class="searchLeft">
            <img src="../modules/images/searchIcon.png" alt="">
            <input type="text" v-model="searchValue" placeholder="搜索姓名、手机号">
        </div> 
        <div class="searchRight">
          <img src="../modules/images/add-icon.png" alt="" class="addIcon" @click="addNewCustom">
        </div>
      </div>
      <ul class="searchResult">
          <li class="border-bottom-1px">
              <div class="resultLeft">
                <img src="../modules/images/defaultLogo.png" alt="">
              </div>
              <div class="resultRight">
                <p class="customMsg">李小姐<img src="../modules/images/girlIcon.png" alt="" class="sexType"></p>
                <p class="remark">备注</p>
                <a href="tel:15217141012">
                  <img src="../modules/images/telIcon.png" alt="" class="telIcon">
                </a>
              </div>
          </li>
          <li class="border-bottom-1px">
              <div class="resultLeft">
                <img src="../modules/images/defaultLogo.png" alt="">
              </div>
              <div class="resultRight">
                <p class="customMsg">李小姐<img src="../modules/images/girlIcon.png" alt="" class="sexType"></p>
                <p class="remark">备注</p>
                <a href="tel:15217141012">
                  <img src="../modules/images/telIcon.png" alt="" class="telIcon">
                </a>
              </div>
          </li>
      </ul>      
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
          searchValue:''
      }
    },
    methods:{
      addNewCustom(){
        window.location.href = "addNewCustom.html"
      }
    }
  }
</script>
<style lang="stylus">
  .customerWrap
    width: 100%
    height 100vh
    position fixed
    top 0
    left 0
    background #f4f4f4
    .setBg
      width: 100%
      background #ffffff
      .searchWrap 
        width:100%
        padding-left: .2rem
        box-sizing: border-box
        font-size: 0
        padding-top: .2rem
        .searchLeft,.searchRight
          display: inline-block
          font-size: .28rem
        .searchLeft
          width: 85%
          vertical-align: middle
          text-align: left
          border: 1px solid #f4f4f4
          border-radius: 5px
          padding: .15rem .2rem
          box-sizing: border-box
          img 
            display: inline-block
            width: .35rem
            vertical-align: middle
          input 
            display: inline-block
            width: 90%
            vertical-align: middle
        .searchRight
          width: 15%  
          vertical-align: middle
          text-align: center
          img 
            width: .6rem
            height: .6rem
      .searchResult
        width: 100%
        width:100%
        padding-left:.32rem
        box-sizing: border-box
        li
          font-size: 0
          padding: .32rem 0
          .resultLeft,.resultRight
            display: inline-block
            font-size: .28rem
            vertical-align: top
          .resultLeft
            width: 15%
            img
              display: inline-block
              width: 1rem
              height: 1rem
          .resultRight
            width: 85%
            position: relative
            color: #999
            text-align: left
            padding-left: .32rem
            box-sizing: border-box
            .customMsg
              width: 100%
              .sexType 
                display: inline-block
                width: .3rem
                height: .3rem
                margin-left: .15rem
            .remark
              color: #FA9E15
              margin-top: .3rem
            a
              position: absolute
              top: 0
              right: .32rem
              img.telIcon
                display: inline-block
                width: .5rem
                height: .5rem






</style>
