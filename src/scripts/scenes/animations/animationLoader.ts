export class AnimationLoader {
  static loadSprites(load: Phaser.Loader.LoaderPlugin) {
    load.atlas('big-bad', 'assets/sprites/big-bad.png', 'assets/sprites/big-bad.json')
    load.atlas('seed', 'assets/sprites/seed.png', 'assets/sprites/seed.json')
    load.atlas('knight', 'assets/sprites/knight.png', 'assets/sprites/knight.json')
    load.atlas('bullet', 'assets/sprites/bullet.png', 'assets/sprites/bullet.json')
  }

  static createAnimations(anims: Phaser.Animations.AnimationManager) {
    anims.create({
      key: 'big-bad-creep',
      frameRate: 7,
      frames: anims.generateFrameNames('big-bad'),
      repeat: -1
    })
    anims.create({
      key: 'seed-creep',
      frameRate: 6,
      frames: anims.generateFrameNames('seed'),
      repeat: -1
    })
    anims.create({
      key: 'knight-strike',
      frameRate: 6,
      frames: anims.generateFrameNames('knight'),
      repeat: -1
    })
    anims.create({
      key: 'bullet-move',
      frameRate: 10,
      frames: anims.generateFrameNames('bullet'),
      repeat: -1
    })
  }
}
