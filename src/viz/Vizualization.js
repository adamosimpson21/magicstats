import React, {Component} from 'react';
import './Vizualization.css'
import PieChart from "./PieChart";
import Histogram from "./Histogram";

class Vizualization extends Component {
  render(){
    const width = 1200;
    const height = 420;
    const radius =  200;
    const innerRadius = 0;
    const {type, data, yAxis} = this.props
    if(type==='histogram' && data.length>0){
      return(<Histogram width={width} height={height} yAxis={yAxis} data={data}/>)
    } else if(type==='pie' && data.length>0){
      // TODO: Have pie chart function properly, make pie charts useful?
      return(<PieChart width={width} height={height}  data={data} innerRadius={innerRadius} radius={radius}/>)
    } else {
      return(<div>Data Loading</div>)
    }
  }
}

export default Vizualization;