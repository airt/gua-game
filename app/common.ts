import { Rect, Point } from './shapes'

export const playground = document.querySelector('canvas#playground') as HTMLCanvasElement

export const unimplemented = (message: string = '') => () => {
  throw new Error(`unimplemented: ${message}`)
}

export const inRect = (point: Point, rect: Rect) => (
  rect.x <= point.x && point.x < rect.x + rect.w &&
  rect.y <= point.y && point.y < rect.y + rect.h
)
