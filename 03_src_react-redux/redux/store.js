//从redux中引入createStore，用于创建最核心的store对象
import {createStore} from 'redux' 
//引入reducer
import reducer from './reducer'

export default createStore(reducer)