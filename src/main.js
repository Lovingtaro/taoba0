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
import order from './components/order.vue'
import login from './components/login.vue'
import payMoney from './components/payMoney.vue'
import paySuccess from './components/paySuccess.vue'
import vipCenter from './components/vipCenter.vue'
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
axios.defaults.withCredentials = true;
// 全局导航守卫,其实就是回调函数,(由每次路由触发而触发);

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
  },
  {
    path: '/order/:ids',
    component: order,
    meta: {
      checkLogin: true
    }
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/payMoney/:orderId',
    component: payMoney,
    meta: {
      checkLogin: true
    }
  },
   {
     path: '/paySuccess',
     component: paySuccess
  },
    {
      path: '/vipCenter',
      component: vipCenter
    }
]
// 实例化VueRouter
let router = new VueRouter({
  mode: 'history',
  routes
})

Vue.filter('shortTime', value=> {
      return moment(value).format('YYYY年MM月DD日')
    }
)
const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(window.localStorage.getItem("itgoods")) || {},
    isLogin:false
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
        // state.cartData[obj.goodId] += obj.goodNum;
         let oldNum = state.cartData[obj.goodId];
         oldNum += obj.goodNum;
         state.cartData[obj.goodId] = oldNum;
      } else {
        // 动态添加的属性必须用Vue.set添加键值对
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
    },
    updateCartData(state,obj) {
      state.cartData = obj;
    },
    // 删除某一条数据的方法
    // 已经被 watch中的代码 实现  只是为了 演示 Vue.delete这个方法
    delGoodsById(state, id) {

      // 根据id 删除state中的数据
      // delete state.cartData[id];
      // delete 删除的属性 Vue无法跟踪
      // 参数1 对象 参数2 删除的属性
      // 必须使用Vue.delete才可以同步更新视图
      Vue.delete(state.cartData, id); 
    },
    // 修改登录状态
    changeLogin(state,isLogin) {
      state.isLogin = isLogin;
    }
  }
 

})
router.beforeEach((to, from, next) => {
    // console.log('进不去啦!!!');
    // console.log(to);
    // console.log(from);
    // console.log(next);
    // 判断是否有登录,如果没有就打回登录页
  // if (to.path.indexOf('/order') != -1) {
  //   if (store== "") {
  //       console.log(123);
        
  //       Vue.prototype.$Message.warning('购物车没有东西,请先去购物吧!')
       
  //   }
  //   next(false)
  //   }

    // console.log(this);
    if (to.meta.checkLogin == true) {
      // 判断用户是否有登录

      axios.get("site/account/islogin").then(result => {
        //   console.log(result);
        if (result.data.code == "nologin") {
          console.log(this);

          // 提示用户
          Vue.prototype.$Message.warning("请先登录");

          // 跳转页面(路由)
          // router.push("/login");
        } else {
          // 如果登录成功,开启通道,让路由跳转
          next();
        }
      });
    } else {
      // 如果不执行,就会被拦截,就不会路由跳转
      next();
    }
  });
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
  store,
  created() {
    // console.log('最顶级的被创建了');
    // 调用登录判断接口
    // 根据结果判断是否登录
    axios.get("site/account/islogin").then(result => {
      console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由) 登录页面 编程式导航
        router.push("/login");
      } else {
        // 修改仓库中的状态
        store.state.isLogin = true;
        // 如果登录成功啦
        // next();
      }
    });
  }
    
}).$mount('#app')