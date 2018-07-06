
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
import vueAxiosPlugin from "modules/js/axiosPrototype.js"
Vue.use(vueAxiosPlugin)
import {Toast} from 'mint-ui'
const defaultUrl = __dirname; //默认的路径
const store = new Vuex.Store({
    state:{
        key:'techerData',
        techerData: null,
        returnUrl: null,
        loading: false
    },
    getters:{
        getStorage: function(state){
            let data = null;
            if(localStorage.getItem(state.key)!='undefined'){//不存在该key，也就是处于未登录状态
                data = JSON.parse(localStorage.getItem(state.key))
                if(state.key == 'techerData'){
                    state.techerData = data;
                }
            }
            return data;
        },
        getReturnUrl: function(state){//获取url
            let url = window.location.href; 
            let returnUrl = '';
            if(url.indexOf("=")>-1){
              let urlArr = url.split("=");   
              returnUrl = urlArr[1]
            }else{
                returnUrl = defaultUrl
            }
            state.returnUrl = returnUrl;
            return state.returnUrl;
        }
    },
    mutations:{
        _setName(state,value){
            state.key = value
        },
        _setStorage(state,value){
            if(state.key == 'techerData') state.techerData = value;
            localStorage.setItem(state.key,JSON.stringify(value))
        },
        _remvoeStorage(state){
            if(state.key == 'techerData'){
                state.techerData = null;
            }
            localStorage.removeItem(state.key)
        },
        showLoading(state){
            state.loading = true
        },
        hideLoading(state){
            state.loading = false
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
                    let loginData = res.data;
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
        },
        logout(context){
            context.commit('_remvoeStorage')
            Toast("成功退出登录")
            setTimeout(function(){
                window.location.href = context.getters.getReturnUrl
            },1000)    
        },
        delToast(){
            let bodyObj = document.getElementsByTagName("body")[0];
            let toastObj = document.getElementsByClassName("mint-toast");
            let toastLen = toastObj.length;
            for(var i=0,len=toastObj.length;i < len;i++){
                if(toastObj[i]){
                    bodyObj.removeChild(toastObj[i])
                }
            }    
        }
    }
})
export default store;