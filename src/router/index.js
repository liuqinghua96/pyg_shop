import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login')
const Home = () => import('@/components/home/Home')
const Welcome = () => import('@/components/home/Welcome')
const Users = () => import('@/components/users/Users')
const Rights = () => import('@/components/rights/Rights')
const Roles = () => import('@/components/rights/Roles')
const Categories = () => import('@/components/goods/Categories')
const Params = () => import('@/components/goods/Params')
const Goods = () => import('@/components/goods/Goods')
const AddGoods = () => import('@/components/goods/AddGoods')
const Orders = () => import('@/components/orders/Orders')
const Report = () => import('@/components/report/Report')

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
