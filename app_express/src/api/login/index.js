import request from '@/utils/request'

/**
 *  获取所有的权限
 * @method getAllPermission
 * @return {[type]}         [description]
 */
export const RegisterIn = (obj) => {
    return request({
        url: '/user/addUser',
        method: 'post',
        data: obj
    })
}
export const LoginIn = (obj) => {
    return request({
        url: '/user/loginIn',
        method: 'post',
        data: obj
    })
}