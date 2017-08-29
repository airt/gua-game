import { Rect } from './shapes'
import { playground } from './common'

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
    states.rect.x = Math.max(states.rect.x - states.speed, 1 - states.rect.w)
  }

  self.moveRight = () => {
    states.rect.x = Math.min(states.rect.x + states.speed, playground.width - 1)
  }

  return self
}
