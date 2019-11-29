import {SAVE_PROD_LIST} from '../action_types'

//创建保存用户信息的action
export const createSaveProductAction = (value)=> {
  return {type:SAVE_PROD_LIST,data:value}
}
