// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'

import { Popup } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { Picker } from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);

import 'modules/css/reset.styl'
import 'mint-ui/lib/style.css'
import 'modules/css/border-1px.css'
import 'modules/css/iconfont.css'

Vue.use(getRem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
