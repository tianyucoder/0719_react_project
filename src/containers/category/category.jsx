import React,{Component} from 'react'
import {Card,Button,Icon,Table} from 'antd';

export default class Category extends Component{
  render(){
    const dataSource = [
      {
        key: '1',
        categoryName: '女士护肤',
      },
      {
        key: '1',
        categoryName: '女士护肤',
      },
      {
        key: '1',
        categoryName: '女士护肤',
      },
      {
        key: '1',
        categoryName: '女士护肤',
      },
    ];
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'categoryName',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'age',
        key: 'age',
      },
    ];
    
    return (
      <Card 
        extra={<Button type="primary"><Icon type="plus-circle" />添加</Button>}
      >
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    )
  }
}