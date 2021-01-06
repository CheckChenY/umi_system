import request from '@/utils/request'
import until from '@/utils/until'

/**
 *  获取所有的权限
 * @method getAllPermission
 * @return {[type]}         [description]
 */
export const DataList = (obj) => {
    return request({
        url: '/index/listuser',
        method: 'get',
        params: obj
    })
}

export const MenuList = (obj) => {
    return request({
        url: '/index/menulist',
        method: 'get',
        // params: obj
    })
}

export const AddList = (obj) => {
    return request({
        url: '/addlist',
        method: 'get',
        params: obj
    })
}

export const SearchList = (obj) => {
    return request({
        url: '/index/search',
        method: 'get',
        params: obj
    })
}

export const Weather = (obj) => {
    return until({
        url: '/api',
        method: 'get',
        params: obj
    })
}