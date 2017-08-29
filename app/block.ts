import { Rect } from './shapes'

export type BlockT = {
  rect: () => Rect
  alive: () => boolean
  hit: () => void
}

export type BlockInitialParamT = Partial<{ rect: Partial<Rect>, hp: number }>

export const Block = (initial: BlockInitialParamT) => {
  const self = {} as BlockT

  const states = {
    rect: {
      x: 100,
      y: 100,
      w: 50,
      h: 15,
      ...initial.rect,
    } as Rect,
    hp: initial.hp || 1,
  }

  self.rect = () => states.rect

  self.alive = () => states.hp > 0

  self.hit = () => {
    states.hp -= 1
  }

  return self
}
