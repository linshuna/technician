// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import getRem from 'modules/js/getRem.js'

import 'modules/css/reset.styl'
import 'modules/css/border-1px.css'

Vue.use(getRem)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
