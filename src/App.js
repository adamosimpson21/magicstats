import React, { Component } from 'react';
import './App.css';
import * as Magic from 'mtgsdk-ts'
import Vizualization from "./viz/Vizualization";
import moment from 'moment';
import {sortCardsBySet} from "./helper";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      viz1Type : 'histogram',
      viz1Data : {},
      viz2Type : 'histogram',
      viz2Data : {},
      setsWithCards: []
    }
  }

  componentDidMount(){
    this.loadViz1Data();
    this.loadViz2Data();
  }

  static compareReleaseDate(a, b){
    let newA = moment(a.releaseDate)
    let newB = moment(b.releaseDate)
    if (newA < newB)
      return 1;
    else if (newA === newB)
      return 0;
    else
      return -1;
  }

  loadAllCreatureCards(sets){
    let allCards = [];
    // map setCodes to use as query parameter
    let setCodes = sets.map(set => set.code).toString()
    Magic.Cards.all({types:"creature", gameFormat:"legacy", supertypes:"legendary", set:setCodes})
      .on('data', cards => {
            allCards.push(cards)
            return cards
          })
      .on('end', () => {
        this.setState({setsWithCards:sortCardsBySet(allCards, sets)})
        return allCards
      })
  }

  loadViz1Data(){
    Magic.Sets.where()
      .then(sets => sets.filter(set => set.type === 'expansion'))
      .then( sets => {
        console.log(sets);
        this.setState({viz1Data: sets.sort(App.compareReleaseDate)});
        this.loadAllCreatureCards(sets);
      })
  }

  loadViz2Data(){
    Magic.Sets.where()
      .then(sets => sets.filter(set => set.type === 'core'))
      .then( sets => {
        this.setState({viz2Data: sets.sort(App.compareReleaseDate)})
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
