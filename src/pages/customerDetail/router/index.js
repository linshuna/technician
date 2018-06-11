import Vue from 'vue'
import Router from 'vue-router'

import CarDetailMsg from '../components/carDetailMsg.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/carDetailMsg/:carId',
      name: 'CarDetailMsg',
      component: CarDetailMsg
    }
  ]
})
