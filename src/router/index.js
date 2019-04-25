import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import Users from '@/components/users/Users'
import Rights from '@/components/rights/Rights'
import Roles from '@/components/rights/Roles'
import Categories from '@/components/goods/Categories'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
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
        { path: '/categories', name: 'categories', component: Categories }
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
