import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3'
import * as mtg from 'mtgsdk'
import Vizualization from "./viz/Vizualization";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      vizType : 'histogram',
      viz1Data : {}
    }
  }

  componentDidMount(){
    mtg.card.where({name:'Black Lotus'})
      .then(cards => {
        console.log(cards)
        this.setState({viz1Data: cards})
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Magic Stats</h1>
        <Vizualization type={this.state.vizType} data={this.state.viz1Data}/>
      </div>
    );
  }
}

export default App;
