
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
import vueAxiosPlugin from "modules/js/axiosPrototype.js"
Vue.use(vueAxiosPlugin)
import {Toast} from 'mint-ui'
const key = 'techerData'
const store = new Vuex.Store({
    state:{
        techerData: null,
        returnUrl: null
    },
    getters:{
        getStorage: function(state){
            if(!state.techerData){
                if(localStorage.getItem(key)!='undefined'){//不存在该key，也就是处于未登录状态
                   state.techerData = JSON.parse(localStorage.getItem(key))
                }
            }
            return state.techerData;
        },
        getReturnUrl: function(state){
            let url = window.location.href; 
            let urlArr = url.split("="); 
            let returnUrl = urlArr[1]||"index.html";
            state.returnUrl = returnUrl;
            return state.returnUrl;
        }
    },
    mutations:{
        _setStorage(state,value){
            state.techerData = value;
            localStorage.setItem(key,JSON.stringify(value))
        },
        _remvoeStorage(state){
            state.techerData = null;
            localStorage.removeItem(key)
        }
    },
    actions:{
        login(context,playData){
            let self = playData.self;
            let isTip = playData.notip;
            if(isTip){
                Vue.delete(playData,'istip');
            }
            let httpData = Vue.delete(playData,'self');
            self.$http.post('/api.php/Tech/login',playData)
            .then(response=>{
                let res = response.data;
                if(res.errorCode == 200){
                    if(isTip){
                      Toast('登录成功')  
                    }
                    let loginData = JSON.stringify(res.data);
                    context.commit("_setStorage",loginData);//用vuex本地存储
                    setTimeout(function(){
                        window.location.href = context.getters.getReturnUrl
                    },1000)    
                }else{
                    Toast(res.message)
                }
                
            })
            .catch(res=>{
                Toast("如有问题，请联系客户")
            })
        }

    }
})
export default store;