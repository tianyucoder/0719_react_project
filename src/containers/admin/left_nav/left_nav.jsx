import React, { Component } from 'react'
import {Menu, Icon} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action'
import logo from '../../../static/imgs/logo.png'
import menuList from '../../../config/menu_config'
import './left_nav.less'
const {SubMenu,Item} = Menu;

@connect(
  state => ({
    menus:state.userInfo.user.role.menus,
    username:state.userInfo.user.username,
  }),
  {
    saveTitle:createSaveTitleAction
  }
)
@withRouter
class LeftNav extends Component {

  componentDidMount(){
    //console.log(this.props.location.pathname.split('/').splice(2));
  }

  hasAuth = (item)=>{
    //获取当前用户可以看到的菜单的数组
    const {menus,username} = this.props
    //console.log(this.props.menus); //[ 'home','category','user','line']
    //console.log(item);//{title: "首页", key: "home", icon: "home", path: "/admin/home"}
    //如果是超级管理员，可以查看所有菜单
    if(username === 'admin') return true
    //如果没有子菜单，看当前菜单的key是否在menus中
    else if(!item.children){
      return menus.find((item2)=> item2 === item.key)
    }
    //如果有子菜单，看子菜单里的每一个菜单是否包含在menus中
    else if (item.children){
      return item.children.some((item3)=> menus.indexOf(item3.key) !== -1)
    }
  }


  //用于创建菜单的函数
  createMenu = (target)=>{
    return target.map((item)=>{
      if(this.hasAuth(item)){
        if(!item.children){
          return (
            <Item key={item.key} onClick={()=>{this.props.saveTitle(item.title)}}>
              <Link to={item.path}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Item>
          )
        }else{
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon}/>
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.createMenu(item.children)}
            </SubMenu>
          )
        }
			}
			return null
    })
  }

  render() {
    let {pathname} = this.props.location
    return (
      <div>
        <header className="nav-header">
          <img src={logo} alt=""/>
          <h1>商品管理系统</h1>
        </header>
        <Menu
          selectedKeys={pathname.indexOf('product') !== -1 ? 'product': pathname.split('/').reverse()[0]}
          defaultOpenKeys={pathname.split('/').splice(2)}
          mode="inline"
          theme="dark"
        >
        {
          this.createMenu(menuList)
        }
        </Menu>
      </div>
    )
  }
}
export default LeftNav
