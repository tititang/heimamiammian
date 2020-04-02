//用来封装学科列表的axios请求
import axios from 'axios'
import { gettoken } from '@/utils/mytoken'
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
export default instance