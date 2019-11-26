/* 
  1.项目中所有请求由该文件发出
  2.以后每当发请求之前，都要在该文件里添加一个方法
*/

//引入我们自定义的myAxios
import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
//引入请求的基本路径
import {BASE_URL,WEATHER_AK,CITY} from '../config'

//登录请求
export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})

//获取商品列表请求
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/manage/category/list`)

//获取天气信息（百度接口）
export const reqWeather = ()=>{
  return new Promise((resolve,reject)=>{
      jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`,(err,data)=>{
      if(err){
        message.error('请求天气接口失败，请联系管理员')
        return new Promise(()=>{})
      }else{
        const {dayPictureUrl,temperature,weather} = data.results[0].weather_data[0]
        let weatherObj = {dayPictureUrl,temperature,weather}
        resolve(weatherObj)
      }
    })
  })
}

