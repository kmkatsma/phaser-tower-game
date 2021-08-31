import { GameObjects } from 'phaser'
import { BULLET_DAMAGE, DEFAULT_HEIGHT, DEFAULT_WIDTH, GRID_SIZE } from '../game.config'
import Bullet from '../objects/bullet'
import Enemy from '../objects/enemy'
import Seed from '../objects/seed'
import Turret from '../objects/turret'
import TurretKnight from '../objects/turret-knight'
import { AnimationLoader } from './animations/animationLoader'

export default class TowerScene extends Phaser.Scene {
  //graphics: Phaser.GameObjects.Graphics
  path: Phaser.Curves.Path
  enemies: GameObjects.Group
  turrets: GameObjects.Group
  bullets: GameObjects.Group

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
    AnimationLoader.loadSprites(this.load)
  }

  create() {
    /*this.objects.camera = this.cameras.add(0, 0, 400, 300);
    this.objects.image0 = this.add.image(400, 300, 'image');
    this.objects.image1 = this.add.image(400, 300, 'image');
    this.objects.image2 = this.add.image(400, 300, 'image');
    this.objects.image3 = this.add.image(400, 300, 'image');
    this.objects.move = 0.0;
    this.objects.camera.zoom = 0.5;
    this.objects.camera.scrollX = 200;
    this.objects.camera.scrollY = 150;
    this.objects.camera.setBackgroundColor('rgba(255, 0, 0, 0.5)');*/

    AnimationLoader.createAnimations(this.anims)

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

    this.enemies = this.physics.add.group({ classType: Seed, runChildUpdate: true })
    this.nextEnemy = 0
    this.turrets = this.add.group({ classType: TurretKnight, runChildUpdate: true })
    this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true })

    this.physics.add.overlap(this.enemies, this.bullets, this.damageEnemy)
    this.input.on('pointerdown', this.placeTurret)
  }

  update(time: number, delta) {
    // if its time for the next enemy
    if (time > this.nextEnemy) {
      var enemy: Enemy = this.enemies.get()

      if (enemy) {
        enemy.hp = 300
        enemy.setActive(true)
        enemy.setVisible(true)
        enemy.startOnPath(this.path, 1 / 25000)

        this.nextEnemy = time + 2000
      }
    }
  }

  checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds()
    var boundsB = spriteB.getBounds()
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)
  }

  drawGrid(graphics: Phaser.GameObjects.Graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8)
    for (var i = 0; i < DEFAULT_HEIGHT / GRID_SIZE; i++) {
      graphics.moveTo(0, i * GRID_SIZE)
      graphics.lineTo(DEFAULT_WIDTH, i * GRID_SIZE)
    }
    for (var j = 0; j < DEFAULT_WIDTH / GRID_SIZE; j++) {
      graphics.moveTo(j * GRID_SIZE, 0)
      graphics.lineTo(j * GRID_SIZE, DEFAULT_HEIGHT)
    }
    graphics.strokePath()
  }

  placeTurret = pointer => {
    var i = Math.floor(pointer.y / GRID_SIZE)
    var j = Math.floor(pointer.x / GRID_SIZE)
    if (this.canPlaceTurret(i, j)) {
      var turret: Turret = this.turrets.get()
      if (turret) {
        turret.setActive(true)
        turret.setVisible(true)
        turret.place(i, j, this.map, this.bullets, this.enemies)
      }
    }
  }
  damageEnemy = (enemy, bullet) => {
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
      // we remove the bullet right away

      //this.time.delayedCall(
      //  100,
      //  function (bullet) {
      bullet.setActive(false)
      bullet.setVisible(false)
      enemy.receiveDamage(BULLET_DAMAGE)
      //  },
      //  [],
      //  this
      // )

      // decrease the enemy hp with BULLET_DAMAGE
    }
  }

  canPlaceTurret = (i, j) => {
    return this.map[i][j] === 0
  }
}
