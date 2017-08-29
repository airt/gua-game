import { Game } from './game'
import { Ball } from './ball'
import { Paddle } from './paddle'

export default () => {
  const game = Game()

  const paddle = Paddle()

  const ball = Ball()

  game.mutate = () => {
    // TODO
    if (ball.collide(paddle.rect())) ball.turnbackY()
    ball.move()
  }

  game.draw = () => {
    game.drawRect(paddle.rect(), 'pink')
    game.drawCircle(ball.circle(), 'green')
  }

  game.registerKeyPressedAction('a', paddle.moveLeft)
  game.registerKeyPressedAction('d', paddle.moveRight)

  window.addEventListener('keydown', event => {
    switch (event.key) {
      case 'p': game.pauseOrStart()
    }
  })

  game.listen()

  game.draw()
}
