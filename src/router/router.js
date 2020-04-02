//导入vue和router
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入项目路由
//登录页面
import login from '../views/login/login.vue'
//首页页面
import index from '@/views/index/index.vue'
//首页子路由
// import chart from '../router/chart/chart.vue'
// import user from '../router/user/user.vue'
// import question from '../router/question/question.vue'
// import enterprise from '../router/enterprise/enterprise.vue'
// import subject from '../router/subject/subject.vue'
import child from './child/child'
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//导入验证token的方法
import { gettoken } from "@/utils/mytoken.js";
import { userinfo } from "@/api/index.js";
import { Message } from 'element-ui';
//一些需要的组件
import store from '../store/store'
//使用router
Vue.use(VueRouter)
//实例化router
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index, children: [{ path: 'chart', component: chart, meta: { title: '数据概览', roles: ['管理员', '老师', '超级管理员'] } }, { path: 'user', component: user, meta: { title: '用户列表', roles: ['管理员', '老师', '超级管理员'] } }, { path: 'question', component: question, meta: { title: '题库列表', roles: ['管理员', '老师', '超级管理员', '学生'] } }, { path: 'enterprise', component: enterprise, meta: { title: '企业列表', roles: ['管理员', '超级管理员'] } }, { path: 'subject', component: subject, meta: { title: '学科列表', roles: ['管理员', '超级管理员'] } },], meta: { roles: ['管理员', '超级管理员', '老师', '学生'] }
        },
        //路由重定向
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
//导航守卫
router.beforeEach((to, from, next) => {
    //开启进度条
    NProgress.start();
    // 判断是否处于登录页
    if (to.path !== '/login') {
        //不在登录页
        // 判断token是否存在以及真假
        if (!gettoken()) {
            //不存在返回登录
            NProgress.done();
            Message.error('请登录')
            next('/login')
        } else {
            //判断token的真假
            userinfo().then(res => {
                if (res.data.code === 206) {
                    //token为假
                    Message.error('token错误')
                    NProgress.done();
                    next('/login')
                } else if (res.data.code === 200) {
                    if (res.data.data.status == 0) {
                        Message.error('账号已被禁用,请联系管理员')
                        next('/login')
                    } else {
                        let tip = res.data.data.role
                        // window.console.log()
                        if (to.meta.roles.includes(tip)) {
                            var userinfo = {}
                            userinfo.username = res.data.data.username
                            userinfo.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar
                            store.commit('setinfo', userinfo)
                            next()
                        } else {
                            Message.error('对不起你没有权限访问')
                            NProgress.done();
                        }

                    }

                }
            })
        }
    }
    else {
        next()
    }
    let title = to.meta.title;
    if (title) {
        document.title = title
    }

})
router.afterEach(() => {
    NProgress.done();
})
export default router