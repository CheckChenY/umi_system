// 引入axios
// import {useState} from 'react';
import axios from 'axios';

// let storage = window.localStorage;
axios.defaults.baseURL = '/host';
// 创建axios实例
const service = axios.create({
    baseURL: '/host',
    timeout: 80000, // 请求超时时间
    withCredentials: true, // 跨域携带cookie
    xsrfCookieName: 'xsrf-token'  //当创建实例的时候配置默认配置
})


// 添加请求拦截器，这里面可以配置一下每次请求都需要携带的参数，比如 token，timestamp等等，根据项目自己配置
service.interceptors.request.use(
    function (config) {
        // console.log(config);
        // 每次请求带上token和用户编号
        // if (config.url !== '/youzheng/getmsg/signin') {
        //     config.headers['Token'] = storage.getItem('token')
        //     // config.headers['Authorization'] = store.getters.userId
        // }
        // console.log(window.baseUrl);
        // config.headers['Content-Type'] = 'Access-Control-Allow-Headers, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild';
        // config.headers['Access-Control-Allow-Origin'] = 'http://localhost:8009'
        // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // config.headers['Content-Type'] = 'multipart/form-data';
        // config.headers['dataType'] = 'jsonp';
        // config.headers['jsonp'] = 'callback'
        // 每次请求带上时间戳 防刷处理
        if (config.method === 'get' || config.method === 'delete') {
            // console.log(config.method + '1111');
            config.params = {
                ...config.params,
                // timestamp: Date.parse(new Date()) / 1000
            }
        } else if (config.method === 'post' || config.method === 'put') {
            // console.log(config.method + '222');
            config.data = {
                ...config.data,
                // timestamp: Date.parse(new Date()) / 1000
            }
        } else {
            // console.log(config.method + '333');
            config.data = {
                ...config.data,
                // timestamp: Date.parse(new Date()) / 1000
            }
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)


// 添加响应拦截器 ，这里的 response是接收服务器返回后的结果，也可以在这里做一些状态判断
service.interceptors.response.use(
    response => {
        /**
         * 判断服务器请求是否成功
         * @method if
         * @param  {[type]} response [description]
         * @return {[type]}          [description]
         */
        if (response.status !== 200) {
            return Promise.reject(new Error('网络异常，请稍后重试'))
        }
        const res = response.data
        if(response.config.url === '/web/logon' || response.config.url === '/web/logou'){
            return response
        }

        if (res) {
            return res;
        }
    },error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 提供axios给外部调用
export default service
