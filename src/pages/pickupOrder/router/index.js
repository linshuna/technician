import Vue from 'vue'
import Router from 'vue-router'

import Path from '../components/path.vue'
import Look from '../components/look.vue'
import Edit from '../components/edit.vue'
import Check from '../components/check.vue'
import Quotation from '../components/quotation.vue'
import AddSever from '../components/addSever.vue'
import Dispath from '../components/dispath.vue'
import Bill from '../components/bill.vue'
import NewSever from '../components/newSever.vue'
import NewPro from '../components/newPro.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: Edit
    },
    {
      path: '/check',
      name: 'check',
      component: Check
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: Quotation
    },
    {
      path: '/addSever',
      name: 'addSever',
      component: AddSever
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
      path: '/newSever',
      name: 'newSever',
      component: NewSever
    },
    {
      path: '/newPro',
      name: 'newPro',
      component: NewPro
    }
  ]
})
