import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
后台管理的柱状图路由组件
 */
export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventorys: [15, 30, 46, 20, 20, 40]
  }
  getOption = () => {
    const {sales, inventorys} = this.state
    return { // 配置对象
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量', '库存']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: sales
      },{
          name: '库存',
          type: 'bar',
          data: inventorys
      }]
  };
  }

  update = () => {
    const sales = this.state.sales.map(sale => sale + 1)
    const inventorys = this.state.inventorys.map(inventory => inventory -1)
    
    this.setState({
      sales,
      inventorys
    })
  }
  render() {
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='柱状图一'>
          <ReactEcharts option={this.getOption()} style={{height: 300}}/>
        </Card>

      </div>
    )
  }
}