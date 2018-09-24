import React, { Component } from 'react';
import './App.css';
import * as Magic from 'mtgsdk-ts'
import Vizualization from "./viz/Vizualization";
import moment from 'moment';
import {sortCardsBySet} from "./helper";
import SideBar from "./viz/SideBar";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      viz1Type : 'histogram',
      sets : [],
      viz2Type : 'histogram',
      setsWithCards: [],
      yAxis: 'length of set name'
    }
    this.handler = this.handler.bind(this)
  }

  componentDidMount(){
    this.loadSets()
  }

  handler(e, variable){
    e.preventDefault()
    if(variable === 'length of set name' || variable === 'length of creature name') {
      this.setState({yAxis:variable})
    }
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
        this.setState({yAxis:'length of creature name'})
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
    const {sets, viz1Type, viz2Type, yAxis} = this.state
    const expansions = sets.filter(set => set.type==='expansion')
    const coreSets = sets.filter(set => set.type==='core')
    return (
      <div className="App">
        <h1 className='title'>The history of Magic: the Gathering, by the numbers</h1>
        <SideBar handler={this.handler}/>
        <Vizualization type={viz1Type} data={expansions} yAxis={yAxis} className='viz1'/>
        <Vizualization type={viz2Type} data={coreSets} yAxis={yAxis} className='viz2'/>
      </div>
    );
  }
}

export default App;
