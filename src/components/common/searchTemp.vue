<template>
    <div class="search-wrap" :style="{'width':setWidthStyle+'%'}">
        <img src="../../modules/images/searchIcon.png" alt="">
        <form action="javascript:return true;" @submit="formSubmit" autocomplete="off">
            <input type="search" 
                v-model="searchValue" 
                :placeholder="setPlaceholder" 
                :readonly="setReadonly"
                @keyup.enter="enterSearch" 
                @focus="changeType"
                @blur="showAllData" />
        </form>
        <car-key-code v-on:transferplate="gainCarno" v-bind:isShow.sync="isShow"></car-key-code>   
    </div>
</template>
<script>
import carKeyCode from "components/common/carKeyCode.vue"
import {Toast} from "mint-ui"
export default {
    props:{
        setPlaceholder:{type:String},
        setWidthStyle: {type:String},
        setReadonly:{type: Boolean},
        type:{type:String}
    },
    components:{
        'car-key-code':carKeyCode
    },
    data(){
        return{
            searchValue:'',
            isShow:false,
            tip:''
            // changePosi:false
        }
    },
    created: function(){
    },
    mounted: function(){
      this.$nextTick(function(){
        // if(this.isSroll){
        //     let _this = this;
        //     window.addEventListener('scroll',function(){
        //         var topScroll = document.documentElement.scrollTop||document.body.scrollTop;//滚动的距离,距离顶部的距离          
        //         if(topScroll > 50){  //当滚动距离大于250px时执行下面的东西
        //             _this.$emit("update:changePosi",true)
        //         }else{//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
        //             _this.$emit("update:changePosi",false)
        //         }
        //     })    
        // }

      })
    },
    methods:{
        formSubmit(){
            return false;
        },
        showAllData(){

        },
        changeType(){
            if(this.type == 'search-car'){
                this.isShow = true
            }
        },
        gainCarno:function(value){//子组件传给当前组件（父组件）
            this.searchValue = value.carno
            this.tips = value.tips
            if(this.tips&&this.tips!=''){
                Toast('').close();
                Toast(this.tips)
            }
            if(this.type){
                this.$emit('getSearchValue',this.searchValue)
            }
        },
        enterSearch: function(){
          this.$emit('getSearchValue',this.searchValue)
        }
        
    }
}
</script>

<style lang="stylus">
.search-wrap
    width: 100%
    border: 1px solid #f4f4f4
    border-radius: 5px
    padding: .15rem .2rem
    box-sizing: border-box
    border-radius: 4px
    img 
        display: inline-block
        width: .35rem
        vertical-align: middle
    form
        display: inline-block
        vertical-align: middle
        width: 90%
        height: .4rem
        input 
            display: inline-block
            width: 100%
            height: 100%
</style>
