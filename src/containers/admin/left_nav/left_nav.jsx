import React, { Component } from 'react'
import {Menu, Icon} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import logo from '../../../static/imgs/logo.png'
import menuList from '../../../config/menu_config'
import './left_nav.less'
const {SubMenu,Item} = Menu;

@withRouter
class LeftNav extends Component {

  componentDidMount(){
    console.log(this.props.location.pathname.split('/').splice(2));
  }

  //用于创建菜单的函数
  createMenu = (target)=>{
    return target.map((item)=>{
      if(!item.children){
        return (
          <Item key={item.key}>
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
          defaultSelectedKeys={pathname.split('/').reverse()[0]}
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
