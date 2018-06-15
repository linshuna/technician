<template>
  <div class="customerWrap">
    <div class="setBg">
      <div class="searchWrap">
        <div class="searchLeft">
            <img :src="searchIcon" alt="">
            <input type="text" v-model="searchValue" placeholder="搜索车牌">
        </div> 
        <div class="searchRight">
          <img :src="addIcon" alt="" class="addIcon" @click="addNewCustom">
        </div>
      </div>
      <ul class="searchResult">
          <li class="border-bottom-1px" @click="linkCusDetial(1)">
              <div class="resultLeft">
                <img :src="defaultLogo" alt="">
              </div>
              <div class="resultRight">
                <p class="customMsg">粤A55555</p>
                <p class="remark clearFloat">
                  <span class="fl">车牌类型</span> 
                  <img :src="rightArrowIcon" alt="" class="fr"> 
                </p>
                <a href="tel:15217141012">
                  <span>李小姐</span>
                  <img :src="telIcon" alt="" class="telIcon">
                </a>
              </div>
          </li>
          <li class="border-bottom-1px" @click="linkCusDetial(2)">
              <div class="resultLeft">
                <img :src="defaultLogo" alt="">
              </div>
              <div class="resultRight">
                <p class="customMsg">粤A55555</p>
                <p class="remark clearFloat">
                  <span class="fl">车牌类型</span> 
                  <img :src="rightArrowIcon" alt="" class="fr"> 
                </p>
                <a href="tel:15217141012">
                  <span>李小姐</span>
                  <img :src="telIcon" alt="" class="telIcon">
                </a>
              </div>
          </li>
      </ul>      
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
          searchValue:'',
          searchIcon: require("modules/images/searchIcon.png"),
          defaultLogo: require("modules/images/defaultLogo.png"),
          addIcon: require("modules/images/add-icon.png"),
          telIcon: require("modules/images/telIcon.png"),
          rightArrowIcon: require("modules/images/rightArrow.png"),
      }
    },
    methods:{
      addNewCustom(){
        this.$router.push({path:"/addCarMsg"})
      },
      linkCusDetial(id){
        this.$router.push({path:"/carDetailMsg/"+id})
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
              width:100%
              padding-right: .2rem
              box-sizing: border-box
              img
                display: inline-block
                width: .15rem
                vertical-align: middle
            a
              position: absolute
              top: -.1rem
              right: .32rem
              img.telIcon
                display: inline-block
                width: .35rem
                height: .35rem
                vertical-align: middle 
              span 
                vertical-align: middle    






</style>
