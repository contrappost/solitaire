import { Card } from "./card";

export interface CardList {
  addCard: (card: Card) => void,
  removeTopCard: () => Card | undefined,
  getCards: () => Card[],
  revealTopCard: () => void,
  slice: (card: Card) => Card[],
  clear: () => void
}

export class StackCardList implements CardList {   
  private cardList: Card[]

  constructor() {
    this.cardList = []
  }

  onInitialize() {
  }

  addCard(card: Card) {
    this.cardList.push(card)
  };

  removeTopCard() {
    return this.cardList.pop()
  };
  
  revealTopCard() {
    if (this.cardList.length) {
      this.cardList[this.cardList.length - 1].show()
      this.cardList[this.cardList.length - 1].isDraggable = true
    }
  }

  getCards() {
    return this.cardList
  };

  slice(card: Card) {
    const index = this.cardList.findIndex(cardOnStack => cardOnStack.id == card.id)
    if (index == -1) {
      return []
    } else {
      return this.cardList.slice(index)
    }
  };

  clear() {
    this.cardList = []
  };

  
}