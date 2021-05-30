export default class Bullet extends Phaser.GameObjects.Image {
  dx = 0
  dy = 0
  lifespan = 0
  speed = 0

  constructor(scene) {
    super(scene, 0, 0, 'bullet')
    this.speed = Phaser.Math.GetSpeed(600, 1)
  }

  fire(x, y, angle) {
    this.setActive(true)
    this.setVisible(true)

    //  Bullets fire from the middle of the screen to the given x/y
    this.setPosition(x, y)

    //  we don't need to rotate the bullets as they are round
    //  this.setRotation(angle);

    this.dx = Math.cos(angle)
    this.dy = Math.sin(angle)

    this.lifespan = 300
  }

  update(time, delta) {
    this.lifespan -= delta

    this.x += this.dx * (this.speed * delta)
    this.y += this.dy * (this.speed * delta)

    if (this.lifespan <= 0) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}
