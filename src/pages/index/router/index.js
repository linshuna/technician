import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index.vue'
import WorkTab from 'components/WorkTab.vue'
import Customer from 'components/Customer.vue'
import PickupCar from 'components/PickupCar.vue'
import Order from 'components/Order.vue'
import User from 'components/User.vue'

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/workTab',
      children: [
        { path: '/workTab', component: WorkTab, name: '工作台' },
        { path: '/customer', component: Customer, name: '客户' },
        { path: '/pickupCar', component: PickupCar, name: '接车' },
        { path: '/order', component: Order, name: '订单' },
        { path: '/user', component: User, name: '我的' }
      ]
    }
  ]
})
