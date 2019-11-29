import React, { Component } from 'react'
import {Button} from 'antd'

export default class AddUpdate extends Component {
  render() {
    return (
      <div>
        我是新增页面，或许也可能是修改页面{this.props.match.params.id}
        <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}
