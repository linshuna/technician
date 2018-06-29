// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'
import router from './router'
import store from 'modules/vuexData/vuexStore.js'
import vueAxiosPlugin from "modules/js/axiosPrototype.js"
Vue.use(vueAxiosPlugin)

import 'modules/css/reset.styl'
import 'modules/css/border-1px.css'
import 'mint-ui/lib/style.css'
import 'modules/css/iconfont.css'

Vue.use(getRem)

import { Search, Switch } from 'mint-ui';
import { DatetimePicker,Popup,Picker } from 'mint-ui';
Vue.component(Search.name, Search);
Vue.component(Switch.name, Switch);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
