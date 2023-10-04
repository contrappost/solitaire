import { CardNumeric, CardSuit } from "..";
import { CardList } from "./CardList";
import { Card } from "./card";

export interface RuleSet {
  canAdd: (card: Card, cardList: CardList) => boolean
  canSlice: () => boolean
}

export class FinalStackRuleSet implements RuleSet {   

  private cardSuit: CardSuit;
  constructor(suit: CardSuit) {
    this.cardSuit = suit
  }

  onInitialize() {
  }

  canAdd(card: Card, cardList: CardList) {
    const cards = cardList.getCards()
    const matchingSuit = card.getSuit() == this.cardSuit
    if (cards.length) {
      const topCard = cards[cards.length - 1]
      const droppingCardIsOneHigher = topCard.getNumericValue() - card.getNumericValue() == -1
      return droppingCardIsOneHigher && matchingSuit
    }
    return card.getNumericValue() == CardNumeric.Ace && matchingSuit
  };
  
  canSlice() {
    return false
  };
  
}