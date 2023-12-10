import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Table1 from '../components/Table1.vue'
import Table2 from '../components/Table2.vue'
import Table3 from '../components/Table3.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/table1',
      name: 'table1',
      component: Table1
    },
    {
      path: '/table2',
      name: 'table2',
      component: Table2
    },
    {
      path: '/table3',
      name: 'table3',
      component: Table3
    },

  ]
})

export default router
