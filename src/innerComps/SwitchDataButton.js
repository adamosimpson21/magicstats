import React, {Component} from 'react';
import './SwitchDataButton.css'
import Icon from "./Icon";

class SwitchDataButton extends Component{
  render(){
    const {handler, data} = this.props
    return(<button className='switchDataButton' onClick={(e) => handler(e, 'sets')}>
      <div className='dataLoadedConfirmation'>
        <div className='dataLoadedText'>Sets Loaded:</div>
        {data.length>1 ? <Icon icon='success'/> :  <Icon icon='close'/>}
      </div>
    </button>)
  }
}

export default SwitchDataButton;
