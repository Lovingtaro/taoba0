import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 为false  控制台中没有任何打印
Vue.config.productionTip = false
import VueRouter from 'vue-router'
import axios from 'axios'
Vue.prototype.$axios=axios
// 与模块系统一起使用时， 必须通过Vue.use() 以下方式显式安装路由器：
import moment from 'moment'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'
import ProductZoomer from 'vue-product-zoomer'

Vue.use(ProductZoomer)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(iView)
//导入单文件组件
import './assets/css/style.css'
import index from './components/index.vue'
import detail from './components/detail.vue'
import shopcart from './components/shopcart.vue'
axios.defaults.baseURL = 'http://111.230.232.110:8899';

//实例化路由规则
let routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/detail/:artID',
    component: detail
  },
  {
    path: '/shopcart',
    component: shopcart
  }
]
// 实例化VueRouter
let router = new VueRouter({
  routes
})

Vue.filter('shortTime', value=> {
      return moment(value).format('YYYY年MM月DD日')
    }
)
const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(window.localStorage.getItem("itgoods")) || {
      90:60
    }
  },
   getters: {
     totalCount(state) {
       let num = 0;
       for (const key in state.cartData) {
         num += state.cartData[key];
       }
       return num;
     }
   },
  mutations: {
    //往购物车添加数据
    // 约定对象名以及属性
    // goodId goodName
    add2cart(state,obj) {
      // state.count+=n
      // console.log(add2ca);
      if (state.cartData[obj.goodId] != undefined) {
        state.cartData[obj.goodId] += obj.goodNum;
      } else {
        // 商品不存在动态添加键值对
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    }
  },
 

})
window.onbeforeunload = function () {
  localStorage.setItem("itgoods", JSON.stringify(store.state.cartData));
}
// 实例化Vue
new Vue({
  // render: h => h(App),
  //   router
  // 指定渲染的内容
  // 把 App.vue 渲染出来了
  // render: h => h(App),
  render: function (createElement) {
      return createElement(App);
    },
    // 路由选项
  router,
  store
    
}).$mount('#app')