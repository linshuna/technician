<template>
    <div class="server-detail-wrap">
        <ul>
            <li v-for="(item,index) in serverList" :key="index" class="border-bottom-1px">
                <server-temp v-bind:item.sync="item"></server-temp>
            </li>
        </ul>
        
    </div>
</template>
<script>
import serverTemp from './serverTemp.vue'
import {GetQueryString} from 'modules/js/config.js'
export default {
    data(){
        return{
            serverList: [],
            reckorderNo: ''
        }
    },
    components:{
        'server-temp': serverTemp
    },
    created: function(){
        this.reckorderNo = GetQueryString('reckorderNo');
        this.init()
    },
    methods:{
        init: function(){
            this.$http.post('/api.php/TechReck/checkreck',{reckorderNo: this.reckorderNo})
            .then((response)=>{
                let res = response.data;
                if(res.errorCode == 200){
                    this.serverList = res.data.list;
                }else{
                    Toast(res.message)
                }
            })
        }
    }
}
</script>
<style lang="stylus">
    .server-detail-wrap
        width: 100%
        position: absolute
        top: 0
        left: 0
        min-height: 100%
        z-index: 100
        background: #ffffff
</style>


