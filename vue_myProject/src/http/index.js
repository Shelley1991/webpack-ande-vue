import axios from 'axios';
import store from '../store';
import router from '@/router';
import baseUrl from './config';
import api from './api';


// axios.defaults.timeout = 30000; //设置默认的请求超时时间是30s

// axios.defaults.baseURL = baseUrl;

// 设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//或者{headers:{'Content-Type':'application/x-www-form-urlencoded'}}

const service = axios.create({
    baseURL: baseUrl,
    headers: {'X-Custom-Header': 'foobar'},
    timeout: 30000
})

// 请求拦截
service.interceptors.request.use(
    config => {
        debugger
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token &&(config.headers.Authorization = token)
        return config;
    },
    error =>{
        return Promise.error(error)
    }
)

//响应拦截
service.interceptors.response.use(
    response =>{
        if(response.status == '200'){
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error =>{
        if(error.response.status){
            switch (error.response.status){
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case '401':                    
                    router.replace({                        
                        path: '/login',                        
                        query: { 
                            redirect: router.currentRoute.fullPath 
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面                
                case '403':
                     alert({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);                    
                    break; 

                // 404请求不存在
                case '404':
                    alert({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    alert({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }

        }
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(api, params){    
    return new Promise((resolve, reject) =>{        
        service.get(api, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        service.post(url, JSON.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}


export default service;
