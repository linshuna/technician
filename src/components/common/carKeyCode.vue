<template>
  <div class="carKeyCodeWrap">
    <div v-show="isShow">
        <section class="pkey-contain">
            <section class="pkey-keyboard">
                <header class="pkey-header2">
                    <label class="pkey-chacelbtn" @click.stop="closewin">取消</label><label class="pkey-okbtn" @click="checkplate">完成</label>
                </header>
                <section class="pkey-keyscontain">
                    <ul>
                        <li v-show="txtboardshow" v-for="(item,index) in cartxt">
                            <span v-show="index==cartxt.length-1" @click.stop="txtboardshow=false,numboardshow=true">ABC</span>
                            <label v-for="(items,indexi) in item" @click.stop="txtclick(items,indexi,item.length)" >{{items}}</label>
                            <span v-show="index==cartxt.length-1" @click.stop="deleteCode()">
                                <span class="delIcon"></span>
                            </span>
                        </li>
                        <li v-show="numboardshow" v-for="(item,index) in numtxt">
                            <span v-show="index==cartxt.length-1" @click.stop="txtboardshow=true,numboardshow=false">字</span>
                            <label v-for="(items,indexi) in item" @click.stop="numclick(items,indexi,item.length)">{{items}}</label>
                            <span v-show="index==cartxt.length-1" @click.stop="deleteCode()">
                                <span class="delIcon"></span>
                            </span>
                        </li>
                    </ul>
                </section>
                <transition name="fade">
                </transition>
            </section>
        </section>
    </div>
  </div>
</template>
<script>
 export default{
    props:{
        'isShow':{type: Boolean}
    },
    data(){
        return{
            plate:'',
            keyb:'',
            txtboardshow: true,
            numboardshow: false,
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
            ]
        }
    },
    mounted:function(){
        console.log(this.isShow)
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
            this.$emit('transferplate',{carno:this.plate})        
        },
        numclick : function(num,indexi,size){
            if(this.plate.length>10){
                return
            }
            this.plate+=num;
            this.keyb = num;
            this.composition(indexi,size);
            
            //判断第二位不能是数字
            if(this.plate.length==2){
                let isNum = this.plate.substr(1,2);
                if(/^[0-9]+$/.test(isNum)){
                    this.tips = '车牌号第二位不能是数字';
                    this.plate = this.plate.substr(0,1);
                    this.$emit('transferplate',{carno:this.plate,tips:this.tips})
                    return false;
                }
            }
            this.$emit('transferplate',{carno:this.plate}) 
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
                this.tips = '请输入车牌号码';
                //车牌号位空，在显示车牌文字
                this.txtboardshow = true;
                this.numboardshow = false;
                this.$emit('transferplate',{carno:this.plate,tips:this.tips});
                return;
            } 
            let carBol = (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[A-Z0-9]{0,1}[A-Z0-9]{0,1}$/.test(this.plate)  )      
            if(!carBol){//不是车牌
                this.tips = '车牌号格式不正确'  
                this.$emit('transferplate',{carno:this.plate,tips:this.tips});
                return;
            }
            this.$emit('update:isShow', false);//隐藏键盘 
            this.$emit('canRequest')
            this.tips = '';            
            this.plate = '';
            
            
        },
        deleteCode:function(){
            this.plate=this.plate.substr(0, this.plate.length-1);
            this.$emit('transferplate',{carno:this.plate});
        },
        closewin: function(){
            this.$emit('update:isShow', false);//隐藏键盘 
            this.tips = '';    
            this.plate='';
            this.txtboardshow = true;
            this.numboardshow = false;
            this.$emit('transferplate',{carno:this.plate});
            
            
        }
    }
 }
</script>
