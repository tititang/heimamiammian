import Vue from 'vue'
import App from './App.vue'
//导入过滤器
import './filters/filtersdate'
//导入创建的路由
import router from './router/router'
//导入element
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入组件
import store from './store/store'
//解决路由报错
//导入全局样式
import './style/index.css'
//使用element
Vue.use(element)
// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store:store
}).$mount('#app')
