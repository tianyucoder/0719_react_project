import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component{

  getOption = ()=>{
    return {
      title: {
          text: '0719-ECharts 入门示例'
      },
      tooltip: {
        trigger:'axis'
      },
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","皮鞋"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'pie',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };
  }

  render(){
    return (
      <div>
        <ReactEcharts option={this.getOption()} />
      <ReactEcharts option={this.getOption()} />
      </div>
    )
  }
}