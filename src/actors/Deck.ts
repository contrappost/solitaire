import { Actor, Vector } from "excalibur";
import { Stack } from "./Stack";
import { StackDropArea } from "./StackDropArea";
import { CardList } from "./CardList";
import { RuleSet } from "./RuleSet";
import { Card } from "./card";
import { Resources } from "../resources";
import { LevelOne } from "../scenes/level-one/level-one";

export class Deck extends Actor {
  private deckStack: Stack;
  private revealedDeckStack: Stack;
  private level: LevelOne;
  constructor(pos: Vector, level: LevelOne, deckStck: Stack, revealedDeckStack: Stack) {
    super(
      {
        pos,
        width: Card.getWidth(),
        height: Card.getHeight()
      }
    )
    this.level = level
    this.deckStack = deckStck
    this.revealedDeckStack = revealedDeckStack
  }

  onInitialize() {
    this.graphics.use(Resources.DeckBack.toSprite());
    this.on("pointerdown", () => {
      const topCard = this.deckStack.removeTopCard()  
      if (topCard) {
        topCard.show()
        topCard.isDraggable = true
        this.level.add(topCard) 
        this.revealedDeckStack.addCard(topCard)
      } else {
        for (let card = this.revealedDeckStack.removeTopCard(); card != undefined; card = this.revealedDeckStack.removeTopCard()) {  
          this.deckStack.addCard(card)
          this.level.remove(card)
        }
      }
    })
  }

}