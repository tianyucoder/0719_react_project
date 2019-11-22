import React,{Component} from 'react'
import {Button,Input} from 'antd'
import { gray } from 'ansi-colors'

export default class App extends Component{
  render(){
    return (
      <div>
        App
        <Button type='primary'>我是一个antd的按钮</Button>
        <Input type="text"/>
      </div>
    )
  }
}