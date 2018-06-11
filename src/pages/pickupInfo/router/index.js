import Vue from 'vue'
import Router from 'vue-router'

import pickup1 from '../components/pickup_1.vue'
import pickup2 from '../components/pickup_2.vue'
import pickup3 from '../components/pickup_3.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/type/1',
      name: 'pickup1',
      component: pickup1
    },
    {
      path: '/type/2',
      name: 'pickup2',
      component: pickup2
    },
    {
      path: '/type/3',
      name: 'pickup3',
      component: pickup3
    }
  ]
})
