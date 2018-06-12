import Vue from 'vue'
import Router from 'vue-router'

import CarDetailMsg from '../components/carDetailMsg.vue'
import BindNewCar from '../components/bindNewCar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/carDetailMsg/:carId',
      name: 'CarDetailMsg',
      component: CarDetailMsg
    },
    {
      path: '/bindNewCar',
      name: 'BindNewCar',
      component: BindNewCar
    }
  ]
})
