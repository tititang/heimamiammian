//本页面封装用户列表里得所有网络请求
import instance from '@/utils/myhttp.js'
//修改用户状态启用或者禁用
export function apiuserstatus(id) {
    return instance({
        url: 'user/status',
        method: 'post',
        data: {
            id: id
        }
    })
}
//删除用户
export function apiuserdel(id) {
    return instance({
        url: 'user/remove',
        method: 'post',
        data: {
            id: id
        }
    })
}
//用户信息编辑
export function apiuseredit({ id, username, phone, email, avatar, password, remark, status, role_id }) {
    return instance({
        url: 'user/edit',
        method: 'post',
        data: {
            id: id,
            username: username,
            phone: phone,
            email: email,
            avatar: avatar,
            password: password,
            remark: remark,
            status: status,
            role_id: role_id
        }
    })
}
//创建用户
export function apiuseradd({ username, phone, email, remark, status, role_id }) {
    return instance({
        url: 'user/add',
        method: 'post',
        data: {
            username: username,
            phone: phone,
            email: email,
            remark: remark,
            status: status,
            role_id: role_id
        }
    })
}
//用户信息列表
export function apiuserlist({ username, email, page, limit, role_id }) {
    return instance({
        url: 'user/list',
        method: 'get',
        params: {
            username: username,
            email: email,
            page: page,
            limit: limit,
            role_id: role_id
        }
    })
}