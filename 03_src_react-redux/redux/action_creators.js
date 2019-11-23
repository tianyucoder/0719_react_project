import {DECREMENT,INCREMENT} from './action_types'

//创建increment的action
export const createIncrementAction = value=>({type:INCREMENT,data:value})

export const createDecrementAction = value=>({type:DECREMENT,data:value})