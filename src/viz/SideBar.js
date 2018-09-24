import React, {Component} from 'react'
import './SideBar.css'

class SideBar extends Component{
  render(){
    const {handler} = this.props
    return(<div className='sideBar'>
      <button className='sideBarButton' onClick={(e) => handler(e, 'length of creature name')}>Length of First Creature Name</button>
      <br />
      <button className='sideBarButton' onClick={(e) => handler(e, 'length of set name')}>Length of Set Name</button>
      <br />
      <button className='sideBarButton' onClick={(e) => handler(e, 'length of longest creature name')}>Longest Creature Name in Set</button>
    </div>)
  }
}

export default SideBar