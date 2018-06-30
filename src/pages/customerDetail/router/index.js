import Vue from 'vue'
import Router from 'vue-router'

// import App from '../App.vue'
// import CustomerDetail from 'components/customerDetailCom/customerDetail.vue'
// import CarDetailMsg from 'components/customerDetailCom/carDetailMsg.vue'
// import BindNewCar from 'components/customerDetailCom/bindNewCar.vue'

let App = r => require.ensure([], () => r(require('../App')), 'App')
let carDetailMsg = r => require.ensure([], () => r(require('components/carPublic/carDetailMsg')), 'carDetailMsg')
let customerDetailIndex = r => require.ensure([], () => r(require('../components/customerDetailIndex')), 'customerDetailIndex')
let addNewCar = r => require.ensure([], () => r(require('../components/addNewCar')), 'addNewCar')
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path:"/",
      component:App,
      redirect: '/customerDetailIndex',
      children:[
        {
          path: '/customerDetailIndex',
          name: 'customerDetailIndex',
          component: customerDetailIndex
        },
        {
          path: '/carDetailMsg/:carId',
          name: 'carDetailMsg',
          component: carDetailMsg
        },
        {
          path: '/addNewCar/:carId',
          name: 'addNewCar',
          component: addNewCar
        }
      ]
    }
    
  ]
})

