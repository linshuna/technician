// import {GetQueryString} from "modules/js/config.js"
const GetUrlName = {}
const orderNo = GetQueryString('orderNo');
const carno = decodeURI(GetQueryString('carno'))||decodeURI(GetQueryString('carNo'));
const reckorderNo = GetQueryString('reckorderNo');
const scienceorderNo = GetQueryString('scienceorderNo')

GetUrlName.install = function (Vue, options) {
  // Vue.prototype.defaultUrl = 'http://localhost:8080'
  Vue.prototype.defaultUrl = '/susun'
  Vue.prototype.orderNo = orderNo
  Vue.prototype.carno = carno
  Vue.prototype.reckorderNo = reckorderNo
  Vue.prototype.scienceorderNo = scienceorderNo
  //*******获取报价的类型********/
  Vue.prototype.storeList = 'store-list'
  Vue.prototype.pickUpList = 'pick-up-list'
  Vue.prototype.quickQuote = 'quick-quote'
  Vue.prototype.getQuoteName = function (value) { 
    if (value == this.storeList) return 'TechScience';
      else if (value == this.pickUpList) return 'TechService';
        else return 'TechReck';
  }
}
export default GetUrlName;

function GetQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  let r = window.location.search.substr(1).match(reg); //真实环境请用这句
  if (r!==null) return (r[2]); return null;
}