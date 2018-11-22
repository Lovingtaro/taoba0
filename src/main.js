import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
// 与模块系统一起使用时， 必须通过Vue.use() 以下方式显式安装路由器：
Vue.use(VueRouter)
import './assets/css/style.css'
import index from './components/index.vue'



let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  }
]
let router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')