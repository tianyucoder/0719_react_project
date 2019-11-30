import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,message} from 'antd'
import {connect} from 'react-redux'
import {reqCategoryList} from '../../api'
import PicturesWall from './picture_wall'
const {Item} = Form
const {Option} = Select

@connect(
  state => ({categoryList:state.categoryList}),
  {}
)
@Form.create()
class AddUpdate extends Component {

  state = {
    categoryList:[]
  }

  getCategoryList = async()=>{
    console.log('redux中没有数据了，只能请求后台');
    let result = await reqCategoryList()
    const {status,data,msg} = result
    if(status === 0) this.setState({categoryList:data})
    else message.error(msg)
  }

  componentDidMount(){
    const {categoryList} = this.props
    if(categoryList.length)this.setState({categoryList})
    else this.getCategoryList()
    
  }

  handleSubmit = (event)=>{
    event.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if(err) return
      console.log('发请求了',values);
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    
    return (
        <Card 
          title={
            <div>
              <Button type="link" onClick={this.props.history.goBack}>
                <Icon type="arrow-left"/>
                <span>返回</span>
              </Button>
              <span>商品添加</span>
            </div>}
        >
          <Form 
            onSubmit={this.handleSubmit}
            labelCol={{md:2}}
            wrapperCol={{md:7}}
          >
            <Item label="商品名称">
              {
                getFieldDecorator('name', {
                  initialValue:'',
                  rules: [{required: true, message: '请输入商品名称' }],
                })(
                  <Input
                    placeholder="商品名称"
                  />
                )
              }
            </Item>
            <Item label="商品描述">
              {getFieldDecorator('desc', {
                initialValue:'',
                rules: [
                  { required: true, message: '请输入商品描述' },
                ],
              })(
                <Input
                  placeholder="商品描述"
                />
              )}
            </Item>
            <Item label="商品价格">
              {getFieldDecorator('price', {
                initialValue:'',
                rules: [
                  { required: true, message: '请输入商品价格' },
                ],
              })(
                <Input
                  placeholder="商品价格"
                  addonAfter="元"
                  prefix="￥"
                  type="number"
                />
              )}
            </Item>
            <Item label="商品分类">
              {getFieldDecorator('categoryId', {
                initialValue:'',
                rules: [
                  { required: true, message: '请选择一个分类' },
                ],
              })(
                <Select>
                  <Option value="">请选择分类</Option>
                  {
                    this.state.categoryList.map((item)=>{
                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </Item>
            <Item 
              label="商品图片"
              wrapperCol={{md:12}}
            >
              <PicturesWall/>
            </Item>
            <Item label="商品详情">
              此处为富文本编辑器
            </Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form>
        </Card>
    )
  }
}

export default AddUpdate
