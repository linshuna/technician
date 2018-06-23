// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'
import router from './router'
import vueAxiosPlugin from 'modules/js/axiosPrototype.js'
Vue.use(vueAxiosPlugin)

import { Navbar, TabItem, TabContainer, TabContainerItem,Popup,Picker   } from 'mint-ui';

import 'modules/css/reset.styl'
import 'modules/css/border-1px.css'
import 'modules/css/iconfont.css'
import 'mint-ui/lib/style.css'

import { Search, Switch } from 'mint-ui';
import { DatetimePicker,Radio } from 'mint-ui';
Vue.component(Search.name, Search);
Vue.component(Switch.name, Switch);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Radio.name, Radio);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker)
Vue.use(getRem)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
