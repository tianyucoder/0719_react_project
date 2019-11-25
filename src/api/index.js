//项目中所有请求由这个文件发出
import myAxios from './myAxios'

//发起登录请求
export const reqLogin = (username,password)=> myAxios.post('http://localhost:3000/login',{username,password})
