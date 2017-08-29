import { Rect, Circle } from './shapes'

export type BallT = {
  circle: () => Circle
  turnbackY: () => void
  collide: (rect: Rect) => boolean
  move: () => void
}

export const Ball = () => {
  const self = {} as BallT

  const states = {
    circle: {
      x: 100,
      y: 100,
      r: 5,
    } as Circle,
    speeds: {
      x: 3,
      y: 3,
    },
  }

  self.circle = () => states.circle

  self.turnbackY = () => states.speeds.y *= -1

  self.collide = (rect) => {
    const circle = states.circle
    return (
      rect.x - circle.r <= circle.x && circle.x <= rect.x + rect.w + circle.r &&
      rect.y - circle.r <= circle.y
    )
  }

  self.move = () => {
    const circle = states.circle
    if (circle.x < 0 + circle.r || 400 - circle.r < circle.x) states.speeds.x *= -1
    if (circle.y < 0 + circle.r || 300 - circle.r < circle.y) states.speeds.y *= -1
    circle.x += states.speeds.x
    circle.y += states.speeds.y
  }

  return self
}