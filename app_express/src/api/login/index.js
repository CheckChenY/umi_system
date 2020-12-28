import request from '@/utils/request'

/**
 *  获取所有的权限
 * @method getAllPermission
 * @return {[type]}         [description]
 */
export const LoginIn = (obj) => {
    return request({
        url: '/host/',
        method: 'get',
        params: obj
    })
}