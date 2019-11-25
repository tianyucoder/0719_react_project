import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import qs from 'querystring'
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout: 4000,
});

//请求拦截器
instance.interceptors.request.use((config)=> {
  NProgress.start()
  const {method,data} = config
  //若是post请求
  if(method.toLowerCase() === 'post'){
    //若传递过来的参数是对象
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config;
});

//响应拦截器
instance.interceptors.response.use(
  (response)=>{
    NProgress.done()
    //请求若成功，走这里
    return response.data;
  }, 
  (error) => {
    NProgress.done()
    //请求若失败，走这里
    message.error(error.message,1)
    return new Promise(()=>{})
  }
);

export default instance