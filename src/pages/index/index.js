// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import getRem from 'modules/js/getRem.js'

import store from 'modules/vuexData/vuexStore.js'

import { Tabbar, TabItem, TabContainer, TabContainerItem,Cell,Toast } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Cell.name, Cell);
import vueAxiosPlugin from "modules/js/axiosPrototype.js"
Vue.use(vueAxiosPlugin)

import 'modules/css/reset.styl'
import 'mint-ui/lib/style.css'
import 'modules/css/iconfont.css'
import 'modules/css/border-1px.css'

Vue.use(getRem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
