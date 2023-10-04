import { Actor, Color, Sprite, Vector, vec } from "excalibur"
import { Card } from "./card"
import { Resources } from "../resources"
import { CardSuit } from ".."

interface DropArea {
  getPosition: () => Vector,
  resetDropArea: () => Vector
  closeEnough: (card: Card) => boolean,
  moveDropAreaDown: (increments: number) => Vector,
  moveDropAreaUp: (increments: number) => Vector
}

export class StackDropArea extends Actor implements DropArea {   
  private startingPos: Vector
  private increment: number
  constructor(pos: Vector, increment?: number, cardSuit?: CardSuit) {
    super({
      pos: pos,
      z: 0,
      width: 55,
      height: 75,
      visible: cardSuit ? true : false
    })
    if (cardSuit) {
      this.graphics.use(Resources[cardSuit].toSprite())
    }
    this.startingPos = pos
    this.increment = increment != undefined ? increment : Card.getWidth()
  }

  closeEnough(card: Card) {
    const draggableCloseEnough = Math.abs(card.pos.x - this.pos.x) < Card.getWidth() && Math.abs(card.pos.y - this.pos.y) < Card.getHeight()
    return draggableCloseEnough
  }

  resetDropArea() {
    this.pos = this.startingPos
    return this.startingPos
  }

  getPosition() {
    return this.pos
  }

  moveDropAreaDown(increment: number) {
    const downPositionChange = this.increment * increment / 2
    console.log(downPositionChange)
    this.pos = this.pos.add(vec(0, downPositionChange))
    return this.pos
  }

  moveDropAreaUp(increment: number) {
    const upPositionChange = - this.increment * increment / 2
    console.log(upPositionChange)
    this.pos = this.pos.add(vec(0, upPositionChange))
    return this.pos
  }

}