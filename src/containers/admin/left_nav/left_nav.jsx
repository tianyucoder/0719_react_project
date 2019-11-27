import React, { Component } from 'react'
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom'
import logo from '../../../static/imgs/logo.png'
import './left_nav.less'
const {SubMenu,Item} = Menu;

export default class LeftNav extends Component {
  render() {
    return (
      <div>
        <header className="nav-header">
          <img src={logo} alt=""/>
          <h1>商品管理系统</h1>
        </header>
        <Menu
          defaultSelectedKeys={'home'}
          defaultOpenKeys={['1']}
          mode="inline"
          theme="dark"
        >
          
            <Item key="home">
              <Link to="/admin/home">
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </Item>
          
          <SubMenu
            key="prod_about"
            title={
              <span>
                <Icon type="appstore"/>
                <span>商品</span>
              </span>
            }
          >
            <Item key="category">
              <Link to="/admin/prod_about/category">
                <Icon type="unordered-list"/>
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="product">
              <Icon type="tool" />
              <span>商品管理</span>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
