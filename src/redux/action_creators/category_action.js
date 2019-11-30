import {SAVE_CATEGORY_LIST} from '../action_types'

//创建保存用户信息的action
export const createSaveCategoryAction = (value)=> {
  return {type:SAVE_CATEGORY_LIST,data:value}
}
