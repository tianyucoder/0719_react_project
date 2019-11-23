import Counter from '../components/counter'
import {createIncrementAction,createDecrementAction} from '../redux/action_creators'
import {connect} from 'react-redux'

//完整写法
/* function mapStateToProps(state) {
  return {count:state}
} */

//简写方式
//let mapStateToProps = state => ({count:state})

//完整写法
/* function mapDispatchToProps(dispatch) {
  return {
    increment:(value)=>{dispatch(createIncrementAction(value))},
    decrement:(value)=>{dispatch(createDecrementAction(value))},
  }
} */

//简写方式
/* let mapDispatchToProps = dispatch => ({
  increment:(value)=>{dispatch(createIncrementAction(value))},
  decrement:(value)=>{dispatch(createDecrementAction(value))},
}) */

//完整写法
//export default connect(mapStateToProps,mapDispatchToProps)(Counter)

//简写方式
export default connect(
  state => ({count:state}),
  {
    increment:createIncrementAction,
    decrement:createDecrementAction
  }
)(Counter)

//按照之前的写法：
//如果connect函数的第二个参数传递的是：mapDispatchToProps
//那么UI组件接收到的increment是：(value)=>{dispatch(createIncrementAction(value))}
//那么UI组件接收到的decrement是：(value)=>{dispatch(createDecrementAction(value))}

//按照新的写法：
//如果connect函数的第二个参数传递的是：{increment:createIncrementAction}
//那么UI组件接收到的increment是：(value)=>{dispatch(createIncrementAction(value))}

//connect函数做了如下的事情
/* function connect(createIncrementAction) {
  return (value)=>{dispatch(createIncrementAction(value))
} */



