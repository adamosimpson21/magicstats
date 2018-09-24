import React, {Component} from 'react'
import './SideBar.css'

class SideBar extends Component{
  render(){
    const {handler} = this.props
    return(<div>
      <button onClick={(e) => handler(e, 'length of creature name')}>Length of First Creature Name</button>
      <br />
      <button onClick={(e) => handler(e, 'length of set name')}>Length of Set Name</button>
    </div>)
  }
}

export default SideBar