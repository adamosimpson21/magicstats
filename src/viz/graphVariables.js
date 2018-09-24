
let graphVariables = {}

graphVariables['length of set name'] = {
  axisLabel: "Length of Set Name",
  domain: (d => d.name.length),
  barLabel:(d => d.name)
}

graphVariables['length of creature name'] = {
  axisLabel: "Length of First Creature Name",
  domain: function(d){
    if(d.cards && d.cards.length>0){
      return d.cards[0].name.length
    } else {
      return 0
    }
  },
  barLabel:function(d){
    if(d.cards && d.cards.length>0){
      return d.cards[0].name
    } else {
      return "No Creature"
    }
  }
}

graphVariables['length of longest creature name'] = {
  axisLabel: "Length of Longest Creature Name",
  domain: function(d){
    if(d.cards && d.cards.length>0){
      let longestName = d.cards[0].name
      d.cards.forEach(card => {
        if(card.name.length > longestName.length){
          longestName = card.name;
        }
      })
      return longestName.length;
    } else {
      return 0
    }
  },
  barLabel:function(d){
    if(d.cards && d.cards.length>0){
      let longestName = d.cards[0].name
      d.cards.forEach(card => {
        if(card.name.length > longestName.length){
          longestName = card.name;
        }
      })
      return longestName;
    } else {
      return "No Creature"
    }
  }
}

export default graphVariables;