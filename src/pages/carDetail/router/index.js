import Vue from 'vue'
import Router from 'vue-router'

// import App from '../App.vue'
// import CustomerDetail from 'components/customerDetailCom/customerDetail.vue'
// import CarDetailMsg from 'components/customerDetailCom/carDetailMsg.vue'
// import BindNewCar from 'components/customerDetailCom/bindNewCar.vue'

let App = r => require.ensure([], () => r(require('../App')), 'App')
let carDetailMsg = r => require.ensure([], () => r(require('components/carPublic/carDetailMsg')), 'carDetailMsg')
let addCarMsg = r => require.ensure([], () => r(require('../components/addCarMsg')), 'addCarMsg')
let carDetailList = r => require.ensure([], () => r(require('../components/carDetailList')), 'carDetailList')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component: App,
      redirect: '/carDetailList',
      children: [
        {
          path: '/carDetailList',
          name: 'carDetailList',
          component: carDetailList
        },
        {
          path: '/carDetailMsg/:carId',
          name: 'carDetailMsg',
          component: carDetailMsg
        },
        {
          path: '/addCarMsg',
          name: 'addCarMsg',
          component: addCarMsg
        }
      ]
    }
    
  ]
})
