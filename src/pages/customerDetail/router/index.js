import Vue from 'vue'
import Router from 'vue-router'

import App from '../App.vue'
import CarDetailMsg from '../components/carDetailMsg.vue'
import BindNewCar from '../components/bindNewCar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:"/",
      name:'App',
      component:App,
      redirect: '/customerDetail',
      children:[
        {
          path: '/customerDetail/carDetailMsg/:carId',
          name: 'CarDetailMsg',
          component: CarDetailMsg
        },
        {
          path: '/customerDetail/bindNewCar',
          name: 'BindNewCar',
          component: BindNewCar
        }
      ]
    },
    
  ]
})
