import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home.vue'
import Index from 'components/Index.vue'
import Customer from 'components/Customer.vue'
import PickupCar from 'components/PickupCar.vue'
import Order from 'components/Order.vue'
import User from 'components/User.vue'
import NotFound from 'components/404Page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/mits', 
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        { path: '/index', component: Index, name: '工作台' },
        { path: '/customer', component: Customer, name: '客户' },
        { path: '/pickupCar', component: PickupCar, name: '接车' },
        { path: '/order', component: Order, name: '订单' },
        { path: '/user', component: User, name: '我的' }
      ]
    },
    {
      path: '*',
      component: NotFound,
      name: '404'
    }
  ]
})
