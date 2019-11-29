import React,{Component} from 'react'
import {Card,Button,Icon,Select,Input,Table} from 'antd';
import {reqProductList} from '../../api'
import {PAGE_SIZE} from '../../config'
const {Option} = Select;

export default class Product extends Component{

  state = {
    productList:[],
    current:1,
    total:''
  }

  getProductList = async(number=1)=>{
    let result = await reqProductList(number,PAGE_SIZE)
    const {status,data,msg} = result
    console.log(data);
    if(status===0) {
      this.setState({
        productList:data.list,
        total:data.total,
        current:data.pageNum
      })
    }
  }

  componentDidMount(){
    this.getProductList()
  }


  render(){
    const dataSource = this.state.productList
    
    const columns = [
      {
        title: '商品名称',
        width:'18%',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        width:'9%',
        render: price =>'￥'+price
      },
      {
        title: '状态',
        dataIndex: 'status',
        width:'10%',
        align:'center',
        key: 'status',
        render: status =>{
          return (
            <div>
              <Button type="primary">下架</Button><br/>
              <span>{status}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'opera',
        width:'10%',
        align:'center',
        key: 'opera',
        render:()=>{
          return (
            <div>
              <Button type="link">详情</Button><br/>
              <Button type="link">修改</Button>
            </div>
          )
        }
      }
    ];
    return (
      <Card 
        title={
          <div>
            <Select defaultValue="name">
              <Option value="name">按名称搜索</Option>
              <Option value="desc">按描述搜索</Option>
            </Select>
            <Input 
              style={{margin:'0px 10px',width:'20%'}} 
              placeholder="请输入搜索关键字"
              allowClear
            />
            <Button type="primary"><Icon type="search"/>搜索</Button>
          </div>
        }
        extra={<Button type="primary"><Icon type="plus-circle"/>添加商品</Button>}
      >
       <Table 
        dataSource={dataSource} 
        columns={columns}
        bordered
        rowKey='_id'
        pagination={{
          total:this.state.total,
          pageSize:PAGE_SIZE,
          current:this.state.current,
          onChange:this.getProductList
        }}
       />
      </Card>
    )
  }
}