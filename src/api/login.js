import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://127.0.0.1/heimamm/public',
    withCredentials:true
});
export function apilogin({
    phone, password, code
}) {
    return instance({
        url: '/login',
          method: 'post',
        data: {
            phone: phone,
            password: password,
            code: code
        }
    })
}