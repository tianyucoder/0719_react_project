import React,{Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'
import {Layout} from 'antd'
//import {reqCategoryList} from '../../api/index'
import Header from './header/header'
import './css/admin.less'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
const {Footer, Sider, Content } = Layout;


@connect(
  state => ({userInfo:state.userInfo}),
  {deleteUserInfo:createDeleteUserInfoAction}
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
    const {isLogin} = this.props.userInfo
    //判断用户是否登录，若未登录跳转login页面
    if(!isLogin) return <Redirect to="/login"/>
    else{
      return (
        <Layout className="admin">
          <Sider className='sider'>Sider</Sider>
          <Layout>
            <Header className="header">Header</Header>
            <Content className="content">
              <Switch>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/prod_about/category" component={Category}/>
                <Route path="/admin/prod_about/product" component={Product}/>
                <Route path="/admin/user" component={User}/>
                <Route path="/admin/role" component={Role}/>
                <Route path="/admin/charts/bar" component={Bar}/>
                <Route path="/admin/charts/line" component={Line}/>
                <Route path="/admin/charts/pie" component={Pie}/>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer">
              推荐使用谷歌浏览器，获取最佳用户体验
            </Footer>
          </Layout>
        </Layout>
      )
    }
  }
}
export default Admin

