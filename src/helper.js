export function sortCardsBySet(allCards, allSets){
  let setsWithCards = allSets;
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