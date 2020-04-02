//本页面封装企业列表的所有接口
import instance from'@/utils/myhttp.js'
//企业删除
export function apienterdel(id){
    return instance({
        url:'/enterprise/remove',
        method:'post',
        data:{
            id:id
        }

    })
}
//企业编辑
export function apienteredit({id,name,eid,short_name,intro,remark}){
    return instance({
        url:'/enterprise/edit',
        method:'post',
        data:{
            id:id,
            eid:eid,
            name:name,
            short_name:short_name,
            intro:intro,
            remark:remark
        }

    })
}
//企业状态编辑
export function apienterstatus(id){
    return instance({
        url:'/enterprise/status',
        method:'post',
        data:{
            id:id
        }

    })
}
//添加企业
export function apienteradd({eid,name,short_name,intro,remark}){
    return instance({
        url:'/enterprise/add',
        method:'post',
        data:{
            eid:eid,
            name:name,
            short_name:short_name,
            intro:intro,
            remark:remark
        }

    })
}
//企业信息列表
export function apienterlist({name,page,limit,eid,username,status}){
    return instance({
        url:'/enterprise/list',
        method:'get',
        params:{
            name:name,
            page:page,
            limit:limit,
            eid:eid,
            username:username,
            status:status
        }

    })
}