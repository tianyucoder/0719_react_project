import React,{Component} from 'react'
import {Card,Button,Icon,Table, message,Modal,Form,Input,Tree } from 'antd';
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole,reqAuthRole} from '../../api'
import menuList from '../../config/menu_config'
const {Item} = Form
const {TreeNode} = Tree;


@Form.create()
class Role extends Component{

  state = {
    isShowAdd:false,
    isShowAuth:false,
    roleList:[],
    menuList,
    checkedKeys: ['product','line'],//选中的菜单
  }

  getRoleList = async()=>{
    let result = await reqRoleList()
    const {status,data} = result
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
      const {status,msg} = result
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
    reqAuthRole({_id:'',})
  }

  //授权弹窗--取消按钮
  handleAuthCancel = ()=>{
    this.setState({isShowAuth:false})
  }

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  renderTreeNodes = (data) =>
      data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
  });

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
    //treeData是属性菜单的源数据
    const treeData = this.state.menuList
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
          <Tree
            checkable //允许选中
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll={true}
          >
            <TreeNode title='平台功能' key='top'>
              {this.renderTreeNodes(treeData)}
            </TreeNode>
          </Tree>
        </Modal>
      </div>
    )
  }
}

export default Role