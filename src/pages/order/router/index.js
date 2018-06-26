import Vue from 'vue'
import Router from 'vue-router'

import SearchCarOrder from '../components/SearchCarOrder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'searchCarOrder',
      component: SearchCarOrder
    }
  ]
})
