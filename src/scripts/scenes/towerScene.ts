import { GameObjects } from 'phaser'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../game.config'
import Enemy from '../objects/enemy'
import Seed from '../objects/seed'
import Turret from '../objects/turret'

export default class TowerScene extends Phaser.Scene {
  //graphics: Phaser.GameObjects.Graphics
  path: Phaser.Curves.Path
  enemies: GameObjects.Group
  turrets: GameObjects.Group
  nextEnemy = 0

  map: any[] = [
    [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, -1, -1, -1, -1, -1, -1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1, 0, 0]
  ]

  constructor() {
    super({ key: 'main' })
  }

  preload() {
    // load the game assets – enemy and turret atlas
    //this.load.spritesheet('big-bad', 'assets/sprites/big-bad.png', { frameWidth: 20, frameHeight: 20 })
    this.load.atlas('big-bad', 'assets/sprites/big-bad.png', 'assets/sprites/big-bad.json')
    this.load.atlas('seed', 'assets/sprites/seed.png', 'assets/sprites/seed.json')
    this.load.image('sprites', 'assets/img/phaser-logo.png')
    //this.load.image('bullet', 'assets/bullet.png')
  }

  create() {
    this.anims.create({
      key: 'big-bad-creep',
      frameRate: 7,
      frames: this.anims.generateFrameNames('big-bad'),
      repeat: -1
    })
    this.anims.create({
      key: 'seed-creep',
      frameRate: 6,
      frames: this.anims.generateFrameNames('seed'),
      repeat: -1
    })

    // this graphics element is only for visualization,
    // its not related to our path
    var graphics = this.add.graphics()

    // the path for our enemies
    // parameters are the start x and y of our path
    this.path = this.add.path(96, -32)
    this.path.lineTo(96, 164)
    this.path.lineTo(DEFAULT_HEIGHT, 164)
    this.path.lineTo(DEFAULT_HEIGHT, DEFAULT_HEIGHT)

    graphics.lineStyle(3, 0xffffff, 1)
    // visualize the path
    this.path.draw(graphics)
    this.drawGrid(graphics)

    this.enemies = this.add.group({ classType: Seed, runChildUpdate: true })
    this.nextEnemy = 0

    this.turrets = this.add.group({ classType: Turret, runChildUpdate: true })

    this.input.on('pointerdown', this.placeTurret)
  }

  update(time: number, delta) {
    // if its time for the next enemy
    if (time > this.nextEnemy) {
      var enemy: Enemy = this.enemies.get()

      if (enemy) {
        enemy.setActive(true)
        enemy.setVisible(true)

        // place the enemy at the start of the path
        enemy.startOnPath(this.path, 1 / 25000)

        this.nextEnemy = time + 2000
      }
    }
  }

  drawGrid(graphics: Phaser.GameObjects.Graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8)
    for (var i = 0; i < DEFAULT_HEIGHT / 64; i++) {
      graphics.moveTo(0, i * 64)
      graphics.lineTo(DEFAULT_WIDTH, i * 64)
    }
    for (var j = 0; j < DEFAULT_WIDTH / 64; j++) {
      graphics.moveTo(j * 64, 0)
      graphics.lineTo(j * 64, DEFAULT_HEIGHT)
    }
    graphics.strokePath()
  }

  placeTurret = pointer => {
    var i = Math.floor(pointer.y / 64)
    var j = Math.floor(pointer.x / 64)
    if (this.canPlaceTurret(i, j)) {
      var turret: Turret = this.turrets.get()
      if (turret) {
        turret.setActive(true)
        turret.setVisible(true)
        turret.place(i, j, this.map)
      }
    }
  }

  canPlaceTurret = (i, j) => {
    return this.map[i][j] === 0
  }
}
