import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import qs from 'querystring'
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout: 4000,//配置超时时间
});

//请求拦截器
instance.interceptors.request.use((config)=> {
  //进度条开始
  NProgress.start()
  //从配置对象中获取method和data
  const {method,data} = config 
  //若是post请求
  if(method.toLowerCase() === 'post'){
    //若传递过来的参数是对象，转换成urlencoded形式
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config;
});

//响应拦截器
instance.interceptors.response.use(
  (response)=>{
    //进度条结束
    NProgress.done()
    //请求若成功，返回真正的数据
    return response.data;
  }, 
  (error) => {
    //进度条结束
    NProgress.done()
    //请求若失败，提示错误（这里可以处理所有请求的异常）
    message.error(error.message,1)
    //中断Promise链
    return new Promise(()=>{})
  }
);

export default instance