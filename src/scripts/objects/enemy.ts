export default class Enemy extends Phaser.GameObjects.Sprite {
  follower = { t: 0, vec: new Phaser.Math.Vector2() }
  path: Phaser.Curves.Path

  ENEMY_SPEED = 1 / 10000

  constructor(scene: Phaser.Scene, key: string, private animationKey: string) {
    super(scene, 0, 0, key)
    //this.height = 25
    this.displayHeight = 60
    this.displayWidth = 60
  }
  update(time: any, delta: any) {
    this.follower.t += this.ENEMY_SPEED * delta

    // get the new x and y coordinates in vec
    this.path.getPoint(this.follower.t, this.follower.vec)

    // update enemy x and y to the newly obtained x and y
    this.setPosition(this.follower.vec.x, this.follower.vec.y)

    // if we have reached the end of the path, remove the enemy
    if (this.follower.t >= 1) {
      this.setActive(false)
      this.setVisible(false)
    }
  }

  startOnPath(path: Phaser.Curves.Path, speed?: number) {
    this.path = path
    // set the t parameter at the start of the path
    this.follower.t = 0

    if (speed) {
      this.ENEMY_SPEED = speed
    }

    // get x and y of the given t point
    path.getPoint(this.follower.t, this.follower.vec)

    // set the x and y of our enemy to the received from the previous step
    this.setPosition(this.follower.vec.x, this.follower.vec.y)

    //console.log('anims', this.anims.play())
    this.anims.play(this.animationKey)
  }
}
