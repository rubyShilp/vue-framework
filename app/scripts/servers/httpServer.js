import axios from 'axios';
import {token,sessionOut,isJson, urlParams} from './../util/core.js';
axios.defaults.headers = { 'Content-Type': 'application/json;charset=utf-8;charset=UTF-8' || 'multipart/form-data','X-Frame-Options':'SAMEORIGIN'};
axios.defaults.baseURL = '/';
//请求拦截器
axios.interceptors.request.use(
    (config)=>{
        //根据所传参数的不同判断是否序列化参数
        // if (isJson(config.data)) {
        //     config.data = urlParams(config.data);
        // }
        if(token()){
            config.headers.token=token();
        }
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)
//请求响应拦截器
axios.interceptors.response.use(
    (response)=>{ 
        if(response.data.position==='sessionOut'){
            sessionStorage.removeItem('TOKEN');
            sessionOut();
            return;
        }else if(response.status===200){
            return response;
        }
    },
    (error)=>{
        return Promise.reject(error);
    }
);
//post请求
export function post(url,params){
    return axios.post(url,params);
}
//get请求
export function get(url,params){
    return axios.get(url,params);
}
//上传
export function upload(url,params){
    return axios.post(url,params);
}
//post下载文件
export function postDownload(url,params){ 
    return axios.post(url,params,{responseType:'blob'});
}