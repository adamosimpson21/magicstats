import React, { Component } from 'react';
import './App.css';
import * as mtg from 'mtgsdk'
import Vizualization from "./viz/Vizualization";
import moment from 'moment';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      viz1Type : 'histogram',
      viz1Data : {},
      viz2Type : 'histogram',
      viz2Data : {}
    }
  }

  componentDidMount(){
    this.loadViz1Data();
    this.loadViz2Data();
  }

  compareReleaseDate(a, b){
    let newA = moment(a.releaseDate)
    let newB = moment(b.releaseDate)
    if (newA < newB)
      return 1;
    else if (newA === newB)
      return 0;
    else
      return -1;
  }

  loadViz1Data(){
    mtg.set.where({type: 'expansion'})
      .then( sets => {
        console.log(sets)

        this.setState({viz1Data: sets.sort(this.compareReleaseDate)})
      })
  }

  loadViz2Data(){
    mtg.set.where({type: 'core'})
      .then( sets => {
        console.log(sets)
        this.setState({viz2Data: sets.sort(this.compareReleaseDate)})
      })
  }

  render() {
    return (
      <div className="App">
        <h1 className='title'>The history of Magic: the Gathering, by the numbers</h1>
        <Vizualization type={this.state.viz1Type} data={this.state.viz1Data} className='viz1'/>
        <Vizualization type={this.state.viz2Type} data={this.state.viz2Data} className='viz2'/>
      </div>
    );
  }
}

export default App;
