// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'
import router from './router'

Vue.use(getRem)
Vue.config.productionTip = false
import 'modules/css/reset.styl'
import 'mint-ui/lib/style.css'
import 'modules/css/iconfont.css'
import 'modules/css/border-1px.css'
/* eslint-disable no-new */
//注册  
Vue.component('carKeyCode',{  
  data(){
    return{
        plate:'',
        keyb:'',
        txtboardshow:true,
        numboardshow:false,
        keyshow:false,
         mleft:0,
         tips:'',
         cartxt:[
             ['京','津','渝','沪','冀','晋','辽','吉','黑','苏'],
             ['浙','皖','闽','赣','鲁','豫','鄂','湘','粤','琼'],
             ['川','贵','云','陕','甘','青','蒙','桂','宁','新'],
             ['藏','使','领','警','学','港','澳']
         ],
         numtxt:[
             ['1','2','3','4','5','6','7','8','9','0'],
             ['Q','W','E','R','T','Y','U','I','O','P'],
             ['A','S','D','F','G','H','J','K','L'],
             ['Z','X','C','V','B','N','M']
         ],
     }
  },
  methods: {
      txtclick : function(txt,indexi,size){
          if(this.plate.length>10){
              return
          }
          this.txtboardshow = false;
          this.numboardshow = true;
          this.plate+=txt;
          this.keyb = txt;
          this.composition(indexi,size);            
      },
      numclick : function(num,indexi,size){
          if(this.plate.length>10){
              return
          }
          this.plate+=num;
          this.keyb = num;
          this.composition(indexi,size);
          
      },
      composition : function(indexi,length){
          //闪烁位置设置
          let winwidth = document.documentElement.clientWidth;
          let keyW = winwidth * 65 / 750;
          let kkongW = winwidth * 9 / 750;
          let showW = winwidth * 120 / 750;
          let size = length;
          let isEven = (size%2==0) ? true : false;
          if(indexi<size/2){ // 左边
              let mleft = 0;
              if(isEven){ // 偶数
                  let n = size/2-(indexi+1) + 0.5;
                  mleft = n*(keyW + kkongW) + showW/2;
              }
              else{ // 奇数
                  let n = (size/2+0.5)-(indexi+1);
                  mleft = n*(keyW + kkongW) + showW/2;
              }                
              mleft = (mleft > winwidth/2) ? winwidth/2 : mleft;
              this.mleft = -mleft;
          }else{ // 右边
              let mright = 0;
              if(isEven){
                  let n = (indexi+1) - size/2 -0.5;
                  mright = n*(keyW + kkongW) - showW/2;
              }else{
                  let n = (indexi+1) - (size/2+0.5);
                  mright = n*(keyW + kkongW) - showW/2;
              }                
              mright = (mright > (winwidth/2-showW)) ? (winwidth/2-showW) : mright;
              this.mleft = mright;
          }
          //闪烁
          this.keyshow = true;
          let self = this;
          setTimeout(function(){
              self.keyshow = false;
          },2250);
          
      },
      checkplate : function(){
          if(this.plate==''){
              this.tips = '请输入车牌号码'
              return;
          }            
          if(!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[A-Z0-9]{0,1}[A-Z0-9]{0,1}$/.test(this.plate))){
              //不是车牌
              this.tips = '车牌号格式不正确'       
              return;
          }
          this.tips = '';            
          this.$emit('transferplate',this.plate);
          this.plate = '';
          this.txtboardshow = true;
          this.numboardshow = false;
      },
      closewin : function(){
          this.tips = '';    
          this.$emit('transferclose',false);
          this.plate='';
          this.txtboardshow = true;
          this.numboardshow = false;
      }
  },
  template:`<div><section class="pkey-contain">
  <section class="pkey-win">
      <header class="pkey-header">车牌号码</header>
      <div class="pkey-win-body">
          <div class="pkey-ipt pkey-foucs">{{plate}}</div>
          <div class="pkey-tips">{{tips}}</div>
      </div>
  </section>
  <section class="pkey-keyboard">
      <header class="pkey-header2">
          <label class="pkey-chacelbtn" @click="closewin">取消</label><label class="pkey-okbtn" @click="checkplate">完成</label>
      </header>
      <section class="pkey-keyscontain">
          <ul>
              <li v-show="txtboardshow" v-for="(item,index) in cartxt">
                  <span v-show="index==cartxt.length-1" @click="txtboardshow=false,numboardshow=true">ABC</span>
                  <label v-for="(items,indexi) in item" @click="txtclick(items,indexi,item.length)">{{items}}</label>
                  <span v-show="index==cartxt.length-1" @click="plate=plate.substr(0, plate.length-1)">&nbsp;</span>
              </li>
              <li v-show="numboardshow" v-for="(item,index) in numtxt">
                  <span v-show="index==cartxt.length-1" @click="txtboardshow=true,numboardshow=false">字</span>
                  <label v-for="(items,indexi) in item" @click="numclick(items,indexi,item.length)">{{items}}</label>
                  <span v-show="index==cartxt.length-1" @click="plate=plate.substr(0, plate.length-1)">&nbsp;</span>
              </li>
          </ul>
      </section>
      <transition name="fade">
          <section class="showkey" v-show="keyshow" :keyshow="keyshow" :style="{marginLeft:mleft+'px'}">{{keyb}}</section>
      </transition>
  </section>
</section></div>`,

});  
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})