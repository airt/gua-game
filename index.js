const log = console.log.bind(console)

const Paddle = () => {
  const self = {
    rect: {
      x: 150,
      y: 225,
      width: 100,
      height: 20,
    },
    speed: 6,
  }

  self.moveLeft = () => {
    self.rect.x -= self.speed
  }

  self.moveRight = () => {
    self.rect.x += self.speed
  }

  return self
}

const Ball = () => {
  const self = {
    circle: {
      x: 100,
      y: 100,
      radius: 5,
    },
    speeds: {
      x: 3,
      y: 3,
    },
    fired: false,
  }

  self.fire = () => {
    self.fired = true
  }

  self.collide = (rect) => {
    const circle = self.circle
    return (
      rect.x - circle.radius <= circle.x && circle.x <= rect.x + rect.width + circle.radius &&
      rect.y - circle.radius <= circle.y
    )
  }

  self.move = () => {
    if (self.fired) {
      if (self.circle.x < 0 + self.circle.radius || 400 - self.circle.radius < self.circle.x) self.speeds.x *= -1
      if (self.circle.y < 0 + self.circle.radius || 300 - self.circle.radius < self.circle.y) self.speeds.y *= -1
      self.circle.x += self.speeds.x
      self.circle.y += self.speeds.y
    }
  }

  return self
}

const Game = () => {
  const self = {
    actions: {},
    keydowns: {},
  }

  const canvas = document.querySelector('canvas#playground')

  const context = canvas.getContext('2d')

  self.clear = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  self.drawRect = (rect, style = '') => {
    context.fillStyle = style
    context.fillRect(rect.x, rect.y, rect.width, rect.height)
    context.fillStyle = ''
  }

  self.drawCircle = (circle, style = '') => {
    context.fillStyle = style
    context.beginPath()
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI)
    context.fill()
    context.fillStyle = ''
  }

  self.registerKeyAction = (key, action) => {
    self.actions[key] = action
  }

  self.doKeyActions = () => {
    Object.keys(self.actions).filter(key => self.keydowns[key]).forEach(key => self.actions[key]())
  }

  self.mutate = () => {
    throw new Error('Game#mutate is unimplemented')
  }

  self.draw = () => {
    throw new Error('Game#draw is unimplemented')
  }

  self.doCyclical = () => {
    self.doKeyActions()
    self.mutate()
    self.clear()
    self.draw()
  }

  self.start = () => {
    const intervalId = setInterval(self.doCyclical, 1000 / 100)
  }

  self.listen = () => {
    window.addEventListener('keydown', event => self.keydowns[event.key] = true)
    window.addEventListener('keyup', event => self.keydowns[event.key] = false)
  }

  return self
}

const main = () => {
  const game = Game()

  const paddle = Paddle()

  const ball = Ball()

  game.mutate = () => {
    // TODO
    if (ball.collide(paddle.rect)) ball.speeds.y *= -1
    ball.move()
  }

  game.draw = () => {
    game.drawRect(paddle.rect, 'pink')
    game.drawCircle(ball.circle, 'green')
  }

  game.registerKeyAction('a', paddle.moveLeft)
  game.registerKeyAction('d', paddle.moveRight)
  game.registerKeyAction('f', ball.fire)

  game.listen()

  game.start()
}

main()
