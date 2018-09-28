import React, {Component} from 'react'
import './SideBar.css'
import Icon from '../innerComps/Icon'
import SwitchDataButton from "../innerComps/SwitchDataButton";

class SideBar extends Component{
  render(){
    const {handler, sets, setsWithLegendaryCreatures, setsWithAllCreatures} = this.props

    return(<div className='sideBar'>
      {/* TODO: break out this menu and buttons into separate components*/}
      <div className='dataLoadedMenu'>
        <SwitchDataButton handler={handler} data={sets}/>
        <button className='switchDataButton' onClick={(e) => handler(e, 'setsWithLegendaryCreatures')}>
          <div className='dataLoadedConfirmation'>
            <div className='dataLoadedText'>
              Legendary <br/> Creatures:</div>
            {setsWithLegendaryCreatures.length>1 ? <Icon icon='success'/> :  <Icon icon='close'/>}
          </div>
        </button>
      </div>
      <div className='dataLoadedMenu'>
        <button className='switchDataButton' onClick={(e) => handler(e, 'setsWithAllCreatures')}>
          <div className='dataLoadedConfirmation'>
            <div className='dataLoadedText'>
              All <br/> Creatures:</div>
            {setsWithAllCreatures.length>1 ? <Icon icon='success'/> :  <Icon icon='close'/>}
          </div>
        </button>
      </div>
      {/* TODO: break out this menu and buttons into separate components*/}
      <button className='switchYAxis' onClick={(e) => handler(e, 'length of creature name')}>Length of First Creature Name</button>
      <br />
      <button className='switchYAxis' onClick={(e) => handler(e, 'length of set name')}>Length of Set Name</button>
      <br />
      <button className='switchYAxis' onClick={(e) => handler(e, 'length of longest creature name')}>Longest Creature Name in Set</button>
      <br />
      <button className='switchYAxis' onClick={(e) => handler(e, 'total CMC of creatures')}>Total CMC of Creatures</button><br />
      <button className='switchYAxis' onClick={(e) => handler(e, 'average CMC of creatures')}>Average CMC of Creatures</button>
    </div>)
  }
}

export default SideBar