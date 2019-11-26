import axios from 'axios'
import {message} from 'antd'
import NProgress from 'nprogress'
import qs from 'querystring'
import store from '../redux/store'
import {createDeleteUserInfoAction} from '../redux/action_creators/login_action'
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout: 4000,//配置超时时间
});

//请求拦截器
instance.interceptors.request.use((config)=> {
  //进度条开始
  NProgress.start()
  //从redux中获取之前所保存的token
  const {token} = store.getState().userInfo
  //向请求头中添加token，用于校验身份
  if(token) config.headers.Authorization = 'atguigu_' + token
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
    if(error.response.status === 401){
      message.error('身份校验失败，请重新登录',1)
      //分发一个删除用户信息的action
      store.dispatch(createDeleteUserInfoAction())
    }else{
        //请求若失败，提示错误（这里可以处理所有请求的异常）
        message.error(error.message,1)
    }
    //中断Promise链
    return new Promise(()=>{})
  }
);

export default instance