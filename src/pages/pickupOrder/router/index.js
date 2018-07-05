import Vue from 'vue'
import Router from 'vue-router'

// import App from '../app.vue' 
let App = r => require.ensure([], () => r(require('../App')), 'App')
import Server from '../components/server.vue'
import Path from '../components/path.vue'
import Look from '../components/look.vue'
import Edit from '../components/edit.vue'
import Check from '../components/check.vue'
import Quotation from '../components/quotation.vue'
import AddSever from '../components/addSever.vue'
import AddPro from '../components/addPro.vue'
import Dispath from '../components/dispath.vue'
import Bill from '../components/bill.vue'
import NewSever from '../components/newSever.vue'
import NewPro from '../components/newPro.vue'
import QRecord from '../components/qRecord.vue'
import SerDetail from '../components/serDetail.vue'
import router from '../../index/router';

Vue.use(Router)
export default new Router({
  //mode: 'history',
  routes: [{
    path:"/",
    component:App,
    redirect: '/server',
    children:[
      {
        path: '/server',
        name: 'server',
        component: Server
      },
      {
        path: '/path',
        name: 'path',
        component: Path
      },
      {
        path: '/look',
        name: 'look',
        component: Look
      },
      {
        path: '/edit',
        name: 'edit',
        component: Edit,
        meta: {
          title:'接车事项'
        }
      },
      {
        path: '/check',
        name: 'check',
        component: Check
      },
      {
        path: '/quotation/:type',
        name: 'quotation',
        component: Quotation,
        meta:{
          title:'快速报价'
        }
      },
      {
        path: '/addSever/:type',
        name: 'addSever',
        component: AddSever,
        meta:{
          title: '添加服务'
        }
      },
      {
        path: '/addPro',
        name: 'addPro',
        component: AddPro,
        meta:{
          title:'材料单'
        }
      },
      {
        path: '/dispath',
        name: 'dispath',
        component: Dispath
      },
      {
        path: '/bill',
        name: 'bill',
        component: Bill
      },
      {
        path: '/newSever/:type',
        name: 'newSever',
        component: NewSever,
        meta:{
          title: '添加服务'
        }
      },
      {
        path: '/newPro',
        name: 'newPro',
        component: NewPro
      },
      {
        path: '/qRecord',
        name: 'qRecord',
        component:QRecord,
        meta:{
          title:'报价记录'
        }
      },
      {
        path: '/serDetail',
        name:'serDetail',
        component: SerDetail,
        meta:{
          title:'报价详情'
        }
      }      
    ]
  }]
})

