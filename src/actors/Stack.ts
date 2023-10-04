import { CardList } from "./CardList";
import { Card } from "./card";
import { StackDropArea } from "./StackDropArea";
import { RuleSet } from "./RuleSet";

export interface StackInterface {
  canAddCard: (card: Card) => boolean,
  addCard: (card: Card) => void,
  removeTopCard: () => Card | undefined,
  clear: () => void,
  getCards: () => Card[],
  slice: (card: Card) => Card[],
}

export class Stack implements StackInterface {   
  protected droppable: StackDropArea
  protected ruleSet: RuleSet
  protected cardList: CardList
  public id: number

  constructor(droppable: StackDropArea, ruleSet: RuleSet, cardList: CardList) {
    this.droppable = droppable
    this.id = this.droppable.id
    this.ruleSet = ruleSet
    this.cardList = cardList
  }

  onInitialize() {
  }

  resetCardPositions() {
    const cards = this.cardList.getCards()
    let dropAreaPos = this.droppable.resetDropArea()
    for (let [i, card] of cards.entries()) {
      card.pos = dropAreaPos
      card.z = i + 1
      dropAreaPos = this.droppable.moveDropAreaDown(1)
    }
  }

  getStackPosition() {
    return this.droppable.getPosition()
  }

  canAddCard(card: Card) {
    return this.droppable.closeEnough(card) && this.ruleSet.canAdd(card, this.cardList)
  }

  addCard(card: Card) {
    this.cardList.addCard(card)
    card.pos = this.droppable.getPosition()
    card.stack = this
    this.droppable.moveDropAreaDown(1)
    card.z = this.cardList.getCards().length + 1
  }

  removeTopCard() {
    const removedCard = this.cardList.removeTopCard()
    this.droppable.moveDropAreaUp(1)
    this.cardList.revealTopCard()
    return removedCard
  }

  clear() {
    this.droppable.moveDropAreaUp(this.cardList.getCards().length)
    this.cardList.clear()
  }

  getCards() {
    return this.cardList.getCards()
  }

  canSlice() {
    return this.ruleSet.canSlice()
  }

  slice(card: Card) {
    return this.cardList.slice(card)
  }
}