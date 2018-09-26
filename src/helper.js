export function sortCardsBySet(allCards, allSets){
  // Deep Clone
  let setsWithCards = JSON.parse(JSON.stringify(allSets));
  //add empty array for cards to be put in
  setsWithCards.forEach(set => {
    set.cards = []
  })
  //put cards into set buckets
  allCards.forEach(card => {
    setsWithCards.forEach((set, index) => {
      if(set.code === card.set){
        // console.log("Set code matches card set", set, card)
        setsWithCards[index].cards.push(card);
      }
    })
  })
  console.log("setsWithCards is ", setsWithCards)
  return setsWithCards;
}

// takes a card object and returns array [P, T] if calculatable values. Otherwise returns null
// TODO: under construction
export function PTofCreature(card){
  //  converts String Power or Toughness if possible, some values can't be calculated (X, 1+*, *, etc.)
  function isConvertablePTtoNumber(pt){
    return Number.isInteger(Number(pt))
  }
  // filter any card that isn't a creature with readable power/toughness
  if(card.types.includes("Creature") && isConvertablePTtoNumber(card.power) && isConvertablePTtoNumber(card.toughness)){
    return [Number(card.power), Number(card.toughness)]
  } else {
    return null
  }
}