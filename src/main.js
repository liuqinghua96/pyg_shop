import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from './http'
import moment from 'moment'
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.filter('changeTime', function (value) {
  return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
