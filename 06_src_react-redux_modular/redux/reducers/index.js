import counterReducer from './counter_reducer'
import personReducer from './person_reducer'
import {combineReducers} from 'redux'


/* store中保存了所有组件的状态，是一个一般对象，例如下面的格式：

{
  key1:xxxx,
  key2:yyyy,
  key3:zzzz
} */

//combineReducers方法,接收一个对象作为参数
//对象中的key就是store中保存该状态的key，
//对象中的value就是store中保存该状态的value
export default combineReducers({
  count:counterReducer,
  person:personReducer
})

//store中保存的state，如下：
/* {
  count:0,
  person:[],
} */