import React, {Component} from 'react'
import './SideBar.css'
import Icon from '../innerComps/Icon'

class SideBar extends Component{
  render(){
    const {handler, sets, setsWithLegendaryCreatures, setsWithAllCreatures} = this.props
    return(<div className='sideBar'>
      <div className='dataLoadedMenu'>
        <div className='dataLoadedConfirmation'><div className='dataLoadedText'>Sets Loaded:</div> {sets.length>1 ? <Icon icon='success'/> :  <Icon icon='close'/>} </div>
        <div className='dataLoadedConfirmation'><div className='dataLoadedText'>Legendary <br/> Creatures:</div> {setsWithLegendaryCreatures.length>1 ? <Icon icon='success'/> :  <Icon icon='close'/>} </div>
      </div>
      <div className='dataLoadedMenu'>
        <div className='dataLoadedConfirmation'><div className='dataLoadedText'>All <br/> Creatures:</div> {setsWithAllCreatures.length>1 ? <Icon icon='success'/> :  <Icon icon='close'/>} </div>
      </div>
      <button className='sideBarButton' onClick={(e) => handler(e, 'length of creature name')}>Length of First Creature Name</button>
      <br />
      <button className='sideBarButton' onClick={(e) => handler(e, 'length of set name')}>Length of Set Name</button>
      <br />
      <button className='sideBarButton' onClick={(e) => handler(e, 'length of longest creature name')}>Longest Creature Name in Set</button>
      <br />
      <button className='sideBarButton' onClick={(e) => handler(e, 'total CMC of creatures')}>Total CMC of Creatures</button><br />
      <button className='sideBarButton' onClick={(e) => handler(e, 'average CMC of creatures')}>Average CMC of Creatures</button>
    </div>)
  }
}

export default SideBar