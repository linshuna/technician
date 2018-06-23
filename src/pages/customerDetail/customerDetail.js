// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'
import router from './router'
Vue.use(getRem)

import { Radio,Popup ,Picker,DatetimePicker,Toast   } from 'mint-ui';
import Vuerify from 'vuerify'
Vue.use(Vuerify)
Vue.component(Radio.name, Radio);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);

import store from 'modules/vuexData/vuexStore.js'
import vueAxiosPlugin from 'modules/js/axiosPrototype.js'
Vue.use(vueAxiosPlugin)


Vue.config.productionTip = false
import 'modules/css/reset.styl'
import 'mint-ui/lib/style.css'
import 'modules/css/iconfont.css'
import 'modules/css/border-1px.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})