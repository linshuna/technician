import axios from 'axios'
import Qs from 'qs'
const vueAxiosPlugin = {};
axios.defaults.timeout = 30000
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

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