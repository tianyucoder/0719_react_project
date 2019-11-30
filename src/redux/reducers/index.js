import {combineReducers} from 'redux'
import loginReducer from './login_recuder'
import menuRecuder from './menu_recuder'
import productRecuder from './product_recuder'
import categoryRecuder from './category_reducer'

//整合所有reducer汇总所有状态
export default combineReducers({
  //该对象里的key和value决定着store里保存该状态的key和value
  userInfo:loginReducer,
  title:menuRecuder,
  productList:productRecuder,
  categoryList:categoryRecuder
})
