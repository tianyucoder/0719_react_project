import React, { Component } from 'react'
import {Button,Card,Icon,List} from 'antd'
import {connect} from 'react-redux'
import './detail.less'
const {Item} = List

@connect(
  state => ({productList:state.productList})
)
class Detail extends Component {

  state = {
    categoryId:'',
    desc:'',
    detail:'',
    imgs:[],
    name:'',
    price:'',
  }

  componentDidMount(){
    const reduxProdList = this.props.productList
    const {id} = this.props.match.params
    let result = reduxProdList.find((item)=>{
      return item._id === id
    })
    if(result){
      const {categoryId,desc,detail,imgs,name,price} = result
      this.setState({categoryId,desc,detail,imgs,name,price})
    }
  }

  render() {
    return (
      <Card title={
        <div className='left-top'>
          <Button type="link" size="small" onClick={()=>{this.props.history.goBack()}}>
            <Icon type="arrow-left" style={{fontSize:'20px'}}/>
          </Button>
          <span>商品详情</span>
        </div>
        }
      >
        <List>
          <Item>
            <span className="prod-name">商品名称：</span>
            <span>{this.state.name}</span>
          </Item>
          <Item>
            <span className="prod-name">商品描述：</span>
            <span>{this.state.desc}</span>
          </Item>
          <Item>
            <span className="prod-name">商品价格：</span>
            <span>{this.state.price}</span>
          </Item>
          <Item>
            <span className="prod-name">所属分类：</span>
            <span>{this.state.categoryId}</span>
          </Item>
          <Item>
            <span className="prod-name">商品图片：</span>
            {
              this.state.imgs.map((item)=>{
                return <img src={`/upload/`+item} alt="商品图片"/>
              })
            }
          </Item>
          <Item>
            <span className="prod-name">商品详情：</span>
          <span>{this.state.detail}</span>
          </Item>
        </List>
      </Card>
    )
  }
}

export default Detail
