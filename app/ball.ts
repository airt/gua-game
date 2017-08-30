import { Rect, Circle } from './shapes'
import { playground, inRect } from './common'

type Direction = {
  // ← | →
  x?: -1 | 1
  // ↑ | ↓
  y?: -1 | 1
}

export type BallT = {
  circle: () => Circle
  bounce: (rect: Rect) => boolean
  move: () => void
}

export const Ball = () => {
  const self = {} as BallT

  const states = {
    circle: {
      x: 100,
      y: 150,
      r: 5,
    } as Circle,
    speeds: {
      x: 3,
      y: 3,
    },
  }

  self.circle = () => states.circle

  const touch = (rect: Rect) => {
    const circle = states.circle

    const drs: Array<[Direction, Rect]> = [
      [{ x: -1 }, {
        x: rect.x - circle.r,
        y: rect.y,
        w: circle.r,
        h: rect.h,
      }],
      [{ x: 1 }, {
        x: rect.x + rect.w,
        y: rect.y,
        w: circle.r,
        h: rect.h,
      }],
      [{ y: -1 }, {
        x: rect.x - circle.r,
        y: rect.y - circle.r,
        w: rect.w + 2 * circle.r,
        h: rect.h / 2 + circle.r,
      }],
      [{ y: 1 }, {
        x: rect.x - circle.r,
        y: rect.y + rect.h / 2,
        w: rect.w + 2 * circle.r,
        h: rect.h / 2 + circle.r,
      }],
    ]

    const point = { x: circle.x, y: circle.y }

    for (const [d, r] of drs) {
      if (inRect(point, r)) return d
    }

    return {}
  }

  self.bounce = (rect) => {
    const d = touch(rect)
    if (d.x) states.speeds.x = d.x * Math.abs(states.speeds.x)
    if (d.y) states.speeds.y = d.y * Math.abs(states.speeds.y)
    return Boolean(d.x) || Boolean(d.y)
  }

  self.move = () => {
    const circle = states.circle
    if (circle.x < 0 + circle.r || playground.width - circle.r < circle.x) states.speeds.x *= -1
    if (circle.y < 0 + circle.r || playground.height - circle.r < circle.y) states.speeds.y *= -1
    circle.x += states.speeds.x
    circle.y += states.speeds.y
  }

  return self
}
