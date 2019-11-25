import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'

class Admin extends Component{

  componentDidMount(){
    console.log(this.props);
  }

  logout = ()=>{
    this.props.deleteUserInfo()
  }
  
  //在render里，若想实现跳转，最好用<Redirect>
  render(){
    const {user,isLogin} = this.props.userInfo
    if(!isLogin){
      console.log('没有登录');
      return <Redirect to="/login"/>
    }else{
      console.log('登录了');
      return (
        <div>
          <div>我是Admin组件，你的名字是:{user.username}</div>
          <button onClick={this.logout}>退出登录</button>
        </div>
      )
    }
  }
}

//如下代码中的所有key是控制容器组件传递给UI组件的key
//如下代码中的所有value是控制容器组件传递给UI组件的value
export default connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)(Admin)