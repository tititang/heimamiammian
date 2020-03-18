//导入vue和router
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入项目路由
//登录页面
import login from '../views/login/index.vue'
//使用router
Vue.use(VueRouter)
//实例化router
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:login
        }
    ]
})
export default router