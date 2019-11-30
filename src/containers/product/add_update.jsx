import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select} from 'antd'
const {Item} = Form
const {Option} = Select

@Form.create()
class AddUpdate extends Component {

  render() {
    //getFieldDecorator包装Form组件
    const {getFieldDecorator} = this.props.form;
    //左上角返回区域
    const title = (
      <div>
        <Button type="link" onClick={this.props.history.goBack}>
          <Icon type="arrow-left"/>
          <span>返回</span>
        </Button>
        <span>商品添加</span>
      </div>
    )
    
    return (
        <Card title={title}>
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
                  <Option value="1">分类一</Option>
                  <Option value="2">分类二</Option>
                </Select>
              )}
            </Item>
            <Item label="商品图片">
              此处为照片墙
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
