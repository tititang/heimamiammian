//用来封装学科列表的axios请求
import axios from 'axios'
import { gettoken } from '../utils/mytoken'
const instance = axios.create({
    baseURL: 'http://127.0.0.1/heimamm/public',
    withCredentials: true
})
//设置axios拦截器
instance.interceptors.request.use(function (config) {
    config.headers.token = gettoken()
    window.console.log('qingqiu',config)
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
//发送学科列表axios请求
export  function getsubjectlist(obj) {
    return instance({
        url: '/subject/list',
        params: {
            name: obj.name,
            page: obj.page,
            limit: obj.limit,
            rid: obj.rid,
            username: obj.username,
            status: obj.status
        }
    })
}
//发送禁用启用请求
export  function getsubjectstatus(id) {
    return instance({
        url: '/subject/status',
        method:'post',
        data: {
            id:id
        }
    })
}
//发送编辑请求
export  function apiedit({id,rid,name,short_name,intro,remark}) {
    return instance({
        url: '/subject/edit',
        method:'post',
        data: {
            id:id,
            rid:rid,
            name:name,
            short_name:short_name,
            intro:intro,
            remark:remark
        }
    })
}
//发送删除请求
export  function apidel(id) {
    return instance({
        url: '/subject/remove',
        method:'post',
        data: {
            id:id,
        }
    })
}