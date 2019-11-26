import React,{Component} from 'react'
import {Icon,Button} from 'antd'
import './header.less'

export default class Header extends Component{
  render(){
    return (
      <header className="header">
        <div className="header-top">
            <Button size="small">
              <Icon type="fullscreen" />
            </Button>
            <span className="username">欢迎，佩奇</span>
            <Button type="link" >退出登录</Button>
        </div>
        <div className="header-bottom">
            <div className="header-bottom-left">
              柱状图
            </div>
            <div className="header-bottom-right">
              2019-11-26 11:50:09
              <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
              晴&nbsp;&nbsp;&nbsp;温度：2 ~ -5
            </div>
        </div>
      </header>
    )
  }
}