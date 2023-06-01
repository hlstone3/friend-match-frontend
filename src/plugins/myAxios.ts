import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://127.0.0.1:8080/api'
});

// 全局设置 axios 发送请求带上cookie
myAxios.defaults.withCredentials = true

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response?.data?.code == 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirectUrl=${redirectUrl}`;
    }

    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;