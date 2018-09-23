import React, {Component} from 'react';
import './Histogram.css'
import * as d3 from 'd3'

class Histogram extends Component {
  render() {
    if (this.props.data.length > 0) {
      const margin = {top:0, bottom:75, left:30, right:30}
      const {data, width, height} = this.props

      const x = d3.scaleBand()
          .range([width- margin.left - margin.right, 0])
          .domain(data.map(d => d.code))
          .padding(0.1)
      const y = d3.scaleLinear()
        .range([height- margin.top - margin.bottom, 0])
        .domain([0, d3.max(data, d => d.name.length)])

      return (<svg id="hallOfFameHisto" width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            className="axis axis--x"
            transform={`translate(0, ${height-margin.bottom-margin.top})`}
            ref={node => d3.select(node).call(d3.axisBottom(x))}
          />
          <g className="axis axis--y">
            <g ref={node => d3.select(node).call(d3.axisLeft(y).ticks(10))} />
            <text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
              Booster Size
            </text>
          </g>
          {data.map(d => (
            <rect
              key={d.code}
              className="bar"
              x={x(d.code)}
              y={y(d.name.length)}
              width={x.bandwidth()}
              height={height - margin.bottom - margin.top - y(d.name.length)}
            />
          ))}
        </g>
      </svg>)
    } else {
      return null;
    }
  }
}

export default Histogram;