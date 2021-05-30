export default class Turret extends Phaser.GameObjects.Image {
  nextTic = 0

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'sprites')
    this.displayHeight = 50
    this.displayWidth = 50
  }

  place(x: number, y: number, map: any[]) {
    this.y = x * 64 + 64 / 2
    this.x = y * 64 + 64 / 2
    map[x][y] = 1
  }

  // we will place the turret according to the grid

  update(time, delta) {
    // time to shoot
    if (time > this.nextTic) {
      this.nextTic = time + 1000
    }
  }
}
