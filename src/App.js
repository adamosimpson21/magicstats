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
      sets : [],
      viz2Type : 'histogram',
      setsWithCards: []
    }
  }

  componentDidMount(){
    this.loadSets()
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
    let setCodes = sets.map(set => set.code).toString()
    Magic.Cards.all({types:"creature", supertypes:"legendary", set:setCodes})
      .on('data', cards => {
            allCards.push(cards)
          })
      .on('end', () => {
        const setsWithCards = sortCardsBySet(allCards, sets)
        this.setState({setsWithCards})
        return setsWithCards
      })
  }

  loadSets(){
    let allSets = []
    Magic.Sets.where({type: "expansion"})
      .then(sets => {
        allSets = sets
      })
      .then(() => {
        Magic.Sets.where({type: "core"})
          .then(coreSets => {
            let sortedSets = allSets.concat(coreSets).sort(App.compareReleaseDate)
            this.setState({sets: sortedSets});
            this.loadAllCreatureCards(sortedSets)
        })
      })
  }

  render() {
    const {sets} = this.state
    const expansions = sets.filter(set => set.type==='expansion')
    const coreSets = sets.filter(set => set.type==='core')
    return (
      <div className="App">
        <h1 className='title'>The history of Magic: the Gathering, by the numbers</h1>
        <Vizualization type={this.state.viz1Type} data={expansions} className='viz1'/>
        <Vizualization type={this.state.viz2Type} data={coreSets} className='viz2'/>
      </div>
    );
  }
}

export default App;
