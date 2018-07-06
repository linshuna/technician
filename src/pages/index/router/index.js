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
import GetUrlName from 'modules/js/getUrlName.js'
Vue.use(GetUrlName)

Vue.use(Router)

export default new Router({ 
  // mode: 'history',
  base: __dirname, 
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        { path: '/index', component: Index, name: '工作台',meta:{title:'工作台'} },
        { path: '/customer', component: Customer, name: '客户',meta:{title:'客户'} },
        { path: '/pickupCar', component: PickupCar, name: '接车',meta:{title:'接车'} },
        { path: '/order', component: Order, name: '订单',meta:{title:'订单'} },
        { path: '/user', 
          component: User, 
          name: '我的',
          meta:{title:'我的'},
          children:[
            { path:'/user/selfCenter',component: SelfCenter,name: 'selfCenter',meta:{title:'个人中心'} },
            { path:'/user/setting',component: Setting,name: 'setting',meta:{title:'设置'} },
            { path:'/user/guide',component: Guide,name: 'Guide',meta:{title:'帮助中心'} },
            { path:'/user/coupon',component: Coupon,name: 'Coupon',meta:{title:'优惠券'} },
            { path:'/user/wallet',component: Wallet,name: 'Wallet',meta:{title:'我的钱包'} },
            
          ]
        }
      ]
    }
  ]
})