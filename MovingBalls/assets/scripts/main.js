// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const size = 264,
  width = 1080,
  height = 1920,
  maxX = width - size,
  minX = size,
  maxY = height - size,
  minY = size


cc.Class({
  extends: cc.Component,

  properties: {
    text_label: cc.Label,
    timer_label: cc.Label,
    color1: {
      default: null,
      type: cc.Node,
    },
    color2: {
      default: null,
      type: cc.Node,
    },
    color3: {
      default: null,
      type: cc.Node,
    },
    color4: {
      default: null,
      type: cc.Node,
    },
    color5: {
      default: null,
      type: cc.Node,
    },
    level_label: cc.Label,
    light: {
      default: null,
      type: cc.Node,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const json = JSON.parse(localStorage.getItem('difficulty')).json
    const level = localStorage.getItem('level')
    const step = localStorage.getItem('step')
    const difficulty = json[level][step]

    this.level_label.string = `Level ${level}, step ${step}`
    const balls = this.generateBalls(difficulty.total, difficulty.colors)
    const lights = this.showBallsToRemember(balls, difficulty.remember)
    this.setTimer(3)

    setTimeout(() => this.startMoving(difficulty, lights, balls), 4000)
  },

  showBallsToRemember(ballIds, rememberAmount) {
    let lights = []

    for (let i = 0; i < rememberAmount; i++) {
      const currentBall = ballIds[i]

      let scene = cc.director.getScene()
      let node = cc.instantiate(this.light)
      node.parent = scene
      node.setPosition(currentBall.position.x, currentBall.position.y + 19)

      lights.push(node)
    }

    return lights
  },

  // update (dt) {},
  startMoving(difficulty, lights, balls) {

    //remove all lights
    for (let i = 0; i < lights.length; i++) {
      lights[i].destroy()
    }

    this.text_label.string = 'Imagine that balls moving))'
    this.setTimer(difficulty.time)

    //TODO start moving

    const timeout = difficulty.time * 1000 + 1000
    localStorage.setItem('current_success', '0')
    setTimeout(() => this.stopMoving(difficulty, balls), timeout)
  },

  stopMoving(difficulty, balls) {
    let time = 10
    this.text_label.string = 'Indentify the correct balls'

    //loop for correct balls
    for (let i = 0; i < balls.length; i++) {
      const currentBall = balls[i]

      if (i < difficulty.remember) {
        currentBall.on('mouseup', function (event) {
          console.log('yes')
          currentBall.destroy()
          localStorage.setItem('current_success', (+localStorage.getItem('current_success') + +1))
          console.log({ current: localStorage.getItem('current_success'), remember: difficulty.remember })
          if (localStorage.getItem('current_success') == difficulty.remember) {
            //go to next step

            if (localStorage.getItem('step') === '8' && localStorage.getItem('level') === '5') {
              cc.director.loadScene('Win Scene')
            }
            if (localStorage.getItem('step') === '8') {
              localStorage.setItem('level', (+localStorage.getItem('level') + +1))
            } else {
              localStorage.setItem('step', (+localStorage.getItem('step') + +1))
            }

            cc.director.loadScene('First Timer Scene')
            localStorage.setItem('current_success', '')
          }
        })
      } else {
        currentBall.on('mouseup', function (event) {
          console.log('no')
          cc.director.loadScene('Fail Scene')
        })
      }
    }


    this.setTimer(time)
    setTimeout(() => this.fail(), time * 1000)
  },

  fail() {
    if (localStorage.getItem('current_success') === '') {
      cc.director.loadScene('Fail Scene')
    }
  },

  setTimer(time) {
    this.timer_label.string = time
    if (time == '0') {
      return
    }
    setTimeout(() => {
      this.setTimer(time - 1)
    }, 1000)
  },

  generateBalls(total, colors) {
    let balls = []

    for (let i = 0; i < total; i++) {
      const randomX = Math.random() * (+maxX - +minX) + +minX
      const randomY = Math.random() * (+maxY - +minY) + +minY
      const randC = Math.round(Math.random() * (+colors - +1) + +1)

      let scene = cc.director.getScene()
      let node

      switch (randC) {
        case 5:
          node = cc.instantiate(this.color1)
          break
        case 1:
          node = cc.instantiate(this.color2)
          break
        case 2:
          node = cc.instantiate(this.color3)
          break
        case 3:
          node = cc.instantiate(this.color4)
          break
        case 4:
          node = cc.instantiate(this.color5)
          break

      }

      node.parent = scene
      node.setPosition(randomX, randomY)
      //TODO checking for balls overlay

      balls.push(node)
    }

    return balls
  },
})
