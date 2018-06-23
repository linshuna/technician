import axios from 'axios'
import Qs from 'qs'
const vueAxiosPlugin = {};
vueAxiosPlugin.install = function(Vue,options){
	const vueAxiosServer = axios.create(options);
	Vue.prototype.$axios = vueAxiosServer;
	Vue.prototype.$http = {
		get: (url,data,option)=>{ //第三个参数是设置headers
			let axiosOpt = {
				...option,
				...{
					url:url,
					method:'get',
					data:Qs.stringify(data)
				}
			}
			return vueAxiosServer(axiosOpt)
		},
		post: (url,data,option)=>{
			console.log(typeof data)
			let axiosOpt = {
				...option,
				...{
					url:url, 
					method:'post',
					data:Qs.stringify(data)	
				}
			}
			return vueAxiosServer(axiosOpt)
		}
	}
}
export default vueAxiosPlugin;