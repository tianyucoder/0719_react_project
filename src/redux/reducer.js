
let initState = 0 //设置初始化状态
export default function operaCount(preState=initState,action) {
  //规则：在reducer中不可以修改传递过来的参数
  console.log('------reducer调用了--------',action)
  //根据action中的type和data，决定应该怎么操作状态
  const {type,data} = action
  let newState
  switch (type) {
    case 'increment':
      newState = preState + data
      console.log(newState);
      return newState
    case 'decrement':
      newState = preState - data
      console.log(newState);
      return newState
    default:
      return preState
  }
}