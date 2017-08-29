import { Rect, Circle } from './shapes'
import { unimplemented } from './common'

export type Action = () => void

export type GameT = {
  drawRect: (rect: Rect, style: string) => void
  drawCircle: (circle: Circle, style: string) => void
  registerKeyPressedAction: (key: string, action: Action) => void
  doKeyPressedActions: () => void
  mutate: () => void
  clear: () => void
  draw: () => void
  loop: () => void
  start: () => void
  pause: () => void
  pauseOrStart: () => void
  listen: () => void
}

export const Game = () => {
  const self = {} as GameT

  const states = {
    actions: {
      pressed: {} as { [key: string]: Action },
      press: {} as { [key: string]: Action },
    },
    keys: {
      pressed: {} as { [key: string]: boolean },
    },
    paused: true,
  }

  const canvas = document.querySelector('canvas#playground') as HTMLCanvasElement

  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  self.drawRect = (rect, style = '') => {
    context.fillStyle = style
    context.fillRect(rect.x, rect.y, rect.w, rect.h)
    context.fillStyle = ''
  }

  self.drawCircle = (circle, style = '') => {
    context.fillStyle = style
    context.beginPath()
    context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
    context.fill()
    context.fillStyle = ''
  }

  self.registerKeyPressedAction = (key, action) => {
    states.actions.pressed[key] = action
  }

  self.doKeyPressedActions = () => {
    Object.entries(states.actions.pressed).forEach(([key, action]) => {
      if (states.keys.pressed[key]) action()
    })
  }

  self.mutate = unimplemented('game.mutate')

  self.clear = () => context.clearRect(0, 0, canvas.width, canvas.height)

  self.draw = unimplemented('game.draw')

  self.loop = () => {
    self.doKeyPressedActions()
    self.mutate()
    self.clear()
    self.draw()
    if (!states.paused) setTimeout(self.loop, 1000 / 100)
  }

  self.start = () => {
    states.paused = false
    self.loop()
  }

  self.pause = () => {
    states.paused = true
  }

  self.pauseOrStart = () => {
    if (states.paused) self.start()
    else self.pause()
  }

  self.listen = () => {
    window.addEventListener('keydown', event => states.keys.pressed[event.key] = true)
    window.addEventListener('keyup', event => states.keys.pressed[event.key] = false)
  }

  return self
}
