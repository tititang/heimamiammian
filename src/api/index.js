//存放首页里所有的网络请求
import axios from 'axios'
import { gettoken } from '@/utils/mytoken'
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
//发送用户详情请求
export function userinfo() {
    return instance({
        url: '/info',
        headers: {
            token: gettoken()
        }
    })
}
//发送退出请求
export function logout(){
   return instance({
        url:'/logout',
        headers:{
            token:gettoken()
        }
    })
}