import React,{Component} from 'react'
import {Icon,Button,Modal} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import {reqWeather} from '../../../api'
import './header.less'
const {confirm} = Modal;

@connect(
  state => ({userInfo:state.userInfo}),
  {deleteUser:createDeleteUserInfoAction}
)
class Header extends Component{

  state = {
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
  }

  getWeather = async()=>{
    let result = await reqWeather()
    console.log(result);
  }

  componentDidMount(){
    //给screenfull绑定监听
    screenfull.on('change', () => {
      let isFull = !this.state.isFull
      this.setState({isFull})
    });
    setInterval(()=>{
      this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    },1000)
    this.getWeather()
  }

  //切换全屏按钮的回调
  fullScreen = ()=>{
    screenfull.toggle()
  }

  //点击退出登录的回调
  logOut = ()=>{
    let {deleteUser} = this.props
    confirm({
      title: '确定退出？',
      content: '若退出需要重新登录',
      cancelText:'取消',
      okText:'确认',
      onOk(){
        deleteUser()
      },
    });
  }


  render(){
    let {isFull} = this.state
    let {user} = this.props.userInfo
    return (
      <header className="header">
        <div className="header-top">
            <Button size="small" onClick={this.fullScreen}>
              <Icon type={isFull ? 'fullscreen-exit':'fullscreen'}/>
            </Button>
            <span className="username">欢迎，{user.username}</span>
            <Button type="link" onClick={this.logOut} >退出登录</Button>
        </div>
        <div className="header-bottom">
            <div className="header-bottom-left">
              柱状图
            </div>
            <div className="header-bottom-right">
              {this.state.date}
              <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
              晴&nbsp;&nbsp;&nbsp;温度：2 ~ -5
            </div>
        </div>
      </header>
    )
  }
}
export default Header