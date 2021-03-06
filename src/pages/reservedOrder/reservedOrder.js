// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'
import store from 'modules/vuexData/vuexStore.js'

import 'modules/css/reset.styl'
import 'mint-ui/lib/style.css'

Vue.use(getRem)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
