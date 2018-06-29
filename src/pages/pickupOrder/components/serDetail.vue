<template>
    <div>
        <ul>
            <li v-for="(item,index) in serverList" :key="index">
                <server-temp v-bind:item.sync="item"></server-temp>
            </li>
        </ul>
        
    </div>
</template>
<script>
import serverTemp from './serverTemp.vue'
export default {
    data(){
        return{
            serverList: []
        }
    },
    components:{
        'server-temp': serverTemp
    }
}
</script>

