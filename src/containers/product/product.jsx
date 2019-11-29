import React,{Component} from 'react'
import {Card,Button,Icon,Select,Input,Table, message} from 'antd';
import {connect} from 'react-redux'
import {reqProductList,reqUpdateProdStatus,reqSearchProduct} from '../../api'
import {createSaveProductAction} from '../../redux/action_creators/product_action'
import {PAGE_SIZE} from '../../config'
const {Option} = Select;

@connect(
  state => ({}),
  {saveProduct:createSaveProductAction}
)
class Product extends Component{

  state = {
    productList:[],//商品列表数据(分页)
    current:1,//当前在哪一页
    total:'',//一共有几页
    keyWord:'',//搜索关键词
    searchType:'productName'//搜索类型
  }

  componentDidMount(){
    this.getProductList()
  }

  getProductList = async(number=1)=>{
    const {searchType,keyWord} = this.state
    let result
    if(this.isSearch)result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyWord)
    else result = await reqProductList(number,PAGE_SIZE)
    const {status,data} = result
    if(status===0) {
      this.setState({
        productList:data.list,
        total:data.total,
        current:data.pageNum
      })
      //把获取的商品列表存入到redux中
      this.props.saveProduct(data.list)
    }
    else message.error('获取商品列表失败')
  }

  updateProdStatus = async({_id,status})=>{
    let productList = [...this.state.productList]
    if(status === 1) status = 2
    else status = 1
    let result = await reqUpdateProdStatus(_id,status)
    if(result.status===0) {
      message.success('更新商品状态成功')
      productList = productList.map((item)=>{
        if(item._id === _id){
          item.status = status
        }
        return item
      })
      this.setState({productList})
    }
    else message.error('更新商品状态失败')
  }

  search = async()=>{
    this.isSearch = true
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
        //dataIndex: 'status',
        width:'10%',
        align:'center',
        key: 'status',
        render: (item) =>{
          return (
            <div>
              <Button 
                type={item.status === 1 ? 'danger':'primary'}
                onClick={()=>{this.updateProdStatus(item)}}
              >
                {item.status === 1 ? '下架':'上架'}
              </Button><br/>
              <span>{item.status === 1 ? '在售':'已停售'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        //dataIndex: 'opera',
        width:'10%',
        align:'center',
        key: 'opera',
        render:(item)=>{
          return (
            <div>
              <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button><br/>
              <Button type="link" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update/567890')}}>修改</Button>
            </div>
          )
        }
      }
    ];
    return (
      <Card 
        title={
          <div>
            <Select defaultValue="productName" onChange={(value)=>{this.setState({searchType:value})}}>
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input 
              style={{margin:'0px 10px',width:'20%'}} 
              placeholder="请输入搜索关键字"
              allowClear
              onChange={(event)=>{this.setState({keyWord:event.target.value})}}
            />
            <Button type="primary" onClick={this.search}><Icon type="search"/>搜索</Button>
          </div>
        }
        extra={<Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}><Icon type="plus-circle"/>添加商品</Button>}
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
export default Product