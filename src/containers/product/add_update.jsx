import React, { Component } from 'react'
import {Button} from 'antd'

export default class AddUpdate extends Component {

  state = {
    a:''
  }

  //在react声明周期钩子中，this.state()，是异步的，即：更新状态后，不会立即生效

  componentDidMount(){
    
  }

  demo = ()=>{
    this.setState({a:200})
    console.log(this.state);
  }

  render() {
    return (
      <div>
        hello,{this.state.a}
        <button onClick={this.demo}>123</button>
      </div>
    )
  }
}
