import React, { Component } from 'react';
import './App.css';
import * as Magic from 'mtgsdk-ts'
import Vizualization from "./viz/Vizualization";
import moment from 'moment';
import {sortCardsBySet} from "./helper";
import SideBar from "./viz/SideBar";
import Footer from "./Footer"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      viz1Type : 'histogram',
      sets : [],
      viz2Type : 'histogram',
      setsWithLegendaryCreatures: [],
      setsWithAllCreatures: [],
      dataType: 'sets',
      yAxis: 'length of set name'
    }
    this.handler = this.handler.bind(this)
  }

  componentDidMount(){
    this.loadSets()
  }

  handler(e, variable){
    e.preventDefault()
    if(variable === 'length of set name' ||
      variable === 'length of creature name'||
      variable === 'total CMC of creatures'||
      variable === 'average CMC of creatures'||
      variable === 'length of longest creature name') {
      this.setState({yAxis:variable})
    }
    if(variable === 'sets' ||
      variable === 'setsWithLegendaryCreatures'||
      variable === 'setsWithAllCreatures') {
      this.setState({dataType:variable})
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
            this.loadLegendaryCreatureCards(sortedSets)
            this.loadAllCreatureCards(sortedSets)
          })
      })
  }

  loadLegendaryCreatureCards(sets){
    let allLegends = [];
    // let setCodes = sets.map(set => set.code).toString()
    Magic.Cards.all({types:"creature", supertypes:"legendary"})
      .on('data', cards => {
        allLegends.push(cards)
          })
      .on('end', () => {
        const setsWithLegendaryCreatures = sortCardsBySet(allLegends, sets)
        this.setState({setsWithLegendaryCreatures})
        this.setState({yAxis:'length of creature name', dataType:'setsWithLegendaryCreatures'})
      })
  }

  loadAllCreatureCards(sets){
    let allCards = [];
    Magic.Cards.all({types:"creature", colors:"green"})
      .on('data', cards => {
        allCards.push(cards)
      })
      .on('end', () => {
        const setsWithAllCreatures = sortCardsBySet(allCards, sets)
        this.setState({setsWithAllCreatures})
      })
  }



  render() {
    const {sets, viz1Type, viz2Type, yAxis, setsWithLegendaryCreatures, setsWithAllCreatures, dataType} = this.state
    const expansions = sets.filter(set => set.type==='expansion')
    const coreSets = sets.filter(set => set.type==='core')
    return (
      <div className="App">
        <h1 className='title'>The history of Magic: the Gathering, by the numbers</h1>
        <SideBar handler={this.handler} sets={sets} setsWithLegendaryCreatures={setsWithLegendaryCreatures} setsWithAllCreatures={setsWithAllCreatures} dataType={dataType}/>
        <Vizualization type={viz1Type} data={expansions} yAxis={yAxis} dataType={dataType} className='viz1'/>
        <Vizualization type={viz2Type} data={coreSets} yAxis={yAxis} dataType={dataType} className='viz2'/>
        <Footer />
      </div>
    );
  }
}

export default App;
