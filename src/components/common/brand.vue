<template>
  <mt-popup v-model="show" position="right" class="pop-wrapper" :closeOnClickModal=false>
    <div ref="wrapper" style="height: 100%">
      <div>
        <div class="brand-wrapper" v-for="(item,key) of brandArr" :key="key" :ref="key">
          <div class="title border-bottom-1px">{{key}}</div>
          <ul class="item-list">
            <li class="brand border-bottom-1px" v-for="(innerItem,index) of item" :key="innerItem.id" @click="selected(index,key,innerItem.name)">
              <img :src="innerItem.pic"/>
              <span class="text">{{innerItem.name}}</span>
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
        brandArr:{
          A:[
            {id:'0',name:'奥迪',pic:'http://mb.hhqccar.cn/Public/icon/aodi.jpg'}
          ],
          B:[
            {id:'1',name:'标致',pic: "http://mb.hhqccar.cn/Public/icon/biaozhi.jpg"},
            {id:'2',name:'保时捷',pic: "http://mb.hhqccar.cn/Public/icon/baoshijie.jpg"},
            {id:'3',name:'别克',pic: "http://mb.hhqccar.cn/Public/icon/bieke.jpg"}
          ],
          C: [
            {id:'4',name:'昌河',pic: "http://mb.hhqccar.cn/Public/icon/changhe.jpg"}
          ],
          D: [
            {id:'5',name:'东风风行',pic: "http://mb.hhqccar.cn/Public/icon/dongfeng.jpg"}
          ],
          H: [
            {id:'6',name:'海马',pic: "http://mb.hhqccar.cn/Public/icon/haima.jpg"}
          ],
          J: [
            {id:'7',name:'吉普',pic: "http://mb.hhqccar.cn/Public/icon/jipu.jpg"}
          ],
          K: [
            {id:'8',name:'标致',pic: "http://mb.hhqccar.cn/Public/icon/biaozhi.jpg"},
            {id:'9',name:'保时捷',pic: "http://mb.hhqccar.cn/Public/icon/baoshijie.jpg"},
            {id:'10',name:'别克',pic: "http://mb.hhqccar.cn/Public/icon/bieke.jpg"}
          ],
          P: [
            {id:'12',name:'标致',pic: "http://mb.hhqccar.cn/Public/icon/biaozhi.jpg"},
            {id:'17',name:'保时捷',pic: "http://mb.hhqccar.cn/Public/icon/baoshijie.jpg"},
            {id:'13',name:'别克',pic: "http://mb.hhqccar.cn/Public/icon/bieke.jpg"},
            {id:'14',name:'标致',pic: "http://mb.hhqccar.cn/Public/icon/biaozhi.jpg"},
            {id:'15',name:'保时捷',pic: "http://mb.hhqccar.cn/Public/icon/baoshijie.jpg"},
            {id:'16',name:'别克',pic: "http://mb.hhqccar.cn/Public/icon/bieke.jpg"}
          ]
        }
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
    methods: {
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
      selected(index,key,brandName) {
        this.activeKey = key;
        this.activeIndex = index;
        this.activeBrand = brandName;
      },
      reset() {
        this.activeKey='';
        this.activeIndex= '-1'
      },
      confirm() {
        this.$emit('closePop')
        this.$emit('selectedBrand',this.activeBrand);
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
      img
        width: 1rem
        height: 1rem
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