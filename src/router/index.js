//导入vue和router
import Vue from 'vue'
import VueRouter from 'vue-router'
import son from '../components/son.vue'
//使用router
Vue.use(VueRouter)
//实例化router
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:son
        }
    ]
})
export default router