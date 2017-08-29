import { Game } from './game'
import { Ball } from './ball'
import { Paddle } from './paddle'
import { loadLevel } from './levels'

export default () => {
  const game = Game()

  const paddle = Paddle()

  const ball = Ball()

  let blocks = loadLevel(1) || []

  game.mutate = () => {
    if (ball.collide(paddle.rect())) {
      ball.bounceY()
    }
    blocks.filter(block => block.alive()).forEach(block => {
      if (ball.collide(block.rect())) {
        block.hit()
        ball.bounceY()
      }
    })
    ball.move()
  }

  game.draw = () => {
    game.drawRect(paddle.rect(), 'pink')
    game.drawCircle(ball.circle(), 'green')
    blocks.filter(block => block.alive()).forEach(block => game.drawRect(block.rect(), 'gray'))
  }

  game.registerKeyPressedAction('a', paddle.moveLeft)
  game.registerKeyPressedAction('d', paddle.moveRight)

  game.listenKeyPressing()

  window.addEventListener('keydown', event => {
    const k = event.key
    switch (k) {
      case 'f': return game.pauseOrStart()
      default: {
        if (k.match(/[0-9]/)) {
          const bs = loadLevel(Number(k))
          if (bs) blocks = bs
        }
      }
    }
  })

  ;(document.querySelector('input#fps') as HTMLInputElement).
    addEventListener('input', event => {
      const input = event.target as HTMLInputElement
      game.fps(Number(input.value) * 2)
    })

  game.draw()
}
