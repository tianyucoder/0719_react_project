import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'

const instance = axios.create({
  timeout: 4000,
});

//请求拦截器
instance.interceptors.request.use((config)=> {
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
    //请求若成功，走这里
    return response.data;
  }, 
  (error) => {
    //请求若失败，走这里
    message.error(error.message,1)
    return new Promise(()=>{})
  }
);

export default instance