import { Actor, Color, Vector, vec } from 'excalibur';
import { CardResources, Resources } from '../resources';
import { CardNumeric, CardSuit, CardValue } from '..';
import { Stack } from './Stack';

interface Draggable {
  isDraggable: boolean,
  isBeingDragged: boolean,
  initPointerDownHandler: () => void
}

export class Card extends Actor implements Draggable {  
  public stack: Stack;

  public isDraggable: boolean;
  public isBeingDragged: boolean;

  private value: CardValue;
  private suit: CardSuit;
  private defaultHidden: boolean;

  constructor(pos: Vector, value: CardValue, suit: CardSuit, stack: Stack, defaultHidden: boolean = true) {
    super({
      pos,
      width: Card.getWidth(),
      height: Card.getHeight(),
      color: new Color(255, 255, 255),
      z: 0,
    });
    this.isDraggable = false;
    this.isBeingDragged = false
    this.stack = stack
    this.value = value
    this.suit = suit
    this.defaultHidden = defaultHidden

    this.graphics.add("card", CardResources[this.suit][this.value].toSprite());
    this.graphics.add("back", Resources.Back.toSprite());
  }

  static getWidth() {
    return 55
  }

  static getHeight() {
    return 75
  }

  initPointerDownHandler() {
    this.on("pointerdown", () => {
      if (this.isDraggable) {
        this.isBeingDragged = true
      }
    })
  };

  onInitialize() {
    this.initPointerDownHandler()
    
    if (this.defaultHidden) {
      this.hide()
    } else {
      this.show()
    }
  }

  isBlack() {
    return this.suit == CardSuit.Club || this.suit == CardSuit.Spade
  }

  getSuit() {
    return this.suit
  }

  getNumericValue() {
    return CardNumeric[this.value]
  }

  hide() {
    this.defaultHidden = true
    this.graphics.show('back')
  }

  show() {
    this.defaultHidden = false
    this.graphics.show('card')
  }

  isHidden() {
    return this.defaultHidden
  }
}
