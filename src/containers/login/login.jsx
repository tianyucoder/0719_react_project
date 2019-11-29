import React,{Component} from 'react'
import {Form,Icon,Input,Button,message} from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import {reqLogin} from '../../api'
import './css/login.less'
import logo from '../../static/imgs/logo.png'
const {Item} = Form

@connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:createSaveUserInfoAction,
  }
)
@Form.create()
class Login extends Component{

  //点击登录按钮的回调
  handleSubmit = (event)=>{
    //阻止默认事件--禁止form表单提交---通过ajax发送
    event.preventDefault();
    //表单的统一验证
    this.props.form.validateFields(async(err, values) => {
      //获取用户输入
      const {username,password} = values
      if(!err){
        //若用户输入无错误，发送登录请求
        let result = await reqLogin(username,password)
        //从响应中获取：请求状态、错误信息、数据
        const {status,msg,data} = result
        if(status === 0){
          //1.服务器返回的user信息，还有token交由redux管理
          this.props.saveUserInfo(data)
          //2.跳转admin页面
          this.props.history.replace('/admin')
        }else message.warning(msg,1)
      }else message.error('表单输入有误，请检查！')
    });
  }

  //密码的验证器---每当在密码输入框输入东西后，都会调用此函数去验证输入是否合法。自定义校验，即：自己写判断
  pwdValidator = (rule,value,callback)=>{
    if(!value){
      callback('密码必须输入')
    }else if(value.length>12){
      callback('密码必须小于等于12位')
    }else if(value.length<4){
      callback('密码必须大于等于4位')
    }else if(!(/^\w+$/).test(value)){
      callback('密码必须是字母、数字、下划线组成')
    }else{
      callback()
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    //从redux中获取用户的登录状态
    const {isLogin} = this.props;
    //如果已经登录了，重定向到admin页面
    if(isLogin)return <Redirect to="/admin/home"/>
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
            {getFieldDecorator('username', {
                rules: [
                  {required: true, message: '用户名必须输入！'},
                  {max: 12, message: '用户名必须小于等于12位'},
                  {min: 4, message: '用户名必须大于等于4位'},
                  {pattern: /^\w+$/, message: '用户名必须是字母、数字、下划线组成'},
                ],
              })(
                <Input 
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="用户名"
                />,
              )}
            </Item>
            <Item>
            {getFieldDecorator('password', {
                rules: [
                  {validator: this.pwdValidator},
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Login

