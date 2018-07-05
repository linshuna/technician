<template>
  <div class="check">
    <loading v-if="loading"></loading>
    <template v-else>
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="(item,index) in allList" :id="index" :key="index">
          {{item.name}}
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" class="tabContainer">
        <mt-tab-container-item v-for="(item,index) in allList" :id="index" :key="index">
          <div class="title">
            <div>项目名称</div>
            <div class="setFlex">标准</div>
            <div>检车意见</div>
          </div>
          <ul>
            <li class="item" v-for="childItem in item.list">
              <check-child-temp v-bind:item.sync="childItem" v-on:setChangeItem="getChangeItem"></check-child-temp>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="conclusion-wrapper border-bottom-1px">检车结论
        <div class="lastKm fr">上次里程：无</div>
        <textarea class="conclusion" placeholder="请输入检车结论" v-model="remark"></textarea>
      </div>
      <div class="btn" @click="save">保存</div>
    </template>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {mapState} from 'vuex'
  import checkChildTemp from './checkChildTemp.vue'
  import loading from 'components/common/Loading.vue'
  export default {
    data() {
      return{
        selected: 0,
        value:'',
        allList:null,
        remark: ''
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.init()
        console.log(this.carno)
      })
    },
    components:{
      'check-child-temp':checkChildTemp,
      'loading': loading
    },
    computed:{
      ...mapState(['loading'])
    },
    methods: {
      init:function(){
        this.$store.commit('showLoading')
        this.$http.get('/api.php/TechService/projects')
          .then((response)=>{
            let res = response.data;
            let data = res.data;
            this.$store.commit('hideLoading')
            if(res.errorCode == 200){
              if(!data) return false;
              this.selected = 0
              this.allList = data;
              this.allList.map((item,index)=>{
                item.list.map((childItem,childIndex)=>{
                  this.$set(childItem,'bol',true)
                })
                
              })
            }else{
              Toast(res.message)
            }
          })
      },
      getChangeItem:function(value){
          console.log(value)
          this.allList.map((item,index)=>{
            item.list.map((childItem,childIndex)=>{
              if(value.id==childItem.id){
                this.$set(item.list,childIndex,value)
              }
            })
            
          })
          
      },
      save:function(){
          console.log(this.allList)
          let checklist = [];
          this.allList.map((item,index)=>{
            item.list.map((childItem,childIndex)=>{
              checklist.push({
                id: childItem.id,
                status: childItem.bol?1:0
              })
            })
          })
          let listData = JSON.stringify({
            orderNo: this.orderNo,
            remark: this.remark,
            checklist: checklist
          })
          let _this = this;
          this.$http.post('/api.php/TechService/saveprojects',{lists:listData})
          .then((response)=>{
            let res = response.data;
            if(res.errorCode == 200){
              Toast("成功修改检测")
              setTimeout(function(){
                window.location.href = _this.defaultUrl+"/pickupOrder.html?orderNo="+_this.orderNo+"&carNo="+_this.carno+"#/path"  
              },500)
              
            }else{
              Toast(res.message)
            }
          })
      }
    }
  } 
</script>
<style lang="stylus" scoped>
   @import '~modules/css/variable.styl'

  .check >>>.mint-navbar .mint-tab-item.is-selected
    border-bottom: 3px solid $color-main
    color: $color-main
    margin-bottom: 0
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
    .title,.item
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
        .normal
          border-radius: 0 2px 2px 0!important
        span
          padding: .1rem
          font-size: .24rem
          border: 1px solid #eee
          &.active
            color: #315cda
            background: #6c95f74d
    .tabContainer
      margin-bottom: .2rem
      background: #fff
    .conclusion-wrapper
      padding: 0 .2rem
      line-height: .8rem
      background: #fff
      .lastKm
        color: #2494b7
      .conclusion
        width: 98%
        height: 2rem
        border: 1px solid #eee
        border-radius: 4px  
    .btn
      position: fixed
      bottom: 0
      right: 0
      left: 0
      height: .8rem
      line-height: .8rem
      text-align: center
      color: #fff
      background: $color-main         
</style>
<style lang="stylus">
  .mint-navbar .mint-tab-item
    padding: 10px 0;
</style>