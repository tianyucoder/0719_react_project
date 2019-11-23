import Counter from '../components/counter'
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
} from '../redux/actions/counter_action'

import {connect} from 'react-redux'

//简写方式
export default connect(
  /* {
  count:0,
  person:[],
} */
  state => ({count:state.count,person:state.person}), //这里的state是store所管理的那个“超级超级超级大的”对象，里面包含着所有的状态
  {
    increment:createIncrementAction,
    decrement:createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }
)(Counter)



