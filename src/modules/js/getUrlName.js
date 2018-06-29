// import {GetQueryString} from "modules/js/config.js"
const GetUrlName = {}
const orderNo = GetQueryString('orderNo');
const carno = decodeURI(GetQueryString('carno'))||decodeURI(GetQueryString('carNo'));
const reckorderNo = GetQueryString('reckorderNo');
GetUrlName.install = function(Vue,options){
  Vue.prototype.orderNo = orderNo
  Vue.prototype.carno = carno
  Vue.prototype.reckorderNo = reckorderNo
}
export default GetUrlName;

function GetQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  let r = window.location.search.substr(1).match(reg); //真实环境请用这句
  if (r!==null) return (r[2]); return null;
}