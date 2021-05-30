import Enemy from './enemy'

export default class Seed extends Enemy {
  constructor(scene: Phaser.Scene) {
    super(scene, 'seed', 'seed-creep')
    this.displayHeight = 60
    this.displayWidth = 60
    this.hp = 300
  }
}
