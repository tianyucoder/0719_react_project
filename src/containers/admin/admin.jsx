import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'

@connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
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
    //判断用户是否登录，若未登录跳转login页面
    if(!isLogin) return <Redirect to="/login"/>
    else{
      return (
        <div>
          <div>我是Admin组件，你的名字是:{user.username}</div>
          <button onClick={this.logout}>退出登录</button>
        </div>
      )
    }
  }
}

export default Admin
