import { CardList } from "./CardList";
import { Card } from "./card";

export interface RuleSet {
  canAdd: (card: Card, cardList: CardList) => boolean
  canSlice: () => boolean
}

export class DeckRuleSet implements RuleSet {   

  constructor() {
    
  }

  onInitialize() {
  }

  canAdd(card: Card, cardList: CardList) {
    return false
  };
  
  canSlice() {
    return false
  };
  
}