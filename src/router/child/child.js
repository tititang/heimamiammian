import chart from '../chart/chart.vue'
import user from '../user/user.vue'
import question from '../question/question.vue'
import enterprise from '../enterprise/enterprise.vue'
import subject from '../subject/subject.vue'
export default [{ path: 'chart', component: chart, meta: { title: '数据概览', roles: ['管理员', '老师', '超级管理员'] } }, { path: 'user', component: user, meta: { title: '用户列表', roles: ['管理员', '老师', '超级管理员'] } }, { path: 'question', component: question, meta: { title: '题库列表', roles: ['管理员', '老师', '超级管理员', '学生'] } }, { path: 'enterprise', component: enterprise, meta: { title: '企业列表', roles: ['管理员', '超级管理员'] } }, { path: 'subject', component: subject, meta: { title: '学科列表', roles: ['管理员', '超级管理员'] } },]
