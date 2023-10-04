import { CardNumeric } from "..";
import { CardList } from "./CardList";
import { Card } from "./card";

export interface RuleSet {
  canAdd: (card: Card, cardList: CardList) => boolean
  canSlice: () => boolean
}

export class StackRuleSet implements RuleSet {   

  constructor() {
    
  }

  onInitialize() {
  }

  canAdd(card: Card, cardList: CardList) {
    const cards = cardList.getCards()
    if (cards.length) {
      const topCard = cards[cards.length - 1]
      const droppingCardIsOneLower = topCard.getNumericValue() - card.getNumericValue() == 1
      const suitsDifferentColor = card.isBlack() != topCard.isBlack()
      return droppingCardIsOneLower && suitsDifferentColor
    }
    return card.getNumericValue() == CardNumeric.King
  };
  
  canSlice() {
    return true
  };
  
}