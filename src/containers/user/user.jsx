import React,{Component} from 'react'
import {Card,Button,Icon,Table, message,Modal,Form,Input,Select} from 'antd';
import dayjs from 'dayjs'
import {reqUserList,reqAddUser} from '../../api'
import {PAGE_SIZE} from '../../config'
const {Item} = Form
const {Option} = Select

@Form.create()
class User extends Component{

  state = {
    isShowAdd:false, //是否展示新增弹窗
    userList:[],//用户列表
    roleList:[]//角色列表
  }

  getUserList = async()=>{
    let result = await reqUserList()
    const {status,data} = result
    if(status === 0) this.setState({
      userList:data.users.reverse(),
      roleList:data.roles
    })
  }

  componentDidMount(){
    this.getUserList()
  }

  //新增用户弹窗----确定按钮回调
  handleOk = ()=>{
    this.props.form.validateFields(async(err, values) => {
      if(err) return
      let result = await reqAddUser(values)
      const {status,data,msg} = result
      if(status===0){
        message.success('添加用户成功')
        let userList = [...this.state.userList]
        userList.unshift(data)
        this.setState({userList,isShowAdd:false})
      }
      else message.error(msg,1)
    });
  }

  //新增用户弹窗----取消按钮回调
  handleCancel = ()=>{
    this.setState({isShowAdd:false})
  }

  
  render(){
    const dataSource = this.state.userList
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: time => dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(id)=>{
          let result = this.state.roleList.find((item)=>{
            return item._id === id
          })
          if(result) return result.name
        }
      },
      {
        title: '操作',
        key: 'option',
        render: () => (
          <div>
            <Button 
              type='link' 
             >修改
            </Button>
            <Button 
              type='link' 
             >删除
            </Button>
          </div>
          )
      }
    ];
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Card
          title={
            <Button type='primary' onClick={()=>{this.setState({isShowAdd:true});this.props.form.resetFields()}}>
              <Icon type="plus"/>创建用户
            </Button>
          }
        >
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered
            pagination={{defaultPageSize:PAGE_SIZE}}
            rowKey="_id"
          />
        </Card>
        {/* 新增角色提示框 */}
        <Modal
          title="添加用户"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form labelCol={{span:4}} wrapperCol={{span:16}}>
            <Item label="用户名">
              {getFieldDecorator('username', {
                initialValue:'',
                rules: [{required: true, message: '用户名必须输入' },],
              })(<Input placeholder="请输入用户名"/>)}
            </Item>
            <Item label="密码">
              {getFieldDecorator('password', {
                initialValue:'',
                rules: [{required: true, message: '密码必须输入' },],
              })(<Input placeholder="请输入密码"/>)}
            </Item>
            <Item label="手机号">
              {getFieldDecorator('phone', {
                initialValue:'',
                rules: [{required: true, message: '手机号必须输入' },],
              })(<Input placeholder="请输入手机号"/>)}
            </Item>
            <Item label="邮箱">
              {getFieldDecorator('email', {
                initialValue:'',
                rules: [{required: true, message: '邮箱必须输入' },],
              })(<Input placeholder="请输入邮箱"/>)}
            </Item>
            <Item label="角色">
              {getFieldDecorator('role_id', {
                initialValue:'',
                rules: [{required: true, message: '必须选择一个角色' },],
              })(
                <Select>
                  <Option value=''>请选择一个角色</Option>
                  {
                    this.state.roleList.map((item)=>{
                      return <Option key={item._id} value={item._id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default User