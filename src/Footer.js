import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component{
  render(){
    return(<div>
      <p>Here you can see different statistics about magic throughout the ages! While waiting for the creatures list to load, you can view length of set names over time</p>
      <p>Once the graph above changes, legendary creatures will be loaded. Upcoming Feature: use all creatures instead of just legendary ones</p>
    </div>)
  }
}

export default Footer;