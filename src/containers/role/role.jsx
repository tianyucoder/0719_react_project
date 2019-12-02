import React,{Component} from 'react'
import {Card,Button,Icon,Table, message,Modal,Form,Input} from 'antd';
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole} from '../../api'
const {Item} = Form

@Form.create()
class Role extends Component{

  state = {
    isShowAdd:false,
    isShowAuth:false,
    roleList:[]
  }

  getRoleList = async()=>{
    let result = await reqRoleList()
    const {status,data,msg} = result
    if(status===0) this.setState({roleList:data})
  }

  componentDidMount(){
    this.getRoleList()
  }

  //新增角色--确认按钮
  handleOk = ()=>{
    this.props.form.validateFields(async(err, values) => {
      if(err) return
      let result = await reqAddRole(values)
      const {status,data,msg} = result
      if(status===0) {
        message.success('新增角色成功')
        this.getRoleList()
        this.setState({isShowAdd:false})
      }
      else message.error(msg)
    });
  }

  //新增角色--取消按钮
  handleCancel = ()=>{
    this.setState({isShowAdd:false})
  }

  //授权弹窗--确认按钮
  handleAuthOk = ()=>{
    alert('提交了')
  }

  //授权弹窗--取消按钮
  handleAuthCancel = ()=>{
    this.setState({isShowAuth:false})
  }
  
  render(){
    const dataSource = this.state.roleList
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=> dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(time)=> time ? dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss') : ''
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        key: 'option',
        render: () => <Button type='link' onClick={()=>{this.setState({isShowAuth:true})}}>设置权限</Button>
      }
    ];
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Card
          title={<Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>
                  <Icon type="plus"/>
                  新增角色
                 </Button>}
          style={{ width: '100% '}}
        >
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered
            pagination={{defaultPageSize:5}}
            rowKey="_id"
          />
        </Card>
        {/* 新增角色提示框 */}
        <Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form onSubmit={this.handleOk}>
            <Item>
              {getFieldDecorator('roleName', {
                initialValue:'',
                rules: [
                  {required: true, message: '角色名必须输入' },
                ],
              })(
                <Input placeholder="请输入角色名" />
              )}
            </Item>
          </Form>
        </Modal>
        {/* 设置权限提示框 */}
        <Modal
          title="设置权限"
          visible={this.state.isShowAuth}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText="确认"
          cancelText="取消"
        >
          此处为权限列表<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Modal>
      </div>
    )
  }
}

export default Role