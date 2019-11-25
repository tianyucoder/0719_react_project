import {combineReducers} from 'redux'
import loginReducer from './login_recuder'


export default combineReducers({
  //该对象里的key决定着store里保存该状态的key
  //该对象里的value决定着store里保存该状态的value
  userInfo:loginReducer
})
