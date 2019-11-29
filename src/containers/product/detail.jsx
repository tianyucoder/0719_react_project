import React, { Component } from 'react'
import {Button} from 'antd'

export default class Detail extends Component {
  render() {
    return (
      <div>
        我是详情页面{this.props.match.params.id}
        <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}
