import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import Users from '@/components/users/Users'
import Rights from '@/components/rights/Rights'
import Roles from '@/components/rights/Roles'
import Categories from '@/components/goods/Categories'
import Params from '@/components/goods/Params'
import Goods from '@/components/goods/Goods'
import AddGoods from '@/components/goods/AddGoods'
import Orders from '@/components/orders/Orders'
import Report from '@/components/report/Report'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/welcome',
      component: Home,
      children: [
        { path: '/welcome', name: 'welcome', component: Welcome },
        { path: '/users', name: 'users', component: Users },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/categories', name: 'categories', component: Categories },
        { path: '/params', name: 'params', component: Params },
        { path: '/goods', name: 'goods', component: Goods },
        { path: '/goods/addGoods', name: 'addGoods', component: AddGoods },
        { path: '/reports', name: 'report', component: Report },
        { path: '/orders', name: 'orders', component: Orders }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!sessionStorage.getItem('token')) return next('/login')
  next()
})
export default router
