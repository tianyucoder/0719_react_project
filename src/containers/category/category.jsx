import React,{Component} from 'react'
import {Card,Button,Icon,Table,message,Modal,Form,Input} from 'antd';
import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../api'
import {PAGE_SIZE} from '../../config'
const {Item} = Form

@Form.create()
class Category extends Component{

  state = {
    categoryList:[], //商品分类列表
    visible:false,//控制弹窗的展示或隐藏
    operType:'',//操作类型（新增？修改？）
    isLoading:true,//是否处于加载中
    modalCurrentValue:'',//弹窗显示的值---用于数据回显
    modalCurrentId:''//
  }

  componentDidMount(){
    //一上来，就请求商品分类列表
    this.getCategoryList()
  }

  //获取商品分类列表
  getCategoryList = async()=>{
    let result = await reqCategoryList()
    this.setState({isLoading:false})
    const {status,data,msg} = result
    if(status===0) this.setState({categoryList:data.reverse()})
    else message.error(msg,1)
  }

  //用于展示弹窗--作为新增
  showAdd = () => {
    this.setState({
      operType:'add',
      modalCurrentValue:'',
      modalCurrentId:'',
      visible: true,
    });
  };

  //用于展示弹窗--作为修改
  showUpdate = (item) => {
    const {_id,name} = item
    this.setState({
      modalCurrentValue:name,
      operType:'update',
      visible: true,
      modalCurrentId:_id
    });
  };

  //真正执行新增的操作
  toAdd = async(values)=>{
    let result = await reqAddCategory(values)
    const {status,data,msg} = result
    if(status === 0) {
      message.success('新增商品分类成功')
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(data)
      this.setState({categoryList})
      this.setState({visible: false}); //隐藏弹窗
      this.props.form.resetFields()//重置表单
    }
    if(status === 1) message.error(msg,1)
  }

  toUpdate = async(categoryObj)=>{
    let result = await reqUpdateCategory(categoryObj)
    const {status,msg} = result
    if(status === 0) {
      message.success('更新分类名称成功',1)
      this.getCategoryList()
      this.setState({
        visible: false
      }); //隐藏弹窗
      this.props.form.resetFields()//重置表单
    }else{
      message.error(msg,1)
    }
  }

  //点击弹窗ok按钮的回调
  handleOk = () => {
    const {operType} = this.state
    this.props.form.validateFields((err, values) => {
      if(err) {
        message.warning('表单输入有误，请检查',1)
        return
      }
      if(operType==='add') this.toAdd(values)
      if(operType==='update'){
        const categoryId = this.state.modalCurrentId
        const categoryName = values.categoryName
        const categoryObj = {categoryId,categoryName}
        this.toUpdate(categoryObj)
      }
    });
  };

  //点击弹窗取消按钮的回调
  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields()
  };

  render(){
    const dataSource = this.state.categoryList
    let {operType,visible} = this.state
    let {getFieldDecorator} = this.props.form
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        //dataIndex: 'key',
        key: 'age',
        render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
        width:'25%',
        align:'center'
      },
    ];
    
    return (
      <div>
        <Card 
          extra={<Button type="primary" onClick={this.showAdd}><Icon type="plus-circle" />添加</Button>}
        >
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered
            rowKey="_id"
            pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
            loading={this.state.isLoading}
          />
        </Card>
        <Modal
          title={operType === 'add' ? '新增分类' : '修改分类'}
          visible={visible}
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
            {getFieldDecorator('categoryName', {
                initialValue:this.state.modalCurrentValue,
                rules: [
                  {required: true, message: '分类名必须输入！'},
                ],
              })(
                <Input 
                    placeholder="请输入分类名"
                />,
              )}
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Category