// TODO: Can this be refactored?
import moment from "moment";

export function sortCardsBySet(allCards, allSets){
  // Deep Clone
  let setsWithCards = JSON.parse(JSON.stringify(allSets));
  //add empty array for cards to be put in
  setsWithCards.forEach(set => {
    set.cards = []
  })
  //put cards into set buckets
  allCards.forEach(card => {
    setsWithCards.forEach(set => {
      if(set.code === card.set){
        set.cards.push(card);
      }
    })
  })
  return setsWithCards;
}

// takes a card object and returns array [P, T] if calculatable values. Otherwise returns null
// TODO: On hold until the rest of the code is cleaned up
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

export function compareReleaseDate(a, b){
  let newA = moment(a.releaseDate)
  let newB = moment(b.releaseDate)
  if (newA < newB)
    return 1;
  else if (newA === newB)
    return 0;
  else
    return -1;
}