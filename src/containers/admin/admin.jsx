import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createDemo1Action} from '../../redux/action_creators/test_action'

class Admin extends Component{

  componentDidMount(){
    console.log(this.props);
  }
  
  render(){
    return (
      <div>
        Admin
      </div>
    )
  }
}

//如下代码中的所有key是控制容器组件传递给UI组件的key
//如下代码中的所有value是控制容器组件传递给UI组件的value
export default connect(
  state => ({peiqi:state.test}),
  {
    demo1:createDemo1Action
  }
)(Admin)