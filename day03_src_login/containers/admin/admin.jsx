import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'

class Admin extends Component{

  //退出登录的回调
  logout = ()=>{
    //触发redux删除所保存的用户信息
    this.props.deleteUserInfo()
  }
  
  //在render里，若想实现跳转，最好用<Redirect>
  render(){
    //从redux中获取user和isLogin
    const {user,isLogin} = this.props.userInfo
    if(!isLogin){
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

//从redux中获取状态和操作状态的方法
export default connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)(Admin)