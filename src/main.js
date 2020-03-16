import Vue from 'vue'
import App from './App.vue'
//导入创建的路由
import router from './router/index'
//导入element
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//使用element
Vue.use(element)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
