
let graphVariables = {}

// TODO: is there a better way to do this? How can we improve on what's already here? Refactor?
// TODO: Add more options for calculations
graphVariables['length of set name'] = {
  axisLabel: "Length of Set Name",
  domain: (d => d.name.length),
  barLabel:(d => d.name),
  letterSpacingMargin:-6
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
  },
  letterSpacingMargin:-6
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
  },
  letterSpacingMargin:-6
}

graphVariables['total CMC of creatures'] = {
  axisLabel: "Total CMC of Creatures",
  domain: function (d) {
    if (d.cards && d.cards.length > 0) {
      let totalCMC = 0
      d.cards.forEach(card => {
        if (Number.isInteger(card.cmc)) {
          totalCMC += card.cmc;
        }
      })
      return totalCMC;
    } else {
      return 0
    }
  },
  barLabel: function (d) {
    if (d.cards && d.cards.length > 0) {
      let totalCMC = 0
      d.cards.forEach(card => {
        if (Number.isInteger(card.cmc)) {
          totalCMC += card.cmc;
        }
      })
      return totalCMC;
    } else {
      return 0
    }
  },
  letterSpacingMargin:0
}

graphVariables['average CMC of creatures'] = {
  axisLabel: "Average CMC of Creatures",
  domain: function (d) {
    if (d.cards && d.cards.length > 0) {
      let totalCMC = 0
      d.cards.forEach(card => {
        if (Number.isInteger(card.cmc)) {
          totalCMC += card.cmc;
        }
      })
      return (totalCMC/d.cards.length).toFixed(2);
    } else {
      return 0
    }
  },
  barLabel: function (d) {
    if (d.cards && d.cards.length > 0) {
      let totalCMC = 0
      d.cards.forEach(card => {
        if (Number.isInteger(card.cmc)) {
          totalCMC += card.cmc;
        }
      })
      return (totalCMC/d.cards.length).toFixed(2);
    } else {
      return 0
    }
  },
  letterSpacingMargin:-40
}

export default graphVariables;