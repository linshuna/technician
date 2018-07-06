<template>
  <mt-popup v-model="show" position="right" class="pop-wrapper" :closeOnClickModal=false>
    <div ref="wrapper" style="height: 100%">
      <div>
        <div class="brand-wrapper" v-for="(item,key) of brandArr" :key="key" :ref="key" v-show="brandArr">
          <div class="title border-bottom-1px">{{key}}</div>
          <ul class="item-list">
            <li class="brand border-bottom-1px" v-for="(innerItem,index) of item" :key="innerItem.carplateid" @click="selected(innerItem.carplateid,index,key,innerItem.carplate,0)">
              <img :src="innerItem.icon"/>
              <span class="text">{{innerItem.carplate}}</span>
              <span class="iconfont selected-icon icon-xuanzhong" v-show="activeIndex===index&&activeKey===key"></span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="brand-wrapper" v-for="(item,key) of carmodelsList" :key="key" :ref="key" v-show="carmodelsList">
          <div class="title border-bottom-1px">{{key}}</div>
          <ul class="item-list">
            <li class="brand border-bottom-1px" v-for="(innerItem,index) of item" :key="innerItem.carnatid" @click="selected(innerItem.carnatid,index,key,innerItem.carnat,1)">
              <span class="text">{{innerItem.carnat}}</span>
              <span class="iconfont selected-icon icon-xuanzhong" v-show="activeIndex===index&&activeKey===key"></span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div class="brand-wrapper" v-for="(item,key) of carnatList" :key="key" :ref="key" v-show="carnatList">
          <div class="title border-bottom-1px">{{key}}</div>
          <ul class="item-list">
            <li class="brand border-bottom-1px" v-for="(innerItem,index) of item" :key="innerItem.modelid" @click="selected(innerItem.modelid,index,key,innerItem.outputs,2)">
              <span class="text">{{innerItem.outputs}}</span>
              <span class="iconfont selected-icon icon-xuanzhong" v-show="activeIndex===index&&activeKey===key"></span>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div class="alphabet-wrapper">
      <ul class="alphabet-list">
        <li class="item" v-for="item of letters" :key="item" :ref="item" @click="handleLetterClick">{{item}}</li>
      </ul>
    </div>

    <div class="btn-wrapper">
        <div class="btn reset" @click="reset">重置</div>
        <div class="btn confirm" @click="confirm">确定</div>
      </div>
  </mt-popup>
</template>
<script>
  import { Popup } from 'mint-ui';
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  Vue.component(Popup.name, Popup);

  export default {
    props: {
      popBrand: {
        type: Boolean
      }
    },
    data() {
      return {
        popupVisible: false,
        show: false,
        currentLetter: '',
        activeKey: '',
        activeIndex: '-1',
        activeBrand: '',
        carplateid:0,
        brandArr:[],
        carmodelsList: [],
        carnatid: 0,
        carnatList: [],
        modelid: 0
      }
    },
    computed: {
      letters() {
        const letters= [];
        for(let i in this.brandArr){
          letters.push(i)
        }
        return letters;
      }
    },
    watch: {
      popBrand(newVal) {
        this.show = newVal
        if(newVal){
          this.initScroll()
        }
        console.log(newVal)
        //this.$emit('show',this.show)
      },
      currentLetter(){
        const element = this.$refs[this.currentLetter][0];
        this.scroll.scrollToElement(element);
      },
      
    },
    created: function(){
      this.init()
    },
    methods: {
      init(){
        this.$http.get('/api.php/TechCarModels/index')
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
            this.brandArr = res.data
          }
        })
      },
      getCarmodels(){
        this.$http.post('/api.php/TechCarModels/carmodels',{carplateid: this.carplateid})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
              this.carmodelsList = res.data;
          }
        })
      },
      getYearPl(){
        this.$http.post('/api.php/TechCarModels/yearPl',{carnatid:this.carnatid})
        .then((response)=>{
          let res = response.data;
          if(res.errorCode == 200){
              this.carnatList = res.data;
          }
        })
      },
      initScroll() {
        this.$nextTick(() => {  
        if (!this.scroll) {  
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })  
          console.log(this.scroll)  
          }  
        })  
      },
      handleLetterClick(e) {
        this.currentLetter = e.target.innerText;
      },
      selected(id,index,key,brandName,type) {
        this.activeKey = key;
        this.activeIndex = index;
        let _this = this;
        if(type==0){
          this.activeBrand = brandName;
          this.brandArr = [];//设置为空
          this.carplateid = id; 
          this.getCarmodels() 
        }else if(type==1){
          setTimeout(function(){
            _this.carmodelsList = [];//设置为空
          },500)
          this.carmodelsList = [];//设置为空
          this.carnatid = id;
          this.getYearPl()
        }else if(type==2){
          this.modelid = id;
        }
        
      },
      reset() {
        this.activeKey='';
        this.activeIndex= '-1'
      },
      confirm() {
        this.$emit('closePop')
        this.$emit('selectedBrand',this.activeBrand);
        this.$emit('modelid',this.modelid)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~modules/css/variable.styl'
.pop-wrapper
  width: 80%
  height: 100%
  .brand-wrapper
    background: #fff
    .title
      height: .6rem
      line-height: .6rem
      padding: 0 .2rem
      background: #f7f7f7
    .brand
      font-size: 0
      padding: 0 .2rem
      font-size: .28rem
      line-height: 1rem
      img
        width: .8rem
        height: .8rem
        display: inline-block
        vertical-align: middle
      .text
        display: inline-block
        line-height: 1rem
        vertical-align: top
        font-size: .28rem
      .selected-icon
        font-size: 0.3rem
        line-height: 1rem
        float: right
        margin-right: .4rem 
        color: #fa9e15
  .alphabet-wrapper
    .alphabet-list
      font-size: .24rem
      display: flex
      flex-direction: column
      position: absolute
      top: 3rem
      right: 0
      bottom: 0
      width: .4rem
      .item
        line-height: .4rem
        text-align: center
        color: $color-main
  .btn-wrapper
        position: fixed
        bottom: 0
        width:100%
        height: 1rem
        line-height: 1rem
        .btn
          width: 50%
          float: left 
          text-align: center
        .reset
          color: #fff
          background: #fbbb5b
        .confirm
          color: #fff
          background: #fa9e15        
</style>