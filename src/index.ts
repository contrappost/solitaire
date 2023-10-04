import { Engine, Loader, DisplayMode, vec, Actor } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { CardResources, Resources } from './resources';
import { Card } from './actors/card';
import { Stack } from './actors/Stack';
import { StackDropArea } from './actors/StackDropArea';
import { StackRuleSet } from './actors/RuleSet';
import { StackCardList } from './actors/CardList';
import { DeckRuleSet } from './actors/DeckRuleSet';
import { Deck } from './actors/Deck';
import { FinalStackRuleSet } from './actors/FinalStackRuleSet';

// Final drop areas
// Win condition

export enum CardSuit {
  Spade = "Spade",
  Club = "Club",
  Heart = "Heart",
  Diamond = "Diamond",
}

export enum CardValue {
  Ace = "Ace",
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six",
  Seven = "Seven",
  Eight = "Eight",
  Nine = "Nine",
  Ten = "Ten",
  Jack = "Jack",
  Queen = "Queen",
  King = "King"
}

export enum CardNumeric {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King
}

const cardValues = Object.values(CardValue)
const cardSuits = Object.values(CardSuit)

/**
 * Managed game class
 */
class Game extends Engine {
  private draggables: Card[];
  private levelOne: LevelOne;
  private stacks: Stack[]

  constructor() {
    super({ displayMode: DisplayMode.FitScreen });
    this.levelOne = new LevelOne();
    this.stacks = [];
    this.draggables = [];
  }

  public start() {
    const startStackDrop = new StackDropArea(vec(0,0))
      const startStack = new Stack(
        startStackDrop,
        new StackRuleSet(),
        new StackCardList()
      )
    const cardStartingVec = vec(0, 0)
    const unshuffledDeck = cardSuits.flatMap(suit => cardValues.map(value => new Card(cardStartingVec, value, suit, startStack)))
    const shuffledDeck = shuffleCards(unshuffledDeck)

    
    let numStacks = 7
    while (numStacks > 0) {
      let numCards = numStacks
      const stackDropArea = new StackDropArea(vec(50 + 100 * numStacks, 100))
      const newStack = new Stack(
        stackDropArea,
        new StackRuleSet(),
        new StackCardList()
      )

      this.levelOne.add(stackDropArea);
      this.stacks.push(newStack)

      while (numCards > 0) {
        const card = shuffledDeck.pop()
        
        newStack.addCard(card)

        if (numCards == 1) {
          card.show()
          card.isDraggable = true
        }

        this.levelOne.add(card);
        numCards--
      }
      
      numStacks--
    }

    let deckStack = new Stack(
      new StackDropArea(vec(50, 100)),
      new DeckRuleSet(),
      new StackCardList()
    )

    let playableDeckStack = new Stack(
      new StackDropArea(vec(50, 200), 10),
      new DeckRuleSet(),
      new StackCardList(),
    )

    let deck = new Deck(vec(50, 100), this.levelOne, deckStack, playableDeckStack)

    for (const card of shuffledDeck) {
      deckStack.addCard(card)
    }

    this.levelOne.add(deck)

    for (const [i, suit] of Object.values(CardSuit).entries()) {
      const finalDropArea = new StackDropArea(vec(50 + i * 100, 500), 0, suit)
      const finalStack = new Stack(
        finalDropArea,
        new FinalStackRuleSet(suit),
        new StackCardList()
      )
      this.stacks.push(finalStack)
      this.levelOne.add(finalDropArea)
    }

    game.input.pointers.primary.on("down", (evt) => {
      const draggingCards = getActorsByClass(this.levelOne, [Card]).filter(card => card.isBeingDragged).sort((c1, c2) => c1.z > c2.z ? -1 : 1)
      draggingCards.forEach(card => card.isBeingDragged = false) // Clear click handlers firing in case multiple cards clicked because of being stacked together
      if (draggingCards.length) {
        const draggingCard = draggingCards[0]
        if (draggingCard.isDraggable) {
          console.log(draggingCard.stack.canSlice())
          if (draggingCard.stack.canSlice()) {
            this.draggables = draggingCard.stack.slice(draggingCard)
          } else {
            const cards = draggingCard.stack.getCards()
            const topCard = cards[cards.length - 1]
            const isTopCard = draggingCard.id == topCard.id
            if (isTopCard) {
              this.draggables = [cards[cards.length - 1]]
            }
          }
          this.draggables.map(
            (card, i) => {
              card.pos = evt.worldPos.add(vec(0, i * card.width / 2))
              card.z = 15 + i
            }
          )
        }
      }
    });

    game.input.pointers.primary.on("move", (evt) => {
      if (this.draggables.length) {
        this.draggables.forEach((draggable, i) => draggable.pos = evt.worldPos.add(vec(0, i * draggable.width / 2)))
      }
    });

    game.input.pointers.primary.on("up", (evt) => {
      if (this.draggables.length) {
        const lowestCard = this.draggables[0]
        const stacks = this.stacks
        const prevStack = lowestCard.stack

        for (let stack of stacks) {
          const canAddCard = stack.canAddCard(lowestCard)
          if (canAddCard) {
            this.draggables.map(card => {
              card.stack.removeTopCard()
              stack.addCard(card)
            })
            break
          }
        }

        if (prevStack.id == lowestCard.stack.id) {
          lowestCard.stack.resetCardPositions()
        }

        this.draggables = []
      }
    })

    game.add('levelOne', this.levelOne);

    // Automatically load all default resources
    const loader = new Loader([...Object.values(Resources), ...Object.values(CardResources).flatMap(suitObject => Object.values(suitObject))]);

    loader.suppressPlayButton = true
    loader.logoHeight = 0

    return super.start(loader);
  }
}


// TODO: Make this function able to get any children of class (i.e. if x extends y, asking for all y returns x)
function getActorsByClass<T extends new (...args: any[]) => Actor>(level: LevelOne, classes: T[]): InstanceType<T>[] {
  const classNames = classes.map(foo => foo.name)
  const filteredActors = level.actors.filter(actor => classNames.includes(actor.constructor.name))
  return filteredActors as InstanceType<T>[];
}

function shuffleCards(cards: any[]): any[] {
  const shuffledCards = [...cards]; // Create a copy of the original array

  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  return shuffledCards;
}


const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
});
