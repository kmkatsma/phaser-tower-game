import Turret from './turret'

export default class TurretKnight extends Turret {
  constructor(scene: Phaser.Scene) {
    super(scene, 'knight', 'knight-strike')
    //super(scene, 'seed', 'seed-creep')
    this.displayHeight = 70
    this.displayWidth = 70
  }
}
