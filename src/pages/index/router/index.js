import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home.vue'
import Index from 'components/Index.vue'
import Customer from 'components/Customer.vue'
import PickupCar from 'components/PickupCar.vue'
import Order from 'components/Order.vue'
import User from 'components/User.vue'
import SelfCenter from 'components/userChildren/SelfCenter.vue'
import Setting from 'components/userChildren/Setting.vue'
import Guide from 'components/userChildren/Guide.vue'
import Coupon from 'components/userChildren/Coupon.vue'
import Wallet from 'components/userChildren/Wallet.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  //base: '/mits', 
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
        { path: '/user', 
          component: User, 
          name: '我的',
          meta:{index:0},
          children:[
            { path:'/user/selfCenter',component: SelfCenter,name: 'selfCenter',meta:{index:1} },
            { path:'/user/setting',component: Setting,name: 'setting',meta:{index:2} },
            { path:'/user/guide',component: Guide,name: 'Guide',meta:{index:3} },
            { path:'/user/coupon',component: Coupon,name: 'Coupon',meta:{index:4} },
            { path:'/user/wallet',component: Wallet,name: 'Wallet',meta:{index:5} },
            
          ]
        }
      ]
    }
  ]
})