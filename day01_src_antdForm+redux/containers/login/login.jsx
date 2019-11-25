import React,{Component} from 'react'
import {Form,Icon,Input,Button,message} from 'antd';
import {connect} from 'react-redux'
import {createDemo1Action,createDemo2Action} from '../../redux/action_creators/test_action'
import './css/login.less'
import logo from './imgs/logo.png'
const {Item} = Form

class Login extends Component{
  componentDidMount(){
    console.log(this.props);
  }

  //点击登录按钮的回调
  handleSubmit = (event)=>{
    event.preventDefault();//阻止默认事件--禁止form表单提交---通过ajax发送
    this.props.form.validateFields((err, values) => {
      if(!err){
        //alert('向服务器发送登录请求')
        this.props.demo2('0719')
      }else{
        message.error('表单输入有误，请检查！')
      }
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
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统{this.props.test}</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
            {getFieldDecorator('username', {
              /*
                用户名/密码的的合法性要求
                  1). 必须输入
                  2). 必须大于等于4位
                  3). 必须小于等于12位
                  4). 必须是字母、数字、下划线组成
                */
                //定义用户名校验规则---“声明式验证”，即：自己不去做实际判断，只是声明
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

/* 严重注意：
    1.暴露的根本不是我们定义的Login组件，而是经过加工（包装）的Login组件。
    2.Form.create()调用返回一个函数，该函数加工了Login组件，生成了一个新组件，新组件实例对象的props多了一个强大的form属性，能完成验证。
    3.我们暴露出去的不再是Login，而是通过Login生成的一个新组件。 
*/

 export default connect(
  state => ({test:state.test}),
  {
    demo1:createDemo1Action,
    demo2:createDemo2Action,
  }
)(Form.create()(Login))

/* 
  总结：
    1. 高阶函数
      定义: 如果函数接收的参数是函数或者返回值是函数
      例子: Promise() / then() / 定时器 / 数组遍历相关方法 / bind() / $() / $.get() / Form.create()
      好处: 更加动态, 更加具有扩展性
      
    2. 高阶组件
      定义: 参数为组件，返回值为新组件的函数
      例子: Form.create()(组件) / withRouter(组件) / connect()(组件)
      与高阶函数的关系?  
          高阶组件是一个特别的高阶函数
          接收的是组件函数, 同时返回新的组件函数
      作用:
          React 中用于复用组件逻辑的一种高级技巧

    Form.create()(Login), 接收一个Form组件, 返回一个新组件
      Form.create = function () {
        const form = 创建一个强大form对象
        return function (FormComponent) {
          return class WrapComponent extends Component {
            render () {
              return <Login form={form}/>
            }
          }
        }
      }
      const LoginWrap = Form.create()(Login)
*/

