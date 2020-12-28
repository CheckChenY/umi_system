import request from '@/utils/request'

/**
 *  获取所有的权限
 * @method getAllPermission
 * @return {[type]}         [description]
 */
export const DataList = (obj) => {
    return request({
        url: '/listuser',
        method: 'get',
        // params: obj
    })
}

export const MenuList = (obj) => {
    return request({
        url: '/menulist',
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
        url: '/search',
        method: 'get',
        params: obj
    })
}