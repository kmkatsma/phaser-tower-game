import { GRID_SIZE } from '../game.config'

export default class Turret extends Phaser.GameObjects.Sprite {
  nextTic = 0
  bullets: any
  enemies: any

  constructor(scene: Phaser.Scene, key: string, private animationKey: string) {
    super(scene, 0, 0, key)
  }

  // we will place the turret according to the grid
  place(x: number, y: number, map: any[], bullets: any, enemies: any) {
    this.y = x * GRID_SIZE + GRID_SIZE / 2
    this.x = y * GRID_SIZE + GRID_SIZE / 2
    map[x][y] = 1
    this.anims.play(this.animationKey)
    this.bullets = bullets
    this.enemies = enemies
  }

  update(time, delta) {
    // time to shoot
    if (time > this.nextTic) {
      this.fire()
      this.nextTic = time + 1000
    }
  }
  getEnemy(x, y, distance) {
    var enemyUnits = this.enemies.getChildren()
    for (var i = 0; i < enemyUnits.length; i++) {
      console.log('enemy hp', enemyUnits[i].hp)
      if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
        return enemyUnits[i]
    }
    return false
  }

  fire() {
    var enemy = this.getEnemy(this.x, this.y, 100)
    if (enemy) {
      var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
      this.addBullet(this.x, this.y, angle)

      console.log('angle start', angle)
      this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG + 180
      //this.angle = Phaser.Math.Angle.Reverse(angle)
      console.log('angle', this.angle)
    }
  }

  addBullet(x, y, angle) {
    var bullet = this.bullets.get()
    if (bullet) {
      bullet.fire(x, y, angle)
    }
  }

  animate() {}
}
