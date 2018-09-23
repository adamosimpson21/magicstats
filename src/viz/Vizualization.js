import React, {Component} from 'react';
import './Vizualization.css'
import PieChart from "./PieChart";
import Histogram from "./Histogram";

class Vizualization extends Component {
  render(){
    const width = 300;
    const height = 300;
    const radius =  150;
    const innerRadius = 0;
    const {type, data} = this.props
    if(type==='histogram' && Object.keys(data)>0){
      return(<Histogram width={width} height={height} data={data}/>)
    } else if(type==='pie' && Object.keys(data)>0){
      return(<PieChart width={width} height={height}  data={data} innerRadius={innerRadius} radius={radius}/>)
    } else {
      return(<div>Unknown type</div>)
    }
  }
}

export default Vizualization;