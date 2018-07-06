<template>
  <div class="selfCenter">
    <ul>
      <li class="border-bottom-1px userLogo">
        <span>头像</span>
        <div class="selfRight">
          <img :src="getStorage.headimg" alt="" class="defaultLogo">
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>用户名</span>
        <div class="selfRight">
          <span class="grayColor">{{getStorage.username}}</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>昵称</span>
        <div class="selfRight">
          <span class="grayColor">{{getStorage.nickname}}</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li class="border-bottom-1px">
        <span>性别</span>
        <div class="selfRight">
          <span class="grayColor" v-if="getStorage.sex==0">保密</span>
          <span class="grayColor" v-else-if="getStorage.sex==1">男</span>
          <span class="grayColor" v-else>女</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
      <li>
        <span>出生日期</span>
        <div class="selfRight">
          <span class="grayColor">{{getStorage.birthday}}</span>
          <img :src="rightArrowIcon" alt="" class="rightArrow">
        </div>
      </li>
    </ul>
  </div>
  
</template>
<script>
  export default {
    name: 'App',
    data(){
      return {
        defaultIcon: require("modules/images/isLoginIcon.png"),
        rightArrowIcon: require("modules/images/rightArrow.png"),
      }
    },
    created: function(){
      this.$emit('getIsLink',true)
    },
    mounted: function(){

    },
    computed: {
      getStorage() {
        return this.$store.getters.getStorage;
      },
    },
    methods:{
      getUserInfo() {
        this.$http.post('/api.php/Tech/user',{
          techvid: this.techerData.vid
        }).then(res=>{
          if(res.data.errorCode == 200){
            console.log(res.data.data);
            this.userInfo = res.data.data
          }else{
            Toast(res.data.message)
          }
        }).catch(err => {
          Toast(err)
        })
      },
    }
  }
</script>
<style lang="stylus" scoped>
  .fl
    float: left
  .fr 
    float: right 
  .clearFloat
    overflow: hidden 
  .orangeColor
    color: #FA9E15  
  .selfCenter
    width: 100%
    height: 100%
    font-size: .28rem
    background: #f4f4f4!important
    overflow: hidden
    z-index: 100
    padding: 0!important
    border-radius: 0!important
    position: fixed
    top: 0
    left: 0
    ul
      width: 100%
      background: #ffffff
      padding-left: .2rem
      box-sizing: border-box
      .userLogo
        padding: .1rem 0!important
      li
        width: 100%
        position: relative
        height: 1.1rem
        line-height: 1.1rem
        text-align: left
        color: #333
        font-size: 0.34rem
        .selfRight
          position: absolute
          right: .2rem
          top: 50%
          transform: translate(0,-50%)  
          .grayColor
            color: #bfbfbf
            font-size: .34rem
          img
            display: inline-block
          .defaultLogo
            width: .72rem
            height: .72rem  
            vertical-align: middle
          .rightArrow  
            width: .15rem
            padding-left: .15rem  
            vertical-align: middle

</style>