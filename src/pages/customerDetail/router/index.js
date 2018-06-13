import Vue from 'vue'
import Router from 'vue-router'

// import App from '../App.vue'
// import CustomerDetail from 'components/customerDetailCom/customerDetail.vue'
// import CarDetailMsg from 'components/customerDetailCom/carDetailMsg.vue'
// import BindNewCar from 'components/customerDetailCom/bindNewCar.vue'

let App = r => require.ensure([], () => r(require('../App')), 'App')
let carDetailMsg = r => require.ensure([], () => r(require('../carDetailMsg')), 'carDetailMsg')
let bindNewCar = r => require.ensure([], () => r(require('../bindNewCar')), 'bindNewCar')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:App,
      children:[
        {
          path: '/carDetailMsg/:carId',
          name: 'carDetailMsg',
          component: carDetailMsg
        },
        {
          path: '/bindNewCar',
          name: 'bindNewCar',
          component: bindNewCar
        }
      ]
    }
    
  ]
})
