import axios from 'axios'
export function apigetcode({ code, phone }) {
  return axios({
    url: process.env.VUE_APP_URL + '/sendsms',
    method: 'post',
    data: {
      code: code,
      phone: phone
    },
    withCredentials: true
  })
}
export function apirigister({ username, phone, email, avatar, password, rcode }) {
  return axios({
    url: process.env.VUE_APP_URL + '/register',
    method: 'post',
    data: {
      username: username,
      phone: phone,
      email: email,
      avatar: avatar,
      password: password,
      rcode: rcode
    }
  })
}