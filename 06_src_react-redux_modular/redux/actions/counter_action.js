import {DECREMENT,INCREMENT} from '../action_types'

//创建一个同步的action，用于增加
export const createIncrementAction = value=>({type:INCREMENT,data:value})
//创建一个同步的action，用于减
export const createDecrementAction = value=>({type:DECREMENT,data:value})

//创建一个异步的action，用于增加
export const createIncrementAsyncAction = (value,delay)=> {
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch(createIncrementAction(value))
    },delay)
  }
}