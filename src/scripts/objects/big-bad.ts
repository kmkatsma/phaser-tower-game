import Enemy from './enemy'

export default class BigBad extends Enemy {
  constructor(scene: Phaser.Scene) {
    super(scene, 'big-bad', 'big-bad-creep')
    this.displayHeight = 60
    this.displayWidth = 60
  }
}
