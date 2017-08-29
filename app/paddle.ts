import { Rect } from './shapes'

export type PaddleT = {
  rect: () => Rect
  moveLeft: () => void
  moveRight: () => void
}

export const Paddle = () => {
  const self = {} as PaddleT

  const states = {
    rect: {
      x: 150,
      y: 225,
      w: 100,
      h: 20,
    } as Rect,
    speed: 6,
  }

  self.rect = () => states.rect

  self.moveLeft = () => {
    states.rect.x -= states.speed
  }

  self.moveRight = () => {
    states.rect.x += states.speed
  }

  return self
}
